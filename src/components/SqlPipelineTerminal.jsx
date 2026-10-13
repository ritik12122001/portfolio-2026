import React, { useState, useEffect } from 'react';

export default function SqlPipelineTerminal({ triggerActive }) {
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);
  const [pulse, setPulse] = useState(false);

  const queries = [
    `-- E-Shikshakosh National Portal Audit
SELECT 
    d.district_name,
    COUNT(s.student_id) AS total_enrolment,
    ROUND(AVG(s.attendance_rate), 2) AS avg_attendance,
    RANK() OVER (ORDER BY COUNT(s.student_id) DESC) as district_rank
FROM national_portal.schools sc
JOIN national_portal.students s ON sc.school_id = s.school_id
JOIN national_portal.districts d ON sc.district_id = d.district_id
WHERE s.is_audit_verified = TRUE
GROUP BY d.district_name;`,

    `-- Real-Time KPI Pipeline & Attendance Aggregation
WITH school_metrics AS (
    SELECT 
        school_id,
        COUNT(CASE WHEN status = 'PRESENT' THEN 1 END) AS present_count,
        COUNT(*) AS total_students
    FROM ed_portal.attendance_daily
    WHERE date = CURRENT_DATE
    GROUP BY school_id
)
SELECT 
    school_id,
    ROUND((present_count::decimal / total_students) * 100, 2) AS attendance_kpi,
    CASE WHEN (present_count::decimal / total_students) >= 0.85 THEN 'TARGET MET' ELSE 'ALERT' END AS status
FROM school_metrics;`
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQueryIndex((prev) => (prev + 1) % queries.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [queries.length]);

  useEffect(() => {
    if (triggerActive) {
      setPulse(true);
      const timer = setTimeout(() => setPulse(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [triggerActive]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: pulse ? '2px solid #059669' : '1px solid #1b1b1b',
        boxShadow: pulse
          ? '0 0 24px rgba(16, 185, 129, 0.35)'
          : '0 8px 24px rgba(0, 0, 0, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'monospace',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Titlebar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
          <span style={{ color: '#1e293b', fontSize: '11px', marginLeft: '8px', fontWeight: 700, letterSpacing: '0.04em' }}>
            SQL ANALYTICS ENGINE // RITIK
          </span>
        </div>
        <div>
          <span
            style={{
              fontSize: '11px',
              padding: '3px 10px',
              borderRadius: '6px',
              backgroundColor: pulse ? '#ecfdf5' : '#fff4eb',
              color: pulse ? '#059669' : '#ea580c',
              border: `1px solid ${pulse ? '#059669' : '#ff7120'}`,
              fontWeight: 700
            }}
          >
            {pulse ? '● EXECUTING QUERY' : '● LIVE PIPELINE'}
          </span>
        </div>
      </div>

      {/* Code Text Area */}
      <div
        style={{
          flex: 1,
          padding: '14px 18px',
          overflowY: 'auto',
          fontSize: '11.5px',
          lineHeight: '1.5',
          color: '#1e293b',
          whiteSpace: 'pre-wrap',
          backgroundColor: '#ffffff'
        }}
      >
        {queries[activeQueryIndex]}
      </div>

      {/* Real-time Status Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          padding: '10px 16px',
          backgroundColor: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          fontSize: '11px'
        }}
      >
        <div>
          <div style={{ color: '#64748b', fontSize: '10px', fontWeight: 600 }}>AUDITED RECORDS</div>
          <div style={{ color: '#1b1b1b', fontWeight: 800 }}>400,000+ Verified</div>
        </div>
        <div>
          <div style={{ color: '#64748b', fontSize: '10px', fontWeight: 600 }}>QUERY LATENCY</div>
          <div style={{ color: '#0284c7', fontWeight: 800 }}>12ms Execution</div>
        </div>
        <div>
          <div style={{ color: '#64748b', fontSize: '10px', fontWeight: 600 }}>QUALITY SCORE</div>
          <div style={{ color: '#059669', fontWeight: 800 }}>99.8% Accuracy</div>
        </div>
      </div>
    </div>
  );
}
