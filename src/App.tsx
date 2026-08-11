import { useState } from 'react';
import Aurora from './components/Aurora';
import Particles from './components/Particles';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Services from './components/Services';
import Stack from './components/Stack';
import Portfolio from './components/Portfolio';
import Terminal from './components/Terminal';
import AboutMe from './components/AboutMe';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <Aurora />
      <Particles />
      <Nav />
      <main>
        <Hero onOpenChat={() => setChatOpen(true)} />
        <Services />
        <Stack />
        <Portfolio />
        <Terminal />
        <AboutMe />
      </main>
      <Footer />
      <ChatWidget isOpen={chatOpen} onToggle={() => setChatOpen((v) => !v)} />
    </>
  );
}
