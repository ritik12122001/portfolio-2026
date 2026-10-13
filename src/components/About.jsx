import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const headlineRef = useRef(null);
  const tagRef = useRef(null);
  const descRef = useRef(null);

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
            stagger: 0.035,
            duration: 1,
            ease: 'power1',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top bottom'
            }
          }
        );
      }
    }

    if (tagRef.current) {
      gsap.fromTo(
        tagRef.current,
        { filter: 'blur(3px)', opacity: 0, y: '2.5vh' },
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration: 1.25,
          ease: 'power1',
          scrollTrigger: {
            trigger: tagRef.current,
            start: 'top 95%'
          }
        }
      );
    }

    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { filter: 'blur(3px)', opacity: 0, y: '2.5vh' },
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration: 1.25,
          ease: 'power1',
          scrollTrigger: {
            trigger: descRef.current,
            start: 'top 95%'
          }
        }
      );
    }
  }, []);

  return (
    <section className="about" id="about">
      <div className="about-content">
        <p className="description white" ref={tagRef}>
          Professional Summary & Analytics Philosophy
        </p>
        <h1 className="at-headline white" ref={headlineRef}>
          WHERE SOFTWARE ENGINEERING MEETS HIGH-STAKES DATA ANALYTICS
        </h1>
        <p className="description about-description white" ref={descRef}>
          Data Analyst with nearly 3 years of experience across analytics and software engineering, currently
          owning data operations for a national education programme covering 2,200+ schools, 400,000+ students,
          and 10,000+ teachers. Builds SQL-driven Power BI and Excel dashboards that replace manual reporting
          cycles with real-time visibility on enrolment, attendance, and staffing. Led a data-quality correction drive
          across 400,000+ student records. An engineering background in Kotlin and Firebase adds working knowledge
          of how source systems generate data — useful for debugging pipelines and partnering with development
          teams on data tooling.
        </p>
      </div>
    </section>
  );
}
