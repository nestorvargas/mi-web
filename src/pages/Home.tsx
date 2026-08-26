import Hero from '../components/Hero';
import Services from '../components/Services';
import Stack from '../components/Stack';
import Portfolio from '../components/Portfolio';
import Terminal from '../components/Terminal';
import AboutMe from '../components/AboutMe';
import { useLanguage } from '../i18n/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';

type Props = {
  onOpenChat: () => void;
};

export default function Home({ onOpenChat }: Props) {
  const { t } = useLanguage();
  usePageMeta(t.home.meta, 'home');

  return (
    <>
      <Hero onOpenChat={onOpenChat} />
      <Services />
      <Stack />
      <Portfolio />
      <Terminal />
      <AboutMe />
    </>
  );
}
