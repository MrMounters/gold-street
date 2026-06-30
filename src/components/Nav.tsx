"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`nav${solid ? " nav--solid" : ""}`} id="nav">
        <div className="nav__inner">
          <a className="nav__brand" href="#top" aria-label="Hartwell — home">
            <span className="nav__mark" aria-hidden="true">H</span>
            <span className="nav__name">
              Hartwell
              <small>Construction &middot; Restoration</small>
            </span>
          </a>
          <nav className="nav__links" aria-label="Primary">
            <a href="#story">Story</a>
            <a href="#projects">Projects</a>
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="btn btn--nav" href="#contact">Get an estimate</a>
          <button
            className="nav__burger"
            id="burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className="mobile-menu" id="mobile-menu" hidden={!menuOpen}>
        <nav aria-label="Mobile">
          <a href="#story" onClick={closeMenu}>Story</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#process" onClick={closeMenu}>Process</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="btn" href="#contact" onClick={closeMenu}>Get an estimate</a>
        </nav>
      </div>
    </>
  );
}
