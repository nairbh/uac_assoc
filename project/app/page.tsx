import { HeroSection } from '@/components/home/hero-section';
import { AboutPreview } from '@/components/home/about-preview';
import { TestimonialsSection } from '@/components/home/testimonials-section';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutPreview />
      <TestimonialsSection />
    </div>
  );
}