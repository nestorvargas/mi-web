import { useState } from 'react';
import Particles from './components/Particles';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Services from './components/Services';
import Stack from './components/Stack';
import Portfolio from './components/Portfolio';
import AboutMe from './components/AboutMe';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Particles />
      <Nav />
      <main>
        <Hero onOpenChat={() => setChatOpen(true)} />
        <Services />
        <Stack />
        <Portfolio />
        <AboutMe />
      </main>
      <Footer />
      <ChatWidget isOpen={chatOpen} onToggle={() => setChatOpen((v) => !v)} />
    </>
  );
}
