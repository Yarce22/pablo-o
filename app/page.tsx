import { HeroSlider } from './components/HeroSlider';
import { heroSlides, HERO_TAGLINE, HERO_TITLE } from './lib/mock-data';

export default function Home() {
  return (
    <HeroSlider
      slides={heroSlides}
      tagline={HERO_TAGLINE}
      heroTitle={HERO_TITLE}
    />
  );
}
