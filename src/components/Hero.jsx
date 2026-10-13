import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import SqlPipelineTerminal from './SqlPipelineTerminal';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const logo1Ref = useRef(null);
  const logo2Ref = useRef(null);
  const logo3Ref = useRef(null);
  const logo4Ref = useRef(null);
  const logo5Ref = useRef(null);

  const subheadlineRef = useRef(null);
  const preTradeRef = useRef(null);
  const sizeRef = useRef(null);
  const ingrTitleRef = useRef(null);
  const ingrDescRef = useRef(null);
  const introTitleRef = useRef(null);
  const introDescRef = useRef(null);
  const btnDesktopRef = useRef(null);
  const btnMobileRef = useRef(null);

  const [queryTriggered, setQueryTriggered] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (loaded) {
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 1 });
        const splitTitle = new SplitType(titleRef.current, { type: 'chars' });
        if (splitTitle.chars) {
          gsap.fromTo(
            splitTitle.chars,
            {
              willChange: 'opacity, transform, filter',
              filter: 'blur(8px)',
              opacity: 0,
              yPercent: 50
            },
            {
              delay: 0.2,
              filter: 'blur(0px)',
              opacity: 1,
              yPercent: 0,
              stagger: 0.035,
              duration: 1.25,
              ease: 'power1'
            }
          );
        }
      }

      if (subtitleRef.current) {
        gsap.to(subtitleRef.current, { delay: 0.5, filter: 'blur(0px)', opacity: 1, duration: 1, ease: 'sine' });
      }
      if (logo1Ref.current) gsap.to(logo1Ref.current, { delay: 0.2, filter: 'blur(0px)', opacity: 1, duration: 1.25, ease: 'sine' });
      if (logo2Ref.current) gsap.to(logo2Ref.current, { delay: 0.3, filter: 'blur(0px)', opacity: 1, duration: 1.25, ease: 'sine' });
      if (logo3Ref.current) gsap.to(logo3Ref.current, { delay: 0.4, filter: 'blur(0px)', opacity: 1, duration: 1.25, ease: 'sine' });
      if (logo4Ref.current) gsap.to(logo4Ref.current, { delay: 0.5, filter: 'blur(0px)', opacity: 1, duration: 1.25, ease: 'sine' });
      if (logo5Ref.current) gsap.to(logo5Ref.current, { delay: 0.6, filter: 'blur(0px)', opacity: 1, duration: 1.25, ease: 'sine' });

      if (subheadlineRef.current) {
        const splitSub = new SplitType(subheadlineRef.current, { type: 'chars' });
        if (splitSub.chars) {
          gsap.fromTo(
            splitSub.chars,
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
              duration: 1.25,
              ease: 'power1',
              scrollTrigger: {
                trigger: subheadlineRef.current,
                start: 'top 95%'
              }
            }
          );
        }
      }

      const hero2Items = [
        preTradeRef,
        sizeRef,
        ingrTitleRef,
        ingrDescRef,
        introTitleRef,
        introDescRef,
        btnDesktopRef,
        btnMobileRef
      ];

      hero2Items.forEach((r) => {
        if (r.current) {
          gsap.fromTo(
            r.current,
            { filter: 'blur(3px)', opacity: 0, y: '2.5vh' },
            {
              filter: 'blur(0px)',
              opacity: 1,
              y: 0,
              duration: 1.25,
              ease: 'power1',
              scrollTrigger: {
                trigger: r.current,
                start: 'top 95%'
              }
            }
          );
        }
      });
    }
  }, [loaded]);

  const handleTriggerQuery = () => {
    setQueryTriggered(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    setTimeout(() => setQueryTriggered(false), 1400);
  };

  return (
    <section className="hero" id="home">
      <div className="hero-absolute">
        <div className="hero-content">
          <div className="hero-text-contents">
            <h1 className="text-behind" ref={titleRef} style={{ opacity: 0 }}>
              SCALING <br /> <span className="text-front">RAW DATA</span>{' '}
            </h1>
            <div className="dottedLine">
              <svg viewBox="0 0 800 1">
                <line className="cls-1" y1=".5" x2="800" y2=".5"></line>
              </svg>
            </div>
            <h2 className="title-description black opacity-blur" ref={subtitleRef}>
              SQL · Power BI · Advanced Excel · Scalable Analytics
            </h2>
          </div>

          <div className="hero-content-bottom">
            <div className="hero-content-bottom-container">
              <div className="hero-content-bottom-item hero-content-bottom-item-first">
                <div className="hero-content-bottom-item-content opacity-blur" ref={logo1Ref}>
                  <img src="/images/tech/sql.svg" className="hero-content-bottom-item-image" alt="SQL" />
                </div>
              </div>
              <div className="hero-content-bottom-item">
                <div className="hero-content-bottom-item-content opacity-blur" ref={logo2Ref}>
                  <img src="/images/tech/powerbi.svg" className="hero-content-bottom-item-image" alt="Power BI" />
                </div>
              </div>
              <div className="hero-content-bottom-item hero-content-bottom-item-mobile-hiden">
                <div className="hero-content-bottom-item-content opacity-blur" ref={logo3Ref}>
                  <img src="/images/tech/excel.svg" className="hero-content-bottom-item-image" alt="Excel" />
                </div>
              </div>
              <div className="hero-content-bottom-item">
                <div className="hero-content-bottom-item-content opacity-blur" ref={logo4Ref}>
                  <img src="/images/tech/firebase.svg" className="hero-content-bottom-item-image" alt="Firebase" />
                </div>
              </div>
              <div className="hero-content-bottom-item hero-content-bottom-item-last">
                <div className="hero-content-bottom-item-content opacity-blur" ref={logo5Ref}>
                  <img src="/images/tech/gcp.svg" className="hero-content-bottom-item-image" alt="GCP" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-content hero-content-two">
          <div className="hero-content-two-left">
            <div className="hero-content-two-item">
              <p className="description black" ref={preTradeRef}>
                National Education Portal
              </p>
              <h3 className="at-subheadline black" ref={subheadlineRef}>
                400,000+ <br /> Records
              </h3>
              <p className="description black" ref={sizeRef}>
                2,200+ Schools · 10,000+ Teachers
              </p>
            </div>
            <div className="hero-content-two-item">
              <p className="at-description black" ref={ingrTitleRef}>
                CORE TOOLSET
              </p>
              <p className="description black" ref={ingrDescRef}>
                SQL (Window Functions, CTEs), Power BI (DAX, Power Query M), Advanced Excel, Kotlin Automation
              </p>
            </div>
          </div>

          <div className="hero-content-two-center">
            <SqlPipelineTerminal triggerActive={queryTriggered} />
            <audio ref={audioRef} src="/audio/sodaopening.mp3" preload="auto" />
            <div
              className="hero-content-two-center-button hero-content-two-center-button-hide-on-desktop"
              ref={btnMobileRef}
              onClick={handleTriggerQuery}
            >
              <p className="description black">Execute Query</p>
            </div>
          </div>

          <div className="hero-content-two-right">
            <div className="hero-content-two-item">
              <p className="at-description black" ref={introTitleRef}>
                DATA OPERATIONS LEAD
              </p>
              <p className="description black" ref={introDescRef}>
                Nearly 3 years across analytics and software engineering, currently owning data operations
                for the E-Shikshakosh national portal. Spearheaded a 400K+ record audit drive, automated
                manual reporting cycles, and combined deep software engineering with executive business intelligence.
              </p>
            </div>
            <div className="hero-content-two-center-button" ref={btnDesktopRef} onClick={handleTriggerQuery}>
              <p className="description black">Execute Query</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
