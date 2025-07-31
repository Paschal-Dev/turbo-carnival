// src/pages/Home.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/header';
import Hero from '../components/hero';
import About from '../components/about';
import Programs from '../components/program';
import Testimonials from '../components/testimonial';
import Contact from '../components/contact';
import Footer from '../components/footer';
import { Box } from '@mui/material';

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        const offset = 80;
        const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <Box sx={{ mt: '80px' }}>
      <Header />
      <Hero />
      <div id="about">
        <About />
      </div>
      <div id="programs">
        <Programs />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </Box>
  );
};

export default Home;