import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';

export default function Navigation() {
  const [loaded, setLoaded] = useState(false);
  const navRef = useRef(null);
  const lenis = useLenis();

  useLayoutEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loaded && navRef.current) {
      gsap.fromTo(
        navRef.current,
        { yPercent: -100, opacity: 0 },
        { delay: 0.2, yPercent: 0, opacity: 1, duration: 0.75, ease: 'sine' }
      );
    }
  }, [loaded]);

  const scrollTo = (selector) => {
    const target = document.querySelector(selector);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: 0 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="navigation" ref={navRef} style={{ opacity: 0 }}>
      <div className="navigation-left" onClick={() => scrollTo('#home')} style={{ cursor: 'pointer' }}>
        <p className="at-description black" style={{ letterSpacing: '0.1em' }}>
          RITIK
        </p>
      </div>
      <div className="navigation-center">
        <p className="description navigation-description black" onClick={() => scrollTo('#home')}>
          Home
        </p>
        <p className="description navigation-description black" onClick={() => scrollTo('#about')}>
          About
        </p>
        <p className="description navigation-description black" onClick={() => scrollTo('#experience')}>
          Experience
        </p>
        <p className="description navigation-description black" onClick={() => scrollTo('#projects')}>
          Projects
        </p>
        <p className="description navigation-description black" onClick={() => scrollTo('#faq')}>
          FAQ
        </p>
      </div>
      <div className="navigation-right">
        <a
          href="mailto:rk7703463@gmail.com"
          className="navigation-right-button"
          style={{ textDecoration: 'none' }}
        >
          <p className="description black" style={{ fontWeight: 600 }}>
            Hire Me
          </p>
        </a>
      </div>
    </div>
  );
}
