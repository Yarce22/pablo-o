import { HeroSlider } from './components/HeroSlider';
import { getHeroSlides, getSiteSettings } from './lib/contentful-api';
import { heroSlides as mockSlides, HERO_TAGLINE, HERO_TITLE } from './lib/mock-data';

export default async function Home() {
  const [cfSlides, settings] = await Promise.all([
    getHeroSlides().catch(() => []),
    getSiteSettings().catch(() => null),
  ]);

  const slides = cfSlides.length > 0 ? cfSlides : mockSlides;
  const tagline = settings?.heroTagline ?? HERO_TAGLINE;
  const heroTitle = settings?.heroTitle ?? HERO_TITLE;

  return (
    <HeroSlider
      slides={slides}
      tagline={tagline}
      heroTitle={heroTitle}
    />
  );
}
