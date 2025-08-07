import { Box } from '@mui/material';
import Header from '../components/header';
import Hero from '../components/hero';
import About from '../components/about';
import Programs from '../components/program';
import EventsSection from '../components/events/eventSection';
import BlogSection from '../components/blog/blogSection';
import YouTubeFeed from '../components/social/youtubeFeed';
import Testimonials from '../components/testimonial';
import Contact from '../components/contact';
import MilestonesTable from '../components/progress/milestoneTable';
import Footer from '../components/footer';

const Home = () => {
  return (
    <Box sx={{ mt: '80px' }}>
      <Header />
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="programs">
        <Programs />
      </div>
      <div id="events">
        <EventsSection />
      </div>
      <div id="blog">
        <BlogSection />
      </div>
      <div id="youtube">
        <YouTubeFeed />
      </div>
      <div id="milestones">
        <MilestonesTable />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <div>
        <Footer />
      </div>
    </Box>
  );
};

export default Home;