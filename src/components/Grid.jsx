import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DataPipelineVisualizer from './DataPipelineVisualizer';

gsap.registerPlugin(ScrollTrigger);

export default function Grid() {
  const cardTiltRef = useRef(null);
  const cardWrapperRef = useRef(null);
  const smallBtnRef = useRef(null);
  const headlineDesktopRef = useRef(null);
  const headlineMobileRef = useRef(null);
  const smallBtnMobileRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (cardWrapperRef.current) {
      gsap.fromTo(
        cardWrapperRef.current,
        { opacity: 0, yPercent: 25 },
        {
          delay: 0,
          opacity: 1,
          yPercent: 0,
          duration: 1,
          ease: 'sine',
          scrollTrigger: {
            trigger: cardWrapperRef.current,
            start: 'top bottom'
          }
        }
      );
    }

    if (smallBtnRef.current) {
      gsap.fromTo(
        smallBtnRef.current,
        { opacity: 0, yPercent: 25 },
        {
          delay: isMobile ? 0 : 0.1,
          opacity: 1,
          yPercent: 0,
          duration: 1,
          ease: 'sine',
          scrollTrigger: {
            trigger: smallBtnRef.current,
            start: 'top bottom'
          }
        }
      );
    }

    if (headlineDesktopRef.current) {
      gsap.fromTo(
        headlineDesktopRef.current,
        { opacity: 0, yPercent: 25 },
        {
          delay: 0,
          opacity: 1,
          yPercent: 0,
          duration: 1,
          ease: 'sine',
          scrollTrigger: {
            trigger: headlineDesktopRef.current,
            start: 'top bottom'
          }
        }
      );
    }

    if (headlineMobileRef.current) {
      gsap.fromTo(
        headlineMobileRef.current,
        { opacity: 0, yPercent: 25 },
        {
          delay: 0,
          opacity: 1,
          yPercent: 0,
          duration: 1,
          ease: 'sine',
          scrollTrigger: {
            trigger: headlineMobileRef.current,
            start: 'top bottom'
          }
        }
      );
    }

    if (smallBtnMobileRef.current) {
      gsap.fromTo(
        smallBtnMobileRef.current,
        { opacity: 0, yPercent: 25 },
        {
          delay: 0.1,
          opacity: 1,
          yPercent: 0,
          duration: 1,
          ease: 'sine',
          scrollTrigger: {
            trigger: smallBtnMobileRef.current,
            start: 'top bottom'
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth) * 100 - 50;
      targetY = (e.clientY / window.innerHeight) * 100 - 50;
    };

    let animId;
    const animate = () => {
      const deltaX = 0.25 * targetX - currentX;
      const deltaY = -0.25 * targetY - currentY;
      currentX += 0.05 * deltaX;
      currentY += 0.05 * deltaY;

      if (cardTiltRef.current) {
        cardTiltRef.current.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const smallButtonSvg = (
    <svg className="grid-right-top-small-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.67882 2.91429C5.67882 2.40934 6.08816 2 6.59311 2H8.42168C8.92663 2 9.33597 2.40934 9.33597 2.91429V4.28571C9.33597 4.79066 9.7453 5.2 10.2503 5.2H11.6217C12.1266 5.2 12.536 5.60934 12.536 6.11429V7.48571C12.536 7.99066 12.9453 8.4 13.4503 8.4H14.8217C15.3266 8.4 15.736 8.80934 15.736 9.31429V11.1429C15.736 11.6478 15.3266 12.0571 14.8217 12.0571H12.9931C12.4882 12.0571 12.0788 12.4665 12.0788 12.9714V13.8857C12.0788 14.3907 11.6695 14.8 11.1645 14.8H9.79311C9.28816 14.8 8.87882 15.2093 8.87882 15.7143V17.0857C8.87882 17.5907 8.46948 18 7.96454 18H6.13597C5.63102 18 5.22168 17.5907 5.22168 17.0857V15.2571C5.22168 14.7522 5.63102 14.3429 6.13597 14.3429H7.50739C8.01234 14.3429 8.42168 13.9335 8.42168 13.4286V12.0571C8.42168 11.5522 8.83102 11.1429 9.33597 11.1429H11.1645C11.6695 11.1429 12.0788 10.7335 12.0788 10.2286V9.77143C12.0788 9.26648 11.6695 8.85714 11.1645 8.85714H9.79311C9.28816 8.85714 8.87882 8.4478 8.87882 7.94286V6.57143C8.87882 6.06648 8.46948 5.65714 7.96454 5.65714H6.59311C6.08816 5.65714 5.67882 5.2478 5.67882 4.74286V2.91429Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <section className="grid" id="projects">
      <div className="grid-content">
        <div className="grid-left">
          <div className="sequence-content">
            <DataPipelineVisualizer />
          </div>
        </div>

        <div className="grid-right">
          <div className="grid-right-top-row">
            <div className="grid-right-top-big-wrapper" ref={cardWrapperRef}>
              <div className="grid-right-top-big" ref={cardTiltRef}>
                <img
                  src="/images/ritik_card.webp"
                  className="grid-right-top-image"
                  alt="Ritik E-Shikshakosh National Analytics"
                />
              </div>
            </div>

            <div className="grid-right-top-small hide-on-mobile" ref={smallBtnRef}>
              <a
                href="mailto:rk7703463@gmail.com"
                className="grid-right-top-small-button"
                title="Contact Ritik"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {smallButtonSvg}
              </a>
            </div>
          </div>

          <div className="grid-right-bottom hide-on-mobile" ref={headlineDesktopRef}>
            <h1 className="at-headline">
              Query It, <br /> <span className="orange">Scale</span> It{' '}
            </h1>
          </div>

          <div className="grid-right-mobile-row hide-on-desktop">
            <div className="grid-right-bottom" ref={headlineMobileRef}>
              <h1 className="at-headline grid-right-bottom-headline">
                Query It, <br /> <span className="orange">Scale</span> It{' '}
              </h1>
            </div>
            <div className="grid-right-top-small" ref={smallBtnMobileRef}>
              <a
                href="mailto:rk7703463@gmail.com"
                className="grid-right-top-small-button"
                title="Contact Ritik"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {smallButtonSvg}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
