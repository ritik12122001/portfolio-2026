import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqList = [
  {
    title: "What is Ritik's core analytics tech stack?",
    content:
      "Primary expertise in SQL (complex joins, CTEs, window functions, aggregations), Power BI (DAX, Power Query M, star schemas, row-level security), and Microsoft Excel (PivotTables, Power Pivot, dynamic arrays, automated reporting macros). Experienced in KPI architecture and designing executive decision boards."
  },
  {
    title: "How does a software engineering background in Kotlin benefit data analysis?",
    content:
      "Having engineered production features in Kotlin and managed Firebase Realtime Database schemas, Ritik understands data from the source code up — knowing precisely how user events generate database writes, how schemas evolve, and why pipelines fail. This ensures faster root-cause diagnosis and seamless collaboration with software engineering teams."
  },
  {
    title: "What scale of data operations has Ritik managed?",
    content:
      "Currently owns data operations for the E-Shikshakosh national education portal covering 2,200+ schools, 400,000+ students, and 10,000+ teachers. Led a rigorous data-quality audit and correction drive across 400,000+ records in 6 months, reducing downstream reporting discrepancies and district-level rework."
  },
  {
    title: "What certifications and leadership roles does Ritik hold?",
    content:
      "IBM Data Science Certified, Google Cloud Core Infrastructure & Scaling/Automation (Coursera), Salesforce Certified Developer Intern (Certificate ID: SISFVIPAD2024-86867). Served as Associate Lead at Google Developers Group (2024–25) and two-time Google Arcade Facilitator."
  },
  {
    title: "What are some notable engineering and analytics projects Ritik has built?",
    content:
      "Architected the E-Rojgaar employment platform from concept to production in 7 months with real-time sync and centralized admin controls. Formulated the Yumssie Foods sales analytics strategy boosting average deal size by 15%. Engineered the AutoStocks.ai machine learning market analysis capstone."
  },
  {
    title: "How can you get in touch or hire Ritik?",
    content:
      "Available for high-impact Data Analyst and Analytics Engineering opportunities. You can reach out directly via email at <a href='mailto:rk7703463@gmail.com' style='color:#ff7120;font-weight:600;text-decoration:underline;'>rk7703463@gmail.com</a> or phone at <a href='tel:+919693149491' style='color:#ff7120;font-weight:600;text-decoration:underline;'>+91 96931 49491</a>."
  }
];

function AccordionItem({ item, index, isActive, onToggle }) {
  const contentRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState('0px');

  useEffect(() => {
    setMaxHeight(isActive && contentRef.current ? `${contentRef.current.scrollHeight}px` : '0px');
  }, [isActive]);

  return (
    <div className="accordion-section">
      <div className={`accordion ${isActive ? 'active' : ''}`} onClick={() => onToggle(index)}>
        <div className="accordion-top">
          <h2 className="at-description black">{item.title}</h2>
          <div className="accordion-icon">
            <Plus
              className={`accordion-icon-icon ${isActive ? 'rotate' : ''}`}
              style={{ transition: 'transform 0.5s ease' }}
            />
          </div>
        </div>
        <div ref={contentRef} style={{ maxHeight }} className="accordion-content">
          <div className="description black" dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const titleRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  useEffect(() => {
    if (titleRef.current) {
      const splitTitle = new SplitType(titleRef.current, { type: 'words' });
      if (splitTitle.words) {
        gsap.fromTo(
          splitTitle.words,
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
              trigger: titleRef.current,
              start: 'top 95%'
            }
          }
        );
      }
    }

    itemRefs.current.forEach((el) => {
      if (el) {
        gsap.fromTo(
          el,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: 'sine',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom'
            }
          }
        );
      }
    });
  }, []);

  return (
    <section className="faq" id="faq">
      <div className="faq-content">
        <div className="faq-content-textbox">
          <h1 className="at-headline black" ref={titleRef}>
            Technical Expertise & FAQs
          </h1>
        </div>
        <div className="faq-content-questions">
          {faqList.map((item, index) => (
            <article key={index} ref={(el) => (itemRefs.current[index] = el)}>
              <AccordionItem
                item={item}
                index={index}
                isActive={activeIndex === index}
                onToggle={handleToggle}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
