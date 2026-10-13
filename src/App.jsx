import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ReactLenis, useLenis } from 'lenis/react';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Grid from './components/Grid';
import Products from './components/Products';
import MarqueeImages from './components/MarqueeImages';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const textRef = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    if (loadingScreen && lenis) {
      lenis.stop();
    }
  }, [lenis, loadingScreen]);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      if (lenis) lenis.start();
      setLoadingScreen(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [lenis]);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { backgroundPosition: '0% 0%' },
        { backgroundPosition: '100% 100%', duration: 2, ease: 'power1.inOut', yoyo: true, repeat: -1 }
      );
    }
  }, []);

  return (
    <ReactLenis root>
      <Navigation />
      <div className={`initial-loading-screen ${isLoaded ? 'fade-out' : ''}`}>
        <h1 className="at-subheadline gradient-text" ref={textRef} style={{ letterSpacing: '0.15em' }}>
          RITIK
        </h1>
      </div>
      <div className="background-container">
        <Hero />
        <About />
        <Grid />
        <Products />
        <MarqueeImages />
        <FAQ />
        <Footer />
      </div>
    </ReactLenis>
  );
}
