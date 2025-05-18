import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Map from "@/components/Map";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Alexandra Williams | Massage Therapy & Wellness</title>
        <meta name="description" content="Experience professional massage therapy services with Alexandra Williams. Relaxing, therapeutic, and specialized massage treatments to restore balance and promote wellness." />
        <meta property="og:title" content="Alexandra Williams | Massage Therapy & Wellness" />
        <meta property="og:description" content="Professional massage therapy services including relaxing, therapeutic, and specialized treatments for your wellness journey." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alexandrawilliams.com" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Hero />
          <Services />
          <About />
          <Benefits />
          <Gallery />
          <Testimonials />
          <Contact />
          <Map />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
