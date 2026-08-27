import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Aurora from './components/Aurora';
import Particles from './components/Particles';
import Nav from './components/Nav';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import N8nPage from './pages/N8nPage';
import ChatIaPage from './pages/ChatIaPage';
import DesarrolloIaPage from './pages/DesarrolloIaPage';
import NotFoundPage from './pages/NotFoundPage';
import { LanguageProvider } from './i18n/LanguageContext';

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const onOpenChat = () => setChatOpen(true);

  return (
    <BrowserRouter>
      <LanguageProvider>
        <ScrollToTop />
        <Aurora />
        <Particles />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home onOpenChat={onOpenChat} />} />
            <Route path="/n8n" element={<N8nPage />} />
            <Route path="/chat-ia" element={<ChatIaPage />} />
            <Route path="/desarrollo-ia" element={<DesarrolloIaPage />} />

            <Route path="/en" element={<Home onOpenChat={onOpenChat} />} />
            <Route path="/en/n8n" element={<N8nPage />} />
            <Route path="/en/chat-ia" element={<ChatIaPage />} />
            <Route path="/en/desarrollo-ia" element={<DesarrolloIaPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget isOpen={chatOpen} onToggle={() => setChatOpen((v) => !v)} />
      </LanguageProvider>
    </BrowserRouter>
  );
}
