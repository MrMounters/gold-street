import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const URL = 'https://ramanstudio.com/work-demos/construction/index.html';

async function run() {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', headless: true });
  const page = await browser.newPage();

  // Desktop screenshot
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: join(ROOT, 'docs/design-references/desktop-full.png'), fullPage: true });
  console.log('✓ Desktop screenshot saved');

  // Mobile screenshot
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: join(ROOT, 'docs/design-references/mobile-full.png'), fullPage: true });
  console.log('✓ Mobile screenshot saved');

  // Back to desktop for extraction
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(500);

  // Extract full HTML
  const html = await page.content();
  writeFileSync(join(ROOT, 'docs/research/page.html'), html);
  console.log('✓ HTML saved');

  // Extract design tokens and page data
  const data = await page.evaluate(() => {
    const props = [
      'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
      'textTransform','textDecoration','backgroundColor','background',
      'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
      'margin','marginTop','marginRight','marginBottom','marginLeft',
      'width','height','maxWidth','minWidth','maxHeight','minHeight',
      'display','flexDirection','justifyContent','alignItems','gap',
      'gridTemplateColumns','gridTemplateRows',
      'borderRadius','border','borderTop','borderBottom','borderLeft','borderRight',
      'boxShadow','overflow','overflowX','overflowY',
      'position','top','right','bottom','left','zIndex',
      'opacity','transform','transition','cursor',
      'objectFit','objectPosition','mixBlendMode','filter','backdropFilter',
      'whiteSpace','textOverflow','WebkitLineClamp','backgroundImage','backgroundSize',
      'backgroundPosition','backgroundRepeat','animationName','animationDuration'
    ];

    function getStyles(el) {
      const cs = window.getComputedStyle(el);
      const styles = {};
      props.forEach(p => {
        const v = cs[p];
        if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)' && v !== '') styles[p] = v;
      });
      return styles;
    }

    function walk(el, depth) {
      if (depth > 5) return null;
      const children = [...el.children];
      return {
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        classes: el.className?.toString().trim() || null,
        text: el.childNodes.length === 1 && el.childNodes[0].nodeType === 3 ? el.textContent.trim().slice(0, 300) : null,
        href: el.tagName === 'A' ? el.href : null,
        src: el.tagName === 'IMG' ? { src: el.src, alt: el.alt, naturalWidth: el.naturalWidth, naturalHeight: el.naturalHeight } : null,
        videoSrc: el.tagName === 'VIDEO' ? el.src || el.querySelector?.('source')?.src : null,
        styles: getStyles(el),
        children: children.slice(0, 30).map(c => walk(c, depth + 1)).filter(Boolean)
      };
    }

    const body = document.body;

    // Assets
    const images = [...document.querySelectorAll('img')].map(img => ({
      src: img.src,
      alt: img.alt,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      parentClass: img.parentElement?.className,
      position: getComputedStyle(img).position
    }));

    const videos = [...document.querySelectorAll('video')].map(v => ({
      src: v.src || v.querySelector('source')?.src,
      poster: v.poster,
      autoplay: v.autoplay,
      loop: v.loop,
      muted: v.muted
    }));

    const bgImages = [...document.querySelectorAll('*')].filter(el => {
      const bg = getComputedStyle(el).backgroundImage;
      return bg && bg !== 'none' && bg.includes('url(');
    }).map(el => ({
      url: getComputedStyle(el).backgroundImage,
      element: el.tagName + '#' + el.id + '.' + (el.className?.toString().split(' ')[0] || '')
    }));

    const fonts = [...new Set(
      [...document.querySelectorAll('*')].slice(0, 300).map(el => getComputedStyle(el).fontFamily)
    )].filter(Boolean);

    const favicons = [...document.querySelectorAll('link[rel*="icon"],link[rel*="apple"]')].map(l => ({
      href: l.href, rel: l.rel, sizes: l.sizes?.toString()
    }));

    const svgs = [...document.querySelectorAll('svg')].map(svg => svg.outerHTML.slice(0, 2000));

    const links = [...document.querySelectorAll('link[rel="stylesheet"],script[src]')].map(l => l.href || l.src);

    const sections = [...document.querySelectorAll('section, header, footer, nav, [class*="section"], [class*="hero"], [class*="about"], [class*="services"], [class*="portfolio"], [class*="contact"], [class*="team"]')].map(el => ({
      tag: el.tagName.toLowerCase(),
      id: el.id,
      classes: el.className?.toString().trim()
    }));

    const title = document.title;
    const metaDesc = document.querySelector('meta[name="description"]')?.content;

    return {
      title,
      metaDesc,
      fonts,
      favicons,
      images,
      videos,
      bgImages,
      svgCount: svgs.length,
      svgs: svgs.slice(0, 20),
      links,
      sections,
      bodyClasses: document.body.className,
      htmlClasses: document.documentElement.className,
      domTree: walk(body, 0)
    };
  });

  writeFileSync(join(ROOT, 'docs/research/extracted-data.json'), JSON.stringify(data, null, 2));
  console.log('✓ Extracted data saved');
  console.log('Title:', data.title);
  console.log('Images:', data.images.length);
  console.log('Videos:', data.videos.length);
  console.log('BG Images:', data.bgImages.length);
  console.log('SVGs:', data.svgCount);
  console.log('Sections:', data.sections.length);
  console.log('Fonts:', data.fonts.slice(0, 5));

  // Scroll behaviors - take scrolled header screenshot
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: join(ROOT, 'docs/design-references/desktop-top.png') });

  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(800);
  await page.screenshot({ path: join(ROOT, 'docs/design-references/desktop-scrolled.png') });
  console.log('✓ Scroll state screenshots saved');

  // Tablet screenshot
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: join(ROOT, 'docs/design-references/tablet-full.png'), fullPage: true });
  console.log('✓ Tablet screenshot saved');

  await browser.close();
  console.log('✓ Done!');
}

run().catch(err => { console.error(err); process.exit(1); });
