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
        <title>Deborah Santalena | Massoterapia & Bem-estar</title>
        <meta name="description" content="Experimente serviços profissionais de massoterapia com Deborah Santalena. Massagens relaxantes, terapêuticas e especializadas para restaurar o equilíbrio e promover o bem-estar." />
        <meta property="og:title" content="Deborah Santalena | Massoterapia & Bem-estar" />
        <meta property="og:description" content="Serviços profissionais de massoterapia incluindo tratamentos relaxantes, terapêuticos e especializados para sua jornada de bem-estar." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://deborahsantalena.com" />
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
