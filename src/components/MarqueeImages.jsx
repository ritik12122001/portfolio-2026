import React from 'react';
import Marquee from 'react-fast-marquee';

const projectCards = [
  {
    title: 'E-Shikshakosh National Portal',
    desc: 'Own data operations covering 2,200+ schools, 400,000+ students, and 10,000+ teachers. Built SQL & Power BI dashboards for live tracking.',
    stat: '400,000+ Records Managed',
    tags: ['SQL', 'Power BI', 'Data Operations']
  },
  {
    title: 'Attendance & Enrolment KPI Suite',
    desc: 'SQL-backed Power BI & Excel reporting replacing manual compilation cycles with real-time district-level visibility on student attendance and staffing.',
    stat: 'Automated Real-Time KPI Suite',
    tags: ['DAX', 'Star Schema', 'Excel Power Query']
  },
  {
    title: '400K+ Data Quality Audit Initiative',
    desc: 'Led a systematic data-quality audit and correction drive over 6 months, drastically eliminating downstream reporting discrepancies and district rework.',
    stat: '99.8% Verified Accuracy',
    tags: ['Window Functions', 'ETL', 'Deduplication']
  },
  {
    title: 'E-Rojgaar Employment Platform',
    desc: 'Delivered an enterprise employment portal from concept to live production in 7 months with real-time Firebase DB sync and centralized admin governance.',
    stat: 'Full Lifecycle Production',
    tags: ['Kotlin', 'Firebase', 'Schema Design']
  },
  {
    title: 'Yumssie Foods Sales Strategy',
    desc: 'Formulated a data-informed sales optimization framework utilizing transaction segmentation and customer pricing cohorts to maximize deal margins.',
    stat: '+15% Average Deal Size',
    tags: ['Cohort Analysis', 'Advanced Excel', 'KPI Strategy']
  },
  {
    title: 'AutoStocks.ai Prediction Engine',
    desc: 'Machine learning market prediction capstone integrating historical trend feeds, statistical feature engineering, and model evaluation.',
    stat: 'Computer Science B.Tech Capstone',
    tags: ['Python', 'ML Modeling', 'Time Series']
  }
];

export default function MarqueeImages() {
  return (
    <section
      className="images"
      id="showcase"
      style={{
        width: '100vw',
        maxWidth: '100%',
        padding: '5vh 0',
        overflow: 'hidden'
      }}
    >
      <div
        className="images-content"
        style={{
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <Marquee
          gradient={false}
          speed={45}
          pauseOnHover={true}
          style={{ width: '100%' }}
        >
          {projectCards.map((card, index) => (
            <div
              key={index}
              style={{
                width: '380px',
                minWidth: '360px',
                minHeight: '260px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px 26px',
                margin: '0 14px',
                backgroundColor: '#ffffff',
                border: '1px solid #1b1b1b',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                color: '#1b1b1b',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    margin: '0 0 10px 0',
                    color: '#1b1b1b',
                    letterSpacing: '-0.01em',
                    lineHeight: '1.3'
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#4b5563',
                    lineHeight: '1.55',
                    margin: 0
                  }}
                >
                  {card.desc}
                </p>
              </div>

              <div
                style={{
                  borderTop: '1px solid rgba(27, 27, 27, 0.12)',
                  paddingTop: '14px',
                  marginTop: '16px'
                }}
              >
                <div
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: '#6b7280',
                    marginBottom: '10px'
                  }}
                >
                  {card.stat}
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {card.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '11px',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        border: '1px solid #e5e7eb',
                        fontWeight: 600
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
