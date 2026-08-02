import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useEffect, useRef, useState } from 'react';
import { ContactAndMapSection } from './components/ContactAndMapSection';
import { ContactModal } from './components/ContactModal';
import { CursorSpotlight } from './components/CursorSpotlight';
import { ExploreModal } from './components/ExploreModal';
import { FeaturedResidencesSection } from './components/FeaturedResidencesSection';
import { GrandFooter } from './components/GrandFooter';
import { HeroHeading } from './components/HeroHeading';
import { HomeLoansSection } from './components/HomeLoansSection';
import { InteriorsShowcaseSection } from './components/InteriorsShowcaseSection';
import { MaterialsDrawer } from './components/MaterialsDrawer';
import { Navbar } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { RealEstateAdvisorsSection } from './components/RealEstateAdvisorsSection';
import { ScrollProgress } from './components/ScrollProgress';
import { ServicesGridSection } from './components/ServicesGridSection';
import { SustainableMaterialsCard } from './components/SustainableMaterialsCard';
import { TeamModal } from './components/TeamModal';
import { TeamSpecialistsBadge } from './components/TeamSpecialistsBadge';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TiltCard } from './components/TiltCard';
import { TopRightGlassCard } from './components/TopRightGlassCard';
import { TrustedPartnersSection } from './components/TrustedPartnersSection';
import { ValuePropBlock } from './components/ValuePropBlock';
import {
  initParallax,
    initReveals,
      killTriggers,
        prefersReducedMotion,
        } from './lib/animations';

        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // Modal states
  const [exploreOpen, setExploreOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [materialsOpen, setMaterialsOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const heroIntro = useRef<gsap.core.Timeline | null>(null);
  const revealTriggers = useRef<ScrollTrigger[]>([]);
  const parallaxTriggers = useRef<ScrollTrigger[]>([]);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll & GSAP ScrollTriggers
  useEffect(() => {
    // Global ripple click effect on .ripple-btn elements
    const onRippleClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>('.ripple-btn');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ink = document.createElement('span');
      ink.className = 'ripple-ink';
      ink.style.width = ink.style.height = `${size}px`;
      ink.style.left = `${e.clientX - rect.left - size / 2}px`;
      ink.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ink);
      setTimeout(() => ink.remove(), 650);
    };
    document.addEventListener('click', onRippleClick);

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    lenis.stop(); // frozen until the intro curtain lifts

    // Single driver: gsap.ticker keeps Lenis + ScrollTrigger perfectly locked
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);

    // Hero Background: cinematic ken-burns + scrub parallax
    const heroBg = document.getElementById('hero-bg-img');
    const heroSec = document.getElementById('hero-section');
    if (heroBg && heroSec) {
      gsap.fromTo(
        heroBg,
        { scale: 1.22, yPercent: -4 },
        {
          scale: 1.02,
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSec,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    // Layered depth scroll: hero content drifts slower than the background
    const heroContent = document.getElementById('hero-content');
    if (heroContent && heroSec) {
      gsap.fromTo(
        heroContent,
        { yPercent: 0 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSec,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    // Hero entrance choreography: the background "screen" splits open with a
    // clip wipe while nav, title & cards rise with depth beneath it.
    // (held paused until the page preloader lifts its curtain)
    heroIntro.current = gsap.timeline({ paused: true });
    heroIntro.current
      .fromTo(
        '.hero-bg-clip',
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power3.inOut' },
        0
      )
      .from(
        '[data-hero-anim]',
        {
          y: 56,
          autoAlpha: 0,
          duration: 1.3,
          ease: 'power3.out',
          stagger: 0.14,
          immediateRender: true,
          clearProps: 'all',
        },
        '-=0.85'
      );

    // Unified "open screen" reveal engine for [data-reveal] + [data-parallax]
    revealTriggers.current = initReveals();
    parallaxTriggers.current = initParallax();

    return () => {
      document.removeEventListener('click', onRippleClick);
      lenis.destroy();
      lenisRef.current = null;
      killTriggers(revealTriggers.current);
      killTriggers(parallaxTriggers.current);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Play the hero entrance dive when the preloader starts revealing
  useEffect(() => {
    if (!introDone) return;
    lenisRef.current?.start();
    if (prefersReducedMotion()) {
      if (heroIntro.current) heroIntro.current.progress(1);
      return;
    }
    if (heroIntro.current) heroIntro.current.play();
  }, [introDone]);

  // Lock page scroll while the intro curtain is up
  useEffect(() => {
    const reduced = prefersReducedMotion();
    document.documentElement.classList.toggle('intro-lock', !introDone && !reduced);
    return () => {
      document.documentElement.classList.remove('intro-lock');
    };
  }, [introDone]);

  const handleNavigateSection = (section: string) => {
    if (section === 'team') {
      setTeamOpen(true);
    } else if (section === 'advisors') {
      document.getElementById('advisors-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'services') {
      document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'loans') {
      document.getElementById('loans-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'featured') {
      document.getElementById('featured-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'interiors') {
      document.getElementById('interiors-showcase')?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'contact') {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white text-stone-900 font-sans overflow-x-clip selection:bg-emerald-500 selection:text-white">
      {/* --- PAGE ENTER PRELOADER: brand wordmark + split curtain reveal --- */}
      <Preloader onReveal={() => setIntroDone(true)} />

      {/* --- HERO SECTION --- */}
      <section id="hero-section" className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pb-8 bg-stone-900">
        {/* Background Image Container with Masterpiece Architecture */}
        <div className="hero-bg-clip absolute inset-0 z-0 overflow-hidden">
          <img
            id="hero-bg-img"
            src="/src/assets/images/ecodream_hero_house_1785606186489.jpg"
            alt="EcoDream Luxury Sustainable Architecture"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center will-change-transform"
          />

          {/* Aurora background field */}
          <div className="aurora absolute inset-0 z-1 opacity-60 mix-blend-screen pointer-events-none" />

          {/* Floating gradient orbs */}
          <div className="orb absolute top-[15%] right-[8%] w-104 h-104 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none z-1" />
          <div className="orb orb-delay absolute bottom-[12%] left-[6%] w-88 h-88 bg-amber-300/15 rounded-full blur-3xl pointer-events-none z-1" />

          {/* Floating dust particles */}
          {[
            { left: '12%', top: '30%', w: 5, h: 5, delay: '0s' },
            { left: '28%', top: '62%', w: 3, h: 3, delay: '-2s' },
            { left: '55%', top: '24%', w: 4, h: 4, delay: '-4s' },
            { left: '70%', top: '58%', w: 6, h: 6, delay: '-1.5s' },
            { left: '85%', top: '38%', w: 3, h: 3, delay: '-6s' },
            { left: '40%', top: '80%', w: 4, h: 4, delay: '-7s' },
          ].map((d, i) => (
            <div
              key={i}
              className="dust z-1"
              style={{
                left: d.left,
                top: d.top,
                width: d.w,
                height: d.h,
                animationDelay: d.delay,
              }}
            />
          ))}

          {/* Subtle Gradient Overlays */}
          <div className="absolute inset-0 bg-linear-to-b from-stone-950/80 via-stone-950/30 to-stone-950/90 pointer-events-none z-2" />
          <div className="absolute inset-0 bg-linear-to-r from-stone-950/70 via-transparent to-stone-950/50 pointer-events-none z-2" />
        </div>

        {/* Main Content Layout Wrapper (depth parallax layer) */}
        <div id="hero-content" className="relative z-10 flex flex-col justify-between min-h-screen pb-24 sm:pb-0 will-change-transform">
          {/* Top Navigation (fixed; reserving its own space below) */}
          <div data-hero-anim className="pt-16 sm:pt-20">
            <Navbar
              onOpenContact={() => setContactOpen(true)}
              onNavigateSection={handleNavigateSection}
            />
          </div>

          {/* Upper Hero Grid: Title + Top-Right Glass Card */}
          <main data-hero-anim className="w-full max-w-7xl mx-auto px-4 sm:px-8 my-auto py-4 sm:py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start justify-between">
              {/* Left Col: Main Heading + Lets Explore */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <HeroHeading started={introDone} onExplore={() => setExploreOpen(true)} />
              </div>

              {/* Right Col: Top-Right Glassmorphism Card (3D tilt on hover) */}
              <div className="lg:col-span-5 flex justify-start lg:justify-end">
                <TiltCard maxRotate={5} className="rounded-3xl w-full lg:max-w-xl">
                  <TopRightGlassCard onOpenDetails={() => setExploreOpen(true)} />
                </TiltCard>
              </div>
            </div>
          </main>

          {/* Bottom Hero Controls & Highlights Grid */}
          <footer data-hero-anim className="w-full max-w-7xl mx-auto px-4 sm:px-8 pb-4 sm:pb-8 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end justify-between">
              {/* Bottom Left: Sustainable Materials Box */}
              <div className="md:col-span-5 flex justify-start">
                <TiltCard maxRotate={5} className="rounded-3xl w-full">
                  <SustainableMaterialsCard onOpenMaterials={() => setMaterialsOpen(true)} />
                </TiltCard>
              </div>

              {/* Bottom Center: Team Specialists Cluster */}
              <div className="md:col-span-3 flex justify-start md:justify-center">
                <TiltCard maxRotate={5} className="rounded-3xl">
                  <TeamSpecialistsBadge onOpenTeam={() => setTeamOpen(true)} />
                </TiltCard>
              </div>

              {/* Bottom Right: Value Proposition & Link */}
              <div className="md:col-span-4 flex justify-start md:justify-end">
                <TiltCard maxRotate={5} className="rounded-3xl">
                  <ValuePropBlock onOpenPhilosophy={() => setExploreOpen(true)} />
                </TiltCard>
              </div>
            </div>
          </footer>
        </div>
      </section>

      {/* --- SECTION 1: YOUR TRUSTED REAL ESTATE ADVISORS & STATS --- */}
      <div id="advisors-section" data-reveal="soft">
        <RealEstateAdvisorsSection />
      </div>

      {/* --- SECTION 2: TRUSTED PARTNER LOGOS & QUOTE --- */}
      <div id="partners-section" data-reveal="soft" data-reveal-delay="0.05">
        <TrustedPartnersSection />
      </div>

      {/* --- SECTION 3: EXPERT SERVICES FOR BUYERS, SELLERS & INVESTORS --- */}
      <div id="services-section" data-reveal="soft">
        <ServicesGridSection />
      </div>

      {/* --- SECTION 4: WHY ECODREAM HOME LOANS --- */}
      <div id="loans-section" data-reveal="soft" data-reveal-delay="0.05">
        <HomeLoansSection />
      </div>

      {/* --- SECTION 5: FEATURED ECO RESIDENCES PORTFOLIO --- */}
      <div id="featured-section" className="bg-[#FAF7F2]">
        <FeaturedResidencesSection />
      </div>

      {/* --- SECTION 6: CURATED INTERIORS SHOWCASE --- */}
      <div id="interiors-showcase">
        <InteriorsShowcaseSection />
      </div>

      {/* --- SECTION 7: TESTIMONIALS & RESIDENT STORIES --- */}
      <div id="testimonials-section">
        <TestimonialsSection />
      </div>

      {/* --- SECTION 8: CONTACT FORM & INTERACTIVE MAP --- */}
      <div id="contact-section" data-reveal="soft">
        <ContactAndMapSection />
      </div>

      {/* --- GRAND FOOTER WITH BIG TYPOGRAPHY --- */}
      <GrandFooter />

      {/* Global layers: scroll progress + cursor spotlight */}
      <ScrollProgress />
      <CursorSpotlight />

      {/* Interactive Modals & Drawers */}
      <ExploreModal
        isOpen={exploreOpen}
        onClose={() => setExploreOpen(false)}
        onBookTour={() => setContactOpen(true)}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <MaterialsDrawer
        isOpen={materialsOpen}
        onClose={() => setMaterialsOpen(false)}
      />

      <TeamModal
        isOpen={teamOpen}
        onClose={() => setTeamOpen(false)}
      />
    </div>
  );
}

