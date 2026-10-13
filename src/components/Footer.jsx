import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const headlineRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    if (headlineRef.current) {
      const splitText = new SplitType(headlineRef.current, { type: 'chars' });
      if (splitText.chars) {
        gsap.fromTo(
          splitText.chars,
          {
            willChange: 'opacity, transform, filter',
            filter: 'blur(8px)',
            opacity: 0,
            yPercent: 50
          },
          {
            filter: 'blur(0px)',
            opacity: 1,
            yPercent: 0,
            stagger: 0.035,
            duration: 1,
            ease: 'power1',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 95%'
            }
          }
        );
      }
    }

    if (infoRef.current) {
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 98%'
          }
        }
      );
    }
  }, []);

  return (
    <section className="footer" id="contact">
      <div className="footer-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 className="at-footerheadline" ref={headlineRef} style={{ letterSpacing: '0.05em' }}>
          RITIK
        </h1>
        <div
          ref={infoRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '2vh',
            zIndex: 10
          }}
        >
          <a
            href="mailto:rk7703463@gmail.com"
            className="description black"
            style={{
              textDecoration: 'none',
              padding: '0.6rem 1.2rem',
              backgroundColor: '#1b1b1b',
              color: '#ffffff',
              borderRadius: '8px',
              transition: 'background-color 0.2s ease',
              fontWeight: 500
            }}
          >
            rk7703463@gmail.com
          </a>
          <a
            href="tel:+919693149491"
            className="description black"
            style={{
              textDecoration: 'none',
              padding: '0.6rem 1.2rem',
              backgroundColor: '#ffffff',
              border: '1px solid #1b1b1b',
              color: '#1b1b1b',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              fontWeight: 500
            }}
          >
            +91 96931 49491
          </a>
          <span className="description grey" style={{ fontWeight: 500 }}>
            Data Analyst | SQL · Power BI · Advanced Excel
          </span>
        </div>
      </div>
    </section>
  );
}
