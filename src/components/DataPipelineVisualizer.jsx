import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DataPipelineVisualizer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stages = [
      {
        title: '01 / RAW INGESTION',
        desc: 'Source Systems · Firebase Realtime DB · School Surveys',
        metrics: '400,000+ Raw Ingestion Records',
        color: '#ff7120',
        bg: '#fff7ed'
      },
      {
        title: '02 / SQL AUDIT & ETL',
        desc: 'Window Functions · CTEs · Anomaly & Range Auditing',
        metrics: '6-Month Correction Drive · Deduplication',
        color: '#d97706',
        bg: '#fffbeb'
      },
      {
        title: '03 / STAR SCHEMA MODEL',
        desc: 'Fact Tables · Dimension Entities · Relational Integrity',
        metrics: 'Automated Data Prep · Zero Pipeline Errors',
        color: '#0284c7',
        bg: '#f0f9ff'
      },
      {
        title: '04 / EXECUTIVE BI SUITE',
        desc: 'Power BI DAX · Excel Macros · Real-Time KPI Boards',
        metrics: '2,200+ Schools · 10K+ Teachers Active',
        color: '#059669',
        bg: '#ecfdf5'
      }
    ];

    const state = { scrollProgress: 0, packetProgress: 0 };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Clean light background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Light technical grid
      ctx.strokeStyle = '#f1f5f9';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Title Banner
      ctx.fillStyle = '#fff4eb';
      ctx.fillRect(60, 50, canvas.width - 120, 60);
      ctx.strokeStyle = '#ff7120';
      ctx.lineWidth = 2;
      ctx.strokeRect(60, 50, canvas.width - 120, 60);
      ctx.fillStyle = '#1b1b1b';
      ctx.font = 'bold 22px monospace';
      ctx.fillText('ENTERPRISE DATA PIPELINE // E-SHIKSHAKOSH ARCHITECTURE', 90, 88);

      // Vertical Pipeline Spine Line
      const spineX = 180;
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(spineX, 160);
      ctx.lineTo(spineX, canvas.height - 100);
      ctx.stroke();

      // Glowing Active Flow on Spine Line
      const activeHeight = (canvas.height - 260) * state.scrollProgress;
      ctx.strokeStyle = '#ff7120';
      ctx.lineWidth = 6;
      ctx.shadowColor = 'rgba(255, 113, 32, 0.4)';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(spineX, 160);
      ctx.lineTo(spineX, 160 + activeHeight);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw Stages
      const startY = 200;
      const stageGap = 260;

      stages.forEach((stage, idx) => {
        const stageY = startY + idx * stageGap;
        const isReached = state.scrollProgress >= idx / (stages.length - 1) - 0.15;

        // Node Circle
        ctx.fillStyle = isReached ? stage.color : '#cbd5e1';
        ctx.beginPath();
        ctx.arc(spineX, stageY, 22, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(spineX, stageY, 10, 0, Math.PI * 2);
        ctx.stroke();

        // Stage Card Box
        const cardX = spineX + 60;
        const cardW = canvas.width - cardX - 70;
        const cardH = 180;

        ctx.fillStyle = isReached ? '#ffffff' : '#f8fafc';
        ctx.fillRect(cardX, stageY - 60, cardW, cardH);
        ctx.strokeStyle = isReached ? '#1b1b1b' : '#e2e8f0';
        ctx.lineWidth = isReached ? 2 : 1;
        ctx.strokeRect(cardX, stageY - 60, cardW, cardH);

        // Stage Title
        ctx.fillStyle = isReached ? stage.color : '#64748b';
        ctx.font = 'bold 22px monospace';
        ctx.fillText(stage.title, cardX + 30, stageY - 20);

        // Stage Description
        ctx.fillStyle = '#334155';
        ctx.font = '500 20px sans-serif';
        ctx.fillText(stage.desc, cardX + 30, stageY + 25);

        // Stage Metrics
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 18px monospace';
        ctx.fillText(`● ${stage.metrics}`, cardX + 30, stageY + 70);

        // Connection Line from Spine to Card
        ctx.strokeStyle = isReached ? stage.color : '#e2e8f0';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(spineX + 22, stageY);
        ctx.lineTo(cardX, stageY);
        ctx.stroke();
      });

      // Flowing data packets along the spine
      const packetY = 160 + ((canvas.height - 260) * ((state.packetProgress) % 1));
      ctx.fillStyle = '#ff7120';
      ctx.shadowColor = 'rgba(255, 113, 32, 0.6)';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(spineX, packetY, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const tl = gsap.to(state, {
      scrollProgress: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.grid',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    let animId;
    const animateLoop = () => {
      state.packetProgress += 0.008;
      draw();
      animId = requestAnimationFrame(animateLoop);
    };
    animId = requestAnimationFrame(animateLoop);

    return () => {
      tl.kill();
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="image-sequence-canvas"
      id="image-sequence"
      width="1080"
      height="1300"
      style={{
        borderRadius: '12px',
        border: '1px solid #1b1b1b',
        backgroundColor: '#ffffff'
      }}
    />
  );
}
