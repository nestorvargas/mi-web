import Hero from '../components/Hero';
import Services from '../components/Services';
import Stack from '../components/Stack';
import Portfolio from '../components/Portfolio';
import Terminal from '../components/Terminal';
import AboutMe from '../components/AboutMe';

type Props = {
  onOpenChat: () => void;
};

export default function Home({ onOpenChat }: Props) {
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
