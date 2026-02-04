import React from "react";
import Navbar from "../components/NavBar";
import Hero from "../components/section/Hero";
import AppShowcase from "../components/section/ShowcaseSection";
import LogoShowcase from "../components/section/LogoShowcase";
import FeatureCards from "../components/section/FeatureCards";
import Experience from "../components/section/ExperienceSection";
import TechStack from "../components/section/TechStack";
import Testimonials from "../components/section/Testimonials";
import Contact from "../components/section/Contact";
import Footer from "../components/section/Footer";

import ProjectShowcase from "../components/Projects/ProjectShowcase";
import useTrackRouteDuration from "../utils/useTrackDuration";
import AnimatedTechStack from "../components/section/AnimatedTechCard";
import BlogSection from "../components/BlogSection";

const HomePage = () => {
  // useTrackRouteDuration({ });
  return (
    <div>
      <Navbar />
      <Hero />
      
      <ProjectShowcase />
      <LogoShowcase />
      {/* <AnimatedTechStack /> */}
      <FeatureCards />
      <Experience />
      <TechStack />
      <Testimonials />
      <BlogSection />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;
