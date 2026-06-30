import Image from "next/image";
import Nav from "@/components/Nav";
import ScrubHero from "@/components/ScrubHero";
import StatCounter from "@/components/StatCounter";
import BandParallax from "@/components/BandParallax";
import Reveal from "@/components/Reveal";

const projects = [
  {
    img: "/images/project-dusk-house.svg",
    alt: "Modern two-storey home with timber cladding at dusk",
    tag: "New build",
    title: "Kerrisdale Modern",
    loc: "Vancouver, BC · 2025",
  },
  {
    img: "/images/project-queenslander.svg",
    alt: "Restored white heritage home with wraparound veranda and pool",
    tag: "Heritage restoration",
    title: "The Albright House",
    loc: "Victoria, BC · 2024",
  },
  {
    img: "/images/project-interior.svg",
    alt: "Open-plan living room with walnut feature wall",
    tag: "Interior renovation",
    title: "Oakridge Residence",
    loc: "Vancouver, BC · 2025",
  },
  {
    img: "/images/project-kitchen.svg",
    alt: "White kitchen with hexagon tile backsplash and pro range",
    tag: "Kitchen remodel",
    title: "Hexagon Kitchen",
    loc: "North Vancouver, BC · 2024",
  },
  {
    img: "/images/project-villa.svg",
    alt: "White contemporary villa with infinity pool",
    tag: "New build",
    title: "White Rock Villa",
    loc: "White Rock, BC · 2023",
  },
  {
    img: "/images/project-museum.svg",
    alt: "Angular white commercial building with glass atrium",
    tag: "Commercial",
    title: "Granville Cultural Annex",
    loc: "Vancouver, BC · 2023",
  },
];

