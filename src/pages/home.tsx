import { Box } from "@mui/material";
import Header from "../components/header";
import Hero from "../components/hero";
import About from "../components/about";
import Programs from "../components/program";
import EventsSection from "../components/events/eventSection";
import BlogSection from "../components/blog/blogSection";
import Testimonials from "../components/testimonial";
import Contact from "../components/contact";
import MilestonesTable from "../components/progress/milestoneTable";
import Footer from "../components/footer";
import Poem from "../components/poem";
import SchoolBoard from "../components/schoolBoard";
import GoldStreamFoundation from "../components/info.";
import AdvertisementOverlay from "../components/ads";
import MediaGallery from "../components/social/youtubeFeed";

const Home = () => {
  return (
    <Box>
      <AdvertisementOverlay />
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
      <Poem />
      <div id="events">
        <EventsSection />
        <div id="milestones">
          <MilestonesTable />
        </div>
      </div>
      <div>
        <SchoolBoard />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="blog">
        <BlogSection />
      </div>
      <div id="youtube">
        <MediaGallery />
      </div>
      <div>
        <GoldStreamFoundation />
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
