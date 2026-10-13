import React, { useRef, useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    name: 'Globus Informatics India Pvt. Ltd.',
    role: 'Data Analyst (Feb 2026 – Present)',
    image: '/images/hydroflowface5.jpg',
    quote:
      '"Own data operations for the E-Shikshakosh national education portal covering 2,200+ schools, 400,000+ students, and 10,000+ teachers. Led a 6-month data-quality audit correcting 400K+ records, eliminating downstream rework and automating recurring operational reporting cycles."'
  },
  {
    name: 'Appsthiliaz Technologies Pvt. Ltd.',
    role: 'Kotlin Developer (Feb 2025 – Jan 2026)',
    image: '/images/hydroflowface2.jpg',
    quote:
      '"Engineered data analysis and automation scripts removing manual friction from internal workflows. Developed Android features in Kotlin and Jetpack Compose backed by Firebase Realtime Database, mastering schema design, read/write latency, and backend data modeling."'
  },
  {
    name: 'Appsthiliaz Technologies (Remote)',
    role: 'Analytics Intern (Feb 2024 – Jan 2025)',
    image: '/images/hydroflowface3.jpg',
    quote:
      '"Spearheaded real-time field data gathering and digital survey verification. Monitored key performance indicators for local governance schemes, facilitated multi-departmental data exchange, and authored high-level executive dashboards."'
  },
  {
    name: 'E-Rojgaar Platform',
    role: 'Featured Engineering Project',
    image: '/images/hydroflowface4.jpg',
    quote:
      '"Took an enterprise employment platform from initial architecture to live production in 7 months. Engineered real-time database synchronisation and a centralised admin control suite granting administrators complete oversight over system entities."'
  },
  {
    name: 'Sales Analytics, Yumssie Foods',
    role: 'Commercial Analytics Project',
    image: '/images/hydroflowface1.jpg',
    quote:
      '"Formulated and implemented a data-informed sales optimization strategy. Conducted multi-variable customer cohort and transaction analysis that directly drove a 15% increase in average deal size."'
  },
  {
    name: 'Leadership & Academic Honors',
    role: 'B.Tech CS · IBM & Google Cloud Certified',
    image: '/images/hydroflowface6.jpg',
    quote:
      '"B.Tech in Computer Science (2021–2025). Certified in IBM Data Science and Google Cloud Core Infrastructure & Automation. Served as Associate Lead at Google Developers Group (2024–25) and 2× Google Arcade Facilitator."'
  }
];

export default function Products() {
  const headlineRef = useRef(null);
  const itemRefs = useRef([]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps'
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((api) => {
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  // Enable trackpad / mousewheel horizontal scrolling
  useEffect(() => {
    const container = emblaRef.current;
    if (!container || !emblaApi) return;

    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) {
        e.preventDefault();
        if (e.deltaX > 0 || (e.shiftKey && e.deltaY > 0)) {
          emblaApi.scrollNext();
        } else {
          emblaApi.scrollPrev();
        }
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [emblaApi]);

  useEffect(() => {
    if (headlineRef.current) {
      const splitHeadline = new SplitType(headlineRef.current, { type: 'words' });
      if (splitHeadline.words) {
        gsap.fromTo(
          splitHeadline.words,
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
            stagger: 0.075,
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

    // Animate ALL cards (no .slice limit)
    itemRefs.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, yPercent: 20 },
          {
            delay: index * 0.08,
            opacity: 1,
            yPercent: 0,
            duration: 0.85,
            ease: 'sine',
            scrollTrigger: {
              trigger: '.products-carousel-wrapper',
              start: 'top 95%'
            }
          }
        );
      }
    });
  }, []);

  return (
    <section className="products" id="experience">
      <div className="products-content">
        <div className="products-content-textbox">
          <h1 className="at-headline black" ref={headlineRef}>
            Proven Track Record & Career Milestones
          </h1>
        </div>

        <div className="products-carousel-wrapper">
          <div
            className="products-carousel"
            ref={emblaRef}
            style={{
              cursor: 'grab',
              overflow: 'hidden',
              paddingTop: '16px',
              paddingBottom: '24px'
            }}
          >
            <div className="products-carousel-row" style={{ display: 'flex', gap: '1.5vw' }}>
              <div className="products-item-padding"></div>
              {experiences.map((item, idx) => (
                <div
                  className="products-item"
                  key={idx}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #1b1b1b',
                    borderRadius: '14px',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.3s cubic-bezier(0.2, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.14), 0 4px 12px rgba(0, 0, 0, 0.06)';
                    e.currentTarget.style.borderColor = '#ff7120';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)';
                    e.currentTarget.style.borderColor = '#1b1b1b';
                  }}
                >
                  <div className="products-item-top">
                    <div
                      className="products-item-circle"
                      style={{
                        border: '2px solid #1b1b1b',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      <img
                        src={item.image}
                        className="products-item-circle-image"
                        alt={item.name}
                        width="100"
                        height="100"
                      />
                    </div>
                    <p
                      className="description black"
                      style={{
                        lineHeight: '1.6',
                        color: '#262626',
                        fontSize: '0.95rem'
                      }}
                    >
                      {item.quote}
                    </p>
                  </div>
                  <div
                    className="products-item-bottom"
                    style={{
                      borderTop: '1px solid rgba(27, 27, 27, 0.1)',
                      paddingTop: '16px'
                    }}
                  >
                    <p
                      className="title-description black"
                      style={{
                        fontWeight: 700,
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '1.05rem',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="description"
                      style={{
                        fontWeight: 500,
                        color: '#6b7280',
                        fontSize: '0.85rem'
                      }}
                    >
                      {item.role}
                    </p>
                  </div>
                </div>
              ))}
              <div className="products-item-padding"></div>
            </div>
          </div>

          <div className="products-content-bottom">
            <div className="products-content-bottom-buttons">
              <button
                className="carousel-button"
                type="button"
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
                aria-label="Previous"
                style={{
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  cursor: prevBtnDisabled ? 'not-allowed' : 'pointer'
                }}
              >
                <svg
                  className="carousel-button-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.3212 2.91429C14.3212 2.40934 13.9118 2 13.4069 2H11.5783C11.0734 2 10.664 2.40934 10.664 2.91429V4.28571C10.664 4.79066 10.2547 5.2 9.74975 5.2H8.37832C7.87337 5.2 7.46404 5.60934 7.46404 6.11429V7.48571C7.46404 7.99066 7.0547 8.4 6.54975 8.4H5.17832C4.67338 8.4 4.26404 8.80934 4.26404 9.31429V11.1429C14.26404 11.6478 4.67338 12.0571 5.17832 12.0571H7.00689C7.51184 12.0571 7.92118 12.4665 7.92118 12.9714V13.8857C7.92118 14.3907 8.33052 14.8 8.83546 14.8H10.2069C10.7118 14.8 11.1212 15.2093 11.1212 15.7143V17.0857C11.1212 17.5907 11.5305 18 12.0355 18H13.864C14.369 18 14.7783 17.5907 14.7783 17.0857V15.2571C14.7783 14.7522 14.369 14.3429 13.864 14.3429H12.4926C11.9877 14.3429 11.5783 13.9335 11.5783 13.4286V12.0571C11.5783 11.5522 11.169 11.1429 10.664 11.1429H8.83546C8.33052 11.1429 7.92118 10.7335 7.92118 10.2286V9.77143C7.92118 9.26648 8.33052 8.85714 8.83546 8.85714H10.2069C10.7118 8.85714 11.1212 8.4478 11.1212 7.94286V6.57143C11.1212 6.06648 11.5305 5.65714 12.0355 5.65714H13.4069C13.9118 5.65714 14.3212 5.2478 14.3212 4.74286V2.91429Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <button
                className="carousel-button"
                type="button"
                onClick={scrollNext}
                disabled={nextBtnDisabled}
                aria-label="Next"
                style={{
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  cursor: nextBtnDisabled ? 'not-allowed' : 'pointer'
                }}
              >
                <svg
                  className="carousel-button-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.67882 2.91429C5.67882 2.40934 6.08816 2 6.59311 2H8.42168C8.92663 2 9.33597 2.40934 9.33597 2.91429V4.28571C9.33597 4.79066 9.7453 5.2 10.2503 5.2H11.6217C12.1266 5.2 12.536 5.60934 12.536 6.11429V7.48571C12.536 7.99066 12.9453 8.4 13.4503 8.4H14.8217C15.3266 8.4 15.736 8.80934 15.736 9.31429V11.1429C15.736 11.6478 15.3266 12.0571 14.8217 12.0571H12.9931C12.4882 12.0571 12.0788 12.4665 12.0788 12.9714V13.8857C12.0788 14.3907 11.6695 14.8 11.1645 14.8H9.79311C9.28816 14.8 8.87882 15.2093 8.87882 15.7143V17.0857C8.87882 17.5907 8.46948 18 7.96454 18H6.13597C5.63102 18 5.22168 17.5907 5.22168 17.0857V15.2571C5.22168 14.7522 5.63102 14.3429 6.13597 14.3429H7.50739C8.01234 14.3429 8.42168 13.9335 8.42168 13.4286V12.0571C8.42168 11.5522 8.83102 11.1429 9.33597 11.1429H11.1645C11.6695 11.1429 12.0788 10.7335 12.0788 10.2286V9.77143C12.0788 9.26648 11.6695 8.85714 11.1645 8.85714H9.79311C9.28816 8.85714 8.87882 8.4478 8.87882 7.94286V6.57143C8.87882 6.06648 8.46948 5.65714 7.96454 5.65714H6.59311C6.08816 5.65714 5.67882 5.2478 5.67882 4.74286V2.91429Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