export default function Home() {
  return (
    <>
      <Nav />

      <main id="top">
        {/* SCROLL-SCRUB HERO */}
        <ScrubHero />

        {/* STORY / STATS */}
        <section className="story section" id="story">
          <div className="container">
            <Reveal as="p" className="eyebrow">Our story</Reveal>
            <Reveal as="h2" className="story__statement" delay="0.08s">
              For <em>27 years</em> we&apos;ve poured foundations, raised frames and brought
              century-old homes back to life across British Columbia &mdash; one honest
              detail at a time.
            </Reveal>
            <div className="story__grid">
              <StatCounter count={27} label="Years building" delay="0.05s" />
              <StatCounter count={480} suffix="+" label="Projects delivered" delay="0.12s" />
              <StatCounter count={98} suffix="%" label="Delivered on time" delay="0.19s" />
              <StatCounter count={32} label="Craftspeople on staff" delay="0.26s" />
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section className="projects section section--alt" id="projects">
          <div className="container">
            <div className="section-head">
              <div>
                <Reveal as="p" className="eyebrow">Selected work</Reveal>
                <Reveal as="h2" delay="0.08s">
                  Projects we&apos;re proud<br />to put our name on.
                </Reveal>
              </div>
              <Reveal as="p" className="section-head__note" delay="0.16s">
                Every build is documented, every restoration researched. A few recent favourites.
              </Reveal>
            </div>

            <div className="projects__grid">
              {projects.map((p, i) => {
                const delays = ["", "0.08s", "", "0.08s", "0.16s", ""];
                return (
                  <Reveal key={p.title} as="a" className="card" href="#contact" delay={delays[i] || undefined}>
                    <figure className="card__media">
                      <Image
                        src={p.img}
                        alt={p.alt}
                        width={800}
                        height={600}
                        loading="lazy"
                      />
                    </figure>
                    <div className="card__meta">
                      <span className="card__tag">{p.tag}</span>
                      <h3>{p.title}</h3>
                      <p>{p.loc}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="services section" id="services">
          <div className="container">
            <Reveal as="p" className="eyebrow">What we do</Reveal>
            <Reveal as="h2" delay="0.08s">
              Three trades.<br />One standard.
            </Reveal>
            <div className="services__grid">
              <Reveal as="article" className="service">
                <span className="service__index">01</span>
                <h3>New construction</h3>
                <p>Custom homes and small commercial, from excavation to occupancy permit. Fixed-price contracts, transparent scheduling and a site you can visit any day of the week.</p>
                <ul>
                  <li>Custom single-family homes</li>
                  <li>Laneway &amp; infill housing</li>
                  <li>Light commercial &amp; tenant improvement</li>
                </ul>
              </Reveal>
              <Reveal as="article" className="service" delay="0.1s">
                <span className="service__index">02</span>
                <h3>Heritage restoration</h3>
                <p>Pre-1940 homes are a different craft. We research the original drawings, match period millwork and bring old structures up to today&apos;s seismic and envelope codes.</p>
                <ul>
                  <li>Structural &amp; foundation repair</li>
                  <li>Period millwork reproduction</li>
                  <li>Envelope &amp; seismic upgrades</li>
                </ul>
              </Reveal>
              <Reveal as="article" className="service" delay="0.2s">
                <span className="service__index">03</span>
                <h3>Renovation &amp; additions</h3>
                <p>Kitchens, full-floor renovations and additions that read as if they were always part of the house &mdash; engineered, permitted and dust-walled while you live there.</p>
                <ul>
                  <li>Kitchens &amp; primary suites</li>
                  <li>Second-storey additions</li>
                  <li>Basement suites &amp; ADUs</li>
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* PARALLAX QUOTE BAND */}
        <BandParallax />

        {/* PROCESS */}
        <section className="process section" id="process">
          <div className="container process__grid">
            <div className="process__copy">
              <Reveal as="p" className="eyebrow">How we work</Reveal>
              <Reveal as="h2" delay="0.08s">
                No surprises.<br />That&apos;s the process.
              </Reveal>
              <ol className="process__steps">
                <Reveal as="li">
                  <span>01</span>
                  <div>
                    <h3>Consultation &amp; feasibility</h3>
                    <p>Site walk, budget range and a straight answer on whether your idea pencils out &mdash; before you spend a dollar on drawings.</p>
                  </div>
                </Reveal>
                <Reveal as="li" delay="0.08s">
                  <span>02</span>
                  <div>
                    <h3>Design &amp; permits</h3>
                    <p>We coordinate architects, engineers and the city so the approved set is the set we build from. No re-pricing games.</p>
                  </div>
                </Reveal>
                <Reveal as="li" delay="0.16s">
                  <span>03</span>
                  <div>
                    <h3>Construction</h3>
                    <p>A dedicated site supervisor, weekly photo reports and a live schedule you can check from your phone.</p>
                  </div>
                </Reveal>
                <Reveal as="li" delay="0.24s">
                  <span>04</span>
                  <div>
                    <h3>Handover &amp; warranty</h3>
                    <p>Blower-door tested, deficiency-free walkthrough and a 2-5-10 warranty backed by 27 years of us actually answering the phone.</p>
                  </div>
                </Reveal>
              </ol>
            </div>
            <Reveal as="figure" className="process__media" delay="0.12s">
              <Image
                src="/images/process-drafting.svg"
                alt="Hartwell project manager drafting over a blueprint"
                width={900}
                height={1035}
                loading="lazy"
                style={{ width: "100%", height: "auto", borderRadius: "18px" }}
              />
              <figcaption>Every set is red-lined by the site team before we break ground.</figcaption>
            </Reveal>
          </div>
        </section>

        {/* RESTORATION SPOTLIGHT */}
        <section className="resto section section--alt">
          <div className="container resto__grid">
            <Reveal as="figure" className="resto__media">
              <Image
                src="/images/restoration-painters.svg"
                alt="Crew repainting a heritage home in period colours"
                width={900}
                height={990}
                loading="lazy"
                style={{ width: "100%", height: "auto", borderRadius: "18px" }}
              />
            </Reveal>
            <div className="resto__copy">
              <Reveal as="p" className="eyebrow">Restoration spotlight</Reveal>
              <Reveal as="h2" delay="0.08s">Old houses aren&apos;t problems. They&apos;re briefs.</Reveal>
              <Reveal as="p" delay="0.14s">
                Heritage work rewards patience. We document what&apos;s there, test paint layers for
                the original palette, and rebuild rot with matched-grain lumber &mdash; so the street
                sees history, and the inspector sees current code.
              </Reveal>
              <ul className="resto__list">
                <Reveal as="li" delay="0.18s">Paint &amp; finish archaeology</Reveal>
                <Reveal as="li" delay="0.24s">Sash window rebuilds, not replacements</Reveal>
                <Reveal as="li" delay="0.30s">Heritage Revitalization Agreement experience</Reveal>
              </ul>
              <Reveal as="a" className="btn" href="#contact" delay="0.36s">
                Discuss a restoration
              </Reveal>
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="quote section">
          <div className="container">
            <Reveal as="blockquote" className="quote__block">
              <p>&ldquo;Hartwell rebuilt our 1912 Craftsman after the fire. They found the original
              window profiles in the city archive and milled them new. You cannot tell. Our
              neighbours still ask who did it &mdash; everyone gets the same answer.&rdquo;</p>
              <cite>Sarah Whitmore &mdash; Homeowner, Point Grey</cite>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="cta" id="contact">
          <div className="container cta__inner">
            <div>
              <Reveal as="p" className="eyebrow eyebrow--light">Start a project</Reveal>
              <Reveal as="h2" delay="0.08s">
                Let&apos;s build something<br />that outlasts us.
              </Reveal>
              <Reveal as="p" className="cta__sub" delay="0.14s">
                Tell us about your site, your house, or the idea you keep coming back to.
                We&apos;ll come walk it with you.
              </Reveal>
            </div>
            <Reveal className="cta__actions" delay="0.2s">
              <a className="btn btn--light" href="mailto:hello@hartwellbuilt.ca">
                hello@hartwellbuilt.ca
              </a>
              <a className="btn btn--ghost" href="tel:+16045550188">
                (604) 555-0188
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <span className="nav__mark" aria-hidden="true">H</span>
            <p>Hartwell Construction &amp; Restoration Ltd. General contractor serving Greater Vancouver and the Island since 1998.</p>
          </div>
          <div>
            <h4>Visit</h4>
            <p>214 Industrial Ave<br />Vancouver, BC V6A 2P3</p>
          </div>
          <div>
            <h4>Talk</h4>
            <p>
              <a href="tel:+16045550188">(604) 555-0188</a>
              <br />
              <a href="mailto:hello@hartwellbuilt.ca">hello@hartwellbuilt.ca</a>
            </p>
          </div>
          <div>
            <h4>Follow</h4>
            <p>
              <a href="#top">Instagram</a>
              <br />
              <a href="#top">Houzz</a>
              <br />
              <a href="#top">LinkedIn</a>
            </p>
          </div>
        </div>
        <div className="container footer__legal">
          <p>&copy; 2026 Hartwell Construction &amp; Restoration Ltd. &middot; Licensed GC #87-3321 &middot; WorkSafeBC insured</p>
          <p>Demo website &middot; Site by <a href="https://ramanstudio.com" target="_blank" rel="noopener">Raman Studio</a></p>
        </div>
      </footer>
    </>
  );
}
