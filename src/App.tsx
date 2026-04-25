import React, { useEffect, useRef, useState, useLayoutEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useScroll, useMotionTemplate, useMotionValueEvent } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Check, MousePointer2, ArrowRight, Menu, X, Sun, Moon, Trash2, Plus, Minus, ChevronDown, ChevronLeft, ChevronRight, Clock, CalendarDays, Aperture, Eclipse, Volume2, VolumeX, Mic2, Quote, UtensilsCrossed, ChefHat, IceCream, GlassWater, Leaf, Sprout, ConciergeBell, Video, Image, CloudUpload, User, LogIn, Apple, Info, Grape, Wine, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { Routes, Route, Link, useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Global UI Overlays ---
const NoiseOverlay = () => (
  <svg className="noise-overlay" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

const Button = ({ children, className = '', ...props }: any) => (
  <button
    {...props}
    className={`magnetic-btn px-8 py-4 rounded-full font-sans font-medium flex items-center justify-center gap-2 ${className}`}
  >
    <div className="hover-bg rounded-full"></div>
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  </button>
);

// --- Icons ---
const NoodleEaterIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Head looking up */}
    <path d="M12 21c-3.314 0-6-2.686-6-6 0-.85.176-1.658.494-2.392C7.306 10.686 9.475 9 12 9s4.694 1.686 5.506 3.608c.318.734.494 1.542.494 2.392 0 3.314-2.686 6-6 6z" />
    {/* Open Mouth */}
    <path d="M10 16.5c0 .828.895 1.5 2 1.5s2-.672 2-1.5-.895-1.5-2-1.5-2 .672-2 1.5z" />
    {/* Hand holding noodles above head */}
    <path d="M12 2c.5 1 2 1 2 2.5s-1.5 1.5-1.5 3" stroke="var(--color-accent)" />
    <path d="M11 2c-.5 1-2 1-2 2.5s1.5 1.5 1.5 3" stroke="var(--color-accent)" />
    <path d="M10.5 2.5c-.7 1-1.3 1.5-1.3 2.5s.7 1.5 1.3 2" opacity="0.6" stroke="var(--color-accent)" />
    {/* Fingers */}
    <path d="M9 3l3-1 3 1" />
    <path d="M12 4l-1-2" />
    <path d="M11 4l1-2" />
  </svg>
);

// --- Navbar ---
const Navbar = ({ toggleTheme, isLight, user }: { toggleTheme: () => void, isLight: boolean, user: any }) => {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        toggleClass: {
          targets: navRef.current,
          className: 'scrolled'
        }
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, { x: 0, duration: 0.5, ease: 'power3.out' });
      document.body.style.overflow = 'hidden';
    } else {
      gsap.to(menuRef.current, { x: '100%', duration: 0.5, ease: 'power3.in' });
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full px-6 py-4 w-[90%] max-w-5xl flex items-center justify-between"
      >
        <div className="flex items-center gap-12 flex-1 ml-12">
          <Link to="/" className="font-sans font-bold text-xl tracking-tight text-[var(--color-text-main)] drop-shadow-md hover-lift cursor-pointer flex-shrink-0 z-[60]">
            Banjue Seat
          </Link>
          <div className="hidden md:flex gap-8 font-sans text-sm text-[var(--color-text-muted)] drop-shadow-md whitespace-nowrap">
            <a href="/#sourcing" className="hover:text-[var(--color-text-main)] transition-colors hover-lift">Philosophy</a>
            <Link to="/menu" className="hover:text-[var(--color-text-main)] transition-colors hover-lift">Menu</Link>
          </div>
        </div>
        <div className="flex items-center gap-4 z-[60]">
          <Link 
            to={user ? (user.role === 'ADMIN' ? '/admin' : '/dashboard') : '/login'} 
            className="magnetic-btn text-[var(--color-text-main)] w-10 h-10 flex flex-col justify-center items-center rounded-full bg-[var(--color-bg-overlay)] border border-[var(--color-border-light)] drop-shadow-md hover:border-[var(--color-accent)] transition-colors overflow-hidden group"
          >
            <div className="hover-bg rounded-full"></div>
            <div className="relative z-10 flex items-center justify-center translate-y-1 group-hover:scale-110 transition-transform">
              <NoodleEaterIcon className="w-5 h-5" />
            </div>
          </Link>

          <button onClick={toggleTheme} className="magnetic-btn text-[var(--color-text-main)] w-10 h-10 flex flex-col justify-center items-center rounded-full bg-[var(--color-bg-overlay)] border border-[var(--color-border-light)] drop-shadow-md">
            <div className="hover-bg rounded-full"></div>
            {isLight ? <Eclipse className="w-4 h-4 relative z-10" /> : <Aperture className="w-4 h-4 relative z-10" />}
          </button>
          <Link to="/place-order" className="hidden sm:block">
            <Button className="px-6 py-2 text-sm border border-white/10">
              Place an order
            </Button>
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="magnetic-btn md:hidden text-[var(--color-text-main)] p-2 drop-shadow-md rounded-full">
            <div className="hover-bg"></div>
            <div className="relative z-10">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        ref={menuRef} 
        className="fixed inset-0 bg-[var(--color-bg-dark)] z-40 flex flex-col items-center justify-center translate-x-full md:hidden pt-20"
      >
        <div className="flex flex-col gap-10 text-center">
          <a href="/#sourcing" className="text-5xl font-serif italic text-[var(--color-text-main)]">Philosophy</a>
          <Link to="/menu" className="text-5xl font-serif italic text-[var(--color-text-main)]">Menu</Link>
          <Link to="/place-order" className="mt-8">
            <Button className="text-2xl px-12 py-5">
              Place an order
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

// --- Home Components ---
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-text',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full flex items-end pb-24 px-8 md:px-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)] via-[var(--color-bg-dark)]/60 to-transparent z-10 transition-colors duration-300" />
        <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[var(--color-bg-dark)] to-transparent z-10 transition-colors duration-300 opacity-75" />
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2574&auto=format&fit=crop"
          alt="Atmospheric fine dining"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-105 opacity-100"
        />
      </div>

      <div className="relative z-20 max-w-5xl w-full mx-auto">
        <div className="hero-text overflow-hidden">
          <h1 className="font-sans font-bold text-3xl md:text-5xl lg:text-7xl tracking-tighter text-[var(--color-text-muted)] uppercase mb-2">
            Life's too short for
          </h1>
        </div>
        <div className="hero-text overflow-hidden mb-12">
          <h2 className="font-serif italic text-6xl md:text-8xl lg:text-[10rem] leading-none text-[var(--color-text-main)] lg:-ml-2">
            Bland Food.
          </h2>
        </div>
        <div className="hero-text w-full max-w-lg">
          <Link to="/place-order" className="block w-full sm:w-auto">
            <Button className="w-full border-none">
              Place an order <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// ... Features Components
const DiagnosticShuffler = () => {
  const [items, setItems] = useState(['Spiced Umami', 'Vibrant Citrus', 'Deep Char']);
  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newItems = [...prev];
        const last = newItems.pop()!;
        newItems.unshift(last);
        return newItems;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="feature-card rounded-[2rem] p-8 h-[24rem] relative overflow-hidden flex flex-col group">
      <div className="mb-8 relative z-10">
        <h3 className="font-sans font-bold text-xl uppercase tracking-tighter text-[var(--color-text-main)]">Curated Culinary Art</h3>
        <p className="font-sans text-sm text-[var(--color-text-muted)] mt-2">Unapologetically Bold Flavors</p>
      </div>
      <div className="relative flex-1 w-full mt-10">
        {items.map((item, i) => {
          const isTop = i === 0;
          return (
            <div
              key={item}
              className="absolute left-0 w-full rounded-2xl p-6 border border-[var(--color-border-light)] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                top: `${i * 1.5}rem`,
                transform: `scale(${1 - i * 0.05})`,
                opacity: 1 - i * 0.3,
                zIndex: 10 - i,
                backgroundColor: isTop ? 'var(--color-primary)' : 'var(--color-bg-surface-light)',
                color: isTop ? 'white' : 'var(--color-text-muted)',
              }}
            >
              <div className="font-mono text-sm">{item}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TelemetryTypewriter = () => {
  const [text, setText] = useState('');
  const fullText = "A menu designed to keep you at the table. Let the stories unfold.";
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="feature-card rounded-[2rem] p-8 h-[24rem] flex flex-col">
      <div className="mb-auto">
        <h3 className="font-sans font-bold text-xl uppercase tracking-tighter text-[var(--color-text-main)]">Catalysts for Connection</h3>
        <p className="font-sans text-sm text-[var(--color-text-muted)] mt-2">Designed for Lingering</p>
      </div>
      <div className="bg-[var(--color-bg-dark)] rounded-2xl p-6 border border-[var(--color-border-light)] relative mt-8 h-40">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"></div>
          <div className="font-mono text-[10px] uppercase text-[var(--color-text-muted)]">Live Feed</div>
        </div>
        <div className="font-mono text-sm leading-relaxed text-[var(--color-text-main)]">
          {text}<span className="inline-block w-2.5 h-4 ml-1 bg-[var(--color-accent)] animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};

const CursorProtocolScheduler = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      tl.set('.anim-cursor', { x: 0, y: 0, opacity: 0 })
        .to('.anim-cursor', { opacity: 1, duration: 0.3 })
        .to('.anim-cursor', { x: 180, y: 80, duration: 1, ease: 'power2.inOut' })
        .to('.anim-cursor', { scale: 0.9, duration: 0.1 })
        .to('.day-cell-5', { backgroundColor: 'var(--color-primary)', color: '#fff', borderColor: 'var(--color-primary)', duration: 0.1 }, '<')
        .to('.anim-cursor', { scale: 1, duration: 0.1 })
        .to('.anim-cursor', { x: 140, y: 160, duration: 0.8, ease: 'power2.inOut', delay: 0.5 })
        .to('.anim-cursor', { scale: 0.9, duration: 0.1 })
        .to('.save-btn', { scale: 0.95, duration: 0.1 }, '<')
        .to('.anim-cursor', { scale: 1, duration: 0.1 })
        .to('.save-btn', { scale: 1, duration: 0.1 }, '<')
        .to('.day-cell-5', { backgroundColor: 'transparent', color: 'var(--color-text-muted)', borderColor: 'var(--color-border-light)', duration: 0.4 }, '+=0.5')
        .to('.anim-cursor', { opacity: 0, duration: 0.3 }, '<');
    }, containerRef);
    return () => ctx.revert();
  }, []);
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <div ref={containerRef} className="feature-card rounded-[2rem] p-8 h-[24rem] flex flex-col relative overflow-hidden">
      <div className="mb-auto">
        <h3 className="font-sans font-bold text-xl uppercase tracking-tighter text-[var(--color-text-main)]">The Exclusive Seat</h3>
        <p className="font-sans text-sm text-[var(--color-text-muted)] mt-2">Reserved for the Audacious</p>
      </div>
      <div className="mt-8 relative">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {days.map((d, i) => (
            <div key={i} className={`day-cell-${i} h-10 rounded-xl border border-[var(--color-border-light)] flex items-center justify-center font-mono text-xs text-[var(--color-text-muted)] transition-colors`}>{d}</div>
          ))}
        </div>
        <div className="flex justify-end">
          <button className="magnetic-btn save-btn font-mono text-xs px-6 py-2 rounded-lg bg-[var(--color-bg-overlay)] text-[var(--color-text-main)] border border-[var(--color-border-heavy)] overflow-hidden relative">
            <div className="hover-bg"></div>
            <span className="relative z-10">Order</span>
          </button>
        </div>
        <div className="anim-cursor absolute top-0 left-0 -ml-4 -mt-4 text-[var(--color-text-main)] z-20 pointer-events-none drop-shadow-lg filter drop-shadow-2xl">
          <MousePointer2 className="w-8 h-8 fill-[var(--color-icon-overlay)]" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

const Features = () => (
  <section className="py-24 px-8 md:px-16 w-full max-w-7xl mx-auto z-20 relative">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DiagnosticShuffler />
      <TelemetryTypewriter />
      <CursorProtocolScheduler />
    </div>
  </section>
);

const Philosophy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.philo-img', {
        yPercent: 30, ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
      });
      const lines = gsap.utils.toArray<HTMLElement>('.philo-line');
      lines.forEach((line) => {
        gsap.fromTo(line.querySelector('.philo-inner'),
          { y: '100%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: line, start: 'top 85%' } }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return (
    <section id="philosophy" ref={containerRef} className="relative py-48 px-8 md:px-16 overflow-hidden flex flex-col justify-center min-h-screen">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2574&auto=format&fit=crop"
          alt="Abstract Organic texture"
          referrerPolicy="no-referrer"
          className="philo-img w-full h-[130%] object-cover opacity-40 -top-[15%] brilliant-visibility"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-dark)]/40 via-transparent to-[var(--color-bg-dark)]/40 z-10 transition-colors duration-300" />
      </div>
      <div className="relative z-20 max-w-6xl mx-auto w-full">
        <div className="philo-line overflow-hidden mb-12">
          <div className="philo-inner font-sans font-medium text-xl md:text-3xl text-[var(--color-text-muted)] uppercase tracking-tight">
            Most tables focus on <br/>
            <span className="opacity-50">transient consumption.</span>
          </div>
        </div>
        <div className="philo-line overflow-hidden">
          <div className="philo-inner font-serif italic text-5xl md:text-7xl lg:text-[7rem] leading-[1.1] text-[var(--color-text-main)]">
            We focus on<br/>
            <span className="text-[var(--color-primary)]">vibrant connection.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const StackingArchive = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.stack-card');
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card, start: 'top top', pin: true, pinSpacing: false, id: `pin-${i}`, end: 'max'
        });
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.9, opacity: 0.3, filter: 'blur(10px)', ease: 'none',
            scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top top', scrub: true }
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={containerRef} id="experience" className="relative w-full z-30">
      <div id="sourcing" className="stack-card h-screen w-full bg-[var(--color-bg-surface)] flex items-center justify-center p-8 border-t border-[var(--color-border-light)] origin-top">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl items-center">
          <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center">
            <div className="organic-shape overflow-hidden w-full h-full shadow-[0_0_40px_rgba(194,77,44,0.3)] group relative">
              <img src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=1500&auto=format&fit=crop" alt="Fresh earthy ingredients" referrerPolicy="no-referrer" className="w-full h-full object-cover img-scale-anim opacity-100" />
            </div>
          </div>
          <div>
            <div className="font-mono text-[var(--color-accent)] mb-4">01.</div>
            <h2 className="font-sans font-bold text-4xl md:text-6xl text-[var(--color-text-main)] mb-6 uppercase tracking-tighter">The Sourcing</h2>
            <p className="font-sans text-xl text-[var(--color-text-muted)] font-light leading-relaxed">
              Every ingredient is selected not just for taste, but for its narrative resonance. The deepest flavors and vibrant profiles are cultivated straight from the earth.
            </p>
          </div>
        </div>
      </div>
      <div className="stack-card h-screen w-full bg-[var(--color-bg-surface-light)] flex items-center justify-center p-8 border-t border-[var(--color-border-light)] origin-top" style={{ boxShadow: '0 -20px 50px rgba(0,0,0,0.5)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl items-center">
          <div className="relative w-full aspect-[3/4] max-w-md mx-auto rounded-t-[10rem] border border-[var(--color-border-heavy)] overflow-hidden shadow-2xl group relative">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--color-bg-dark)] to-transparent z-20"></div>
            <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1500&auto=format&fit=crop" alt="Culinary preparation over fire" referrerPolicy="no-referrer" className="w-full h-full object-cover img-scale-anim opacity-100 transition-all duration-1000 relative z-10" />
          </div>
          <div className="lg:-order-1">
            <div className="font-mono text-[var(--color-primary)] mb-4">02.</div>
            <h2 className="font-sans font-bold text-4xl md:text-6xl text-[var(--color-text-main)] mb-6 uppercase tracking-tighter">The Preparation</h2>
            <p className="font-sans text-xl text-[var(--color-text-muted)] font-light leading-relaxed">
              Heat, time, and intuition collide. We craft vibrant culinary profiles designed to awaken the palate and surprise the senses.
            </p>
          </div>
        </div>
      </div>
      <div className="stack-card h-screen w-full bg-[var(--color-bg-dark)] flex items-center justify-center p-8 border-t border-[var(--color-border-light)] origin-top" style={{ boxShadow: '0 -20px 50px rgba(0,0,0,0.5)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl items-center">
          <div className="relative w-full aspect-video max-w-lg mx-auto flex items-center justify-center p-4">
             <div className="relative w-full h-full overflow-hidden rounded-2xl group">
               <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1500&auto=format&fit=crop" alt="Fine dining experience" referrerPolicy="no-referrer" className="w-full h-full object-cover opacity-100 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] img-scale-anim" />
             </div>
          </div>
          <div>
            <div className="font-mono text-[var(--color-text-muted)] mb-4">03.</div>
            <h2 className="font-sans font-bold text-4xl md:text-6xl text-[var(--color-text-main)] mb-6 uppercase tracking-tighter border-b border-[var(--color-border-heavy)] pb-6 inline-block">The Experience</h2>
            <p className="font-sans text-xl text-[var(--color-text-muted)] font-light leading-relaxed">
              Dining as a catalyst for conversation. The table is a stage, and you hold the floor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CheckoutSection = () => (
  <section className="relative py-48 bg-[var(--color-bg-dark)] border-t border-[var(--color-border-light)] z-40 transition-colors">
    <div className="max-w-4xl mx-auto px-8 text-center">
      <h2 className="font-serif italic text-5xl md:text-7xl text-[var(--color-text-main)] mb-8">Ready for the Table?</h2>
      <p className="font-sans text-xl text-[var(--color-text-muted)] mb-12 max-w-2xl mx-auto font-light">
        Banjue Seat is reserved for the audacious. Secure your immersive culinary experience and leave bland behind.
      </p>
      <div className="flex justify-center flex-col sm:flex-row gap-6 items-center">
        <Link to="/place-order" className="block">
          <Button className="w-full sm:w-auto text-lg px-12 py-5 transform scale-110 border-none">
            Place an order 
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

const TestimonialCard = ({ testimonial, onClick }: { testimonial: any, onClick: () => void, key?: any }) => {
  const [isMuted, setIsMuted] = useState(true);
  const isWide = testimonial.type === 'video' || testimonial.type === 'text';
  const width = isWide ? 378 : 270;
  const height = 270;

  return (
    <div 
      onClick={onClick}
      style={{ width, height }}
      className="relative bg-gradient-to-br from-[var(--color-bg-surface)] to-[var(--color-bg-surface-light)] rounded-[1.5rem] border border-[var(--color-border-light)] shadow-xl overflow-hidden group cursor-pointer flex-shrink-0"
    >
      {/* Media Layer */}
      {testimonial.type === 'video' && (
        <div className="absolute inset-0 z-0">
          <video
            src={testimonial.src}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
            className="absolute bottom-4 right-4 z-20 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-black/70 transition-colors"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {testimonial.type === 'image' && (
        <div className="absolute inset-0 z-0">
          <img src={testimonial.src} alt={testimonial.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
        </div>
      )}

      {testimonial.type === 'text' && (
        <div className="absolute top-0 right-0 z-0 opacity-[0.03] select-none pointer-events-none">
          <Quote className="w-32 h-32 -mr-10 -mt-5 stroke-[1]" />
        </div>
      )}

      {/* Content Layer */}
      <div className="relative z-10 h-full p-6 flex flex-col justify-between">
        <div>
          {testimonial.type === 'audio' && (
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/50 flex items-center justify-center mb-4">
              <Mic2 className="w-5 h-5 text-[var(--color-primary)] animate-pulse" />
            </div>
          )}
          {testimonial.type === 'text' && (
             <Quote className="w-8 h-8 text-[var(--color-primary)] mb-4 opacity-50" />
          )}
          <p className={`font-serif italic leading-snug text-[var(--color-text-main)] transition-all duration-500 group-hover:scale-[1.01] ${testimonial.type === 'text' ? 'text-xl md:text-2xl font-bold' : 'text-base md:text-lg'}`}>
            {testimonial.text}
          </p>
        </div>

        <div>
          <div className="font-sans font-bold text-xs text-[var(--color-text-main)] uppercase tracking-widest">{testimonial.name}</div>
          <div className="font-mono text-[8px] text-[var(--color-text-muted)] uppercase mt-0.5 tracking-[0.2em]">{testimonial.title}</div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    { 
      type: 'video', 
      src: "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-in-a-restaurant-kitchen-44675-large.mp4",
      text: "A profound narrative unfolding on the palate. Pure culinary poetry.", 
      name: "Eleanor Vance", 
      title: "Gastronomy Critic" 
    },
    { 
      type: 'text', 
      text: "THE PERFECT ANTIDOTE TO MUNDANE DINING.", 
      name: "Julian Thorne", 
      title: "Curator" 
    },
    { 
      type: 'image', 
      src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2574&auto=format&fit=crop",
      text: "Architecture meets gastronomy.", 
      name: "Sophia Raine", 
      title: "Aesthete" 
    },
    { 
      type: 'audio', 
      text: "A symphony of senses.", 
      name: "Marcus Aurelius", 
      title: "Ethicist" 
    },
    { 
      type: 'video', 
      src: "https://assets.mixkit.co/videos/preview/mixkit-pouring-red-wine-into-a-glass-14562-large.mp4",
      text: "Vibrant connection in every glass.", 
      name: "Isabella Moon", 
      title: "Sommelier" 
    }
  ];

  const [isPaused, setIsPaused] = useState(false);
  const [expandedItem, setExpandedItem] = useState<any>(null);

  // Triple the items for a seamless infinite scroll across all screen sizes
  const tickerItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="relative pb-48 pt-24 bg-[var(--color-bg-dark)] z-40 overflow-hidden transition-colors">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--color-accent)] mb-4">Feedback Protocol</div>
        <h2 className="font-sans font-bold text-4xl uppercase tracking-tighter text-[var(--color-text-main)]">Voices of the Audacious</h2>
      </div>

      <div className="relative w-full">
        {/* Edge Fade Gradients */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[var(--color-bg-dark)] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[var(--color-bg-dark)] to-transparent z-20 pointer-events-none" />

        <div 
          className="flex overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div 
            className="flex gap-8 px-4"
            animate={{ x: isPaused ? undefined : ["0%", "-33.33%"] }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {tickerItems.map((t, i) => (
              <TestimonialCard 
                key={i}
                testimonial={t} 
                onClick={() => setExpandedItem(t)}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Full-Screen Modal */}
      <AnimatePresence>
        {expandedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-[var(--color-bg-dark)] flex items-center justify-center p-8 md:p-24"
          >
            <button 
              onClick={() => setExpandedItem(null)}
              className="absolute top-10 right-10 z-[1100] w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full max-w-6xl flex flex-col md:flex-row gap-12 items-center">
               <div className="w-full md:w-1/2 aspect-video md:aspect-square rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                 {expandedItem.type === 'video' ? (
                    <video src={expandedItem.src} autoPlay loop controls className="w-full h-full object-cover" />
                 ) : expandedItem.type === 'image' ? (
                    <img src={expandedItem.src} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                 ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--color-bg-surface)] to-[var(--color-bg-surface-light)] flex items-center justify-center">
                       {expandedItem.type === 'audio' ? <Mic2 className="w-32 h-32 text-[var(--color-primary)] animate-pulse" /> : <Quote className="w-32 h-32 text-white/5" />}
                    </div>
                 )}
               </div>
               <div className="flex-1">
                  <Quote className="w-16 h-16 text-[var(--color-primary)] mb-8" />
                  <p className="font-serif italic text-3xl md:text-6xl text-white leading-tight mb-12 font-bold">
                    {expandedItem.text}
                  </p>
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-2xl text-white uppercase tracking-widest">{expandedItem.name}</span>
                    <span className="font-mono text-sm text-[var(--color-text-muted)] uppercase tracking-widest mt-2">{expandedItem.title}</span>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[var(--color-bg-surface)] py-12 px-8 md:px-16 rounded-t-[4rem] relative z-40 transition-colors">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div className="col-span-1 md:col-span-2">
        <div className="font-sans font-bold text-2xl tracking-tighter text-[var(--color-text-main)] mb-2">Banjue Seat</div>
        <div className="font-serif italic text-[var(--color-text-muted)] text-xl">Life is too short for bland food.</div>
      </div>
      <div>
        <div className="font-mono text-xs text-secondary-dimmed mb-6 uppercase">Navigation</div>
        <ul className="space-y-3 font-sans text-sm text-[var(--color-text-muted)]">
          <li><a href="/#sourcing" className="hover:text-[var(--color-text-main)] transition-colors">Philosophy</a></li>
          <li><Link to="/menu" className="hover:text-[var(--color-text-main)] transition-colors">Menu</Link></li>
          <li><Link to="/place-order" className="hover:text-[var(--color-text-main)] transition-colors">Reserve</Link></li>
        </ul>
      </div>
      <div>
        <div className="font-mono text-xs text-secondary-dimmed mb-6 uppercase">Legal</div>
        <ul className="space-y-3 font-sans text-sm text-[var(--color-text-muted)]">
          <li><a href="#" className="hover:text-[var(--color-text-main)] transition-colors">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-[var(--color-text-main)] transition-colors">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pt-8 border-t border-[var(--color-border-light)] flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="font-mono text-xs text-[var(--color-text-dimmed)]">© 2026 Banjue Seat. All rights reserved.</div>
    </div>
  </footer>
);

// --- Pages ---
const Home = () => (
  <>
    <Hero />
    <Features />
    <Philosophy />
    <div className="relative z-30 bg-[var(--color-bg-dark)] transition-colors">
      <StackingArchive />
    </div>
    <CheckoutSection />
    <Testimonials />
  </>
);

const initialMenuItems = {
  "Appetizers": [
    { name: "Hearth-Smoked Diver Scallops", desc: "White oak smoked, parsnip purée, crispy pancetta dust, brown butter emulsion.", price: "₦18,500", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_gfVvlV81QUDoNhvtfr1qVQSWSo_V3p8swSa2-1Tl30JJFeqXKAwhE2JgJyob1woQ8legf8-5oW9l47LOovsof5pjxMqysq_ofWnqssB9_RQN9hA4dO3pLoYtGH6-11P0GPA1DrNGL5ZyKIxyKIb4YUIx0y2Gxd8nqpRwrxabtg0b21KSuYbsmcwRKTRXDhfC-3yRLJ5CIlHeIIh7_qbzypGUMdtrLx1HNLB6npThrYBEw6ULUgPPGfu_GBV9BoZJjrquWiV_e02C", featured: true, pairings: ["Vintage 2012 Reserva", "Artesian Spring Water", "A5 Wagyu Beef Tartare"] },
    { name: "A5 Wagyu Beef Tartare", desc: "Kagoshima A5, cured quail yolk, black truffle shavings, rice crackers.", price: "₦28,000", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdYsDU58Cjkisps8pRFv6xZc61sj2nZb8WHqZQI71L5LKLsbj3kO3yp3Xwok36tEwcLe75lXCzXcZkqP1KyLyZJhX9DIi7j-16ZhSRVXnF8LnF70kggh8KtK2FdnKs91A-IlqezAhRKrMch-rYRaf2Tu4YgIiCEXUCSIUgxKPEe73BKISxKSqWEqT4hpILifsXNl9SiZ9ImSP4rEEQPhHtAM9E6CvOQkIvy_JfJPqi-AQJtFhLRRhoa0IG3s6mcP1G_I0OUcH-c8iB", featured: true, pairings: ["Vintage 2012 Reserva", "Charred Bone Marrow"] },
    { name: "Charred Bone Marrow", desc: "Canoe-cut marrow, parsley-caper salad, charred artisanal sourdough.", price: "₦15,000", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvQOpUQBLI53ldWXpONaWRK_EN2gatogSeF-bod36g0YtZZphY8unB5fqgffFu9zbjpsWHHwNpjlIjNmrVxmYfoYduMde6e2t1P3A_xdq6Mxcn6ujBZ_MRhGF1MWVW_D4qiUYQhPv_hm2-XjroR_9dhmcjVVR3rCbi_JMJOKBIQCFHG0iKFURizbdLTm91S6nFLeWuh2TuBzrbV5u4hAYa1K5D56NrXqkrAKSdM8plTMS1pNq5COt3ZEUNciZvRLcUYXnKKViYobw-" },
    { name: "Hokkaido Scallop Crudo", desc: "Yuzu kosho, finger lime, white soy, shiso oil.", price: "₦28,000", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdeMLYtcuc9rSsIVWc5lZMS38JK15zot3bXuTECEu6whjV6meMvUWJW3PyJGDTZHDUgSqgeyseDBR1n_1zrDmtIlPNnnbBkMmXjIzMKvCGmKSjwt5OcM1nyjdbuK4EpzkBCudoazSgzc1YMJQGzFyAn_3wspBH_LxZpwX64IqBNtzbq2QPF66Y56cPriQ0AFqUsApeCUbq9Hznn-11damLKAGXyy-1Cd-2rCV5vDOjISI9RsDqeR-dRvSJeZsF1nkiMo_R0-3IAXbo" },
    { name: "White Asparagus Velouté", desc: "Perigord truffle, hazelnut crumble, chervil.", price: "₦24,000", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAm5skZ35PTy0N7xbmmEKaazxFXkzIMtcpUczeTT-JMotE-zYLcIMnxh9Fi8nb3-xsT1xMuSjl4tI9bi8SSA-wjJ7W3x2YhPuYWXxaaz7rT9ymjOTS9fuKr1EBiyMwnNl47EWMi9W_v4M5xvsBzt1MXbCoaURla8dwipjR7TL-NYu9T8FoogTNHIA1SL8YAQQcwfvnMfofRBJ4cYW4Or_Pp6KbEy9_ghUXaJ0nj-z6_uiYWnxABtwQbVpL2rMu2ap08r5y97_6_tjhh" },
    { name: "Osetra Caviar Service", desc: "Traditional accoutrements, warm blinis. (Supplement)", price: "₦95,000", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_RYyrUmNtlOi-MkF9LJW4p95S0G_9wCiKzfWjOoKX7NtpX29qm9PKC08wtBWo6VytwyfBDAcHZf56wLBMyiBHPyDTJa9OoC8aXLcxvmAzMiSLZeZ1NztY58oZu3bOx8eiQ6g6TkTO61ECCClf3_VHlZIXS-zv5QkA0sG8jwTJW2YiC9w408ZowTG38XWlM_4lw-jU_IHjacUy7GbAMtU-6qYgkduzPXKtihMy5N62DDF-z61A7PYhCe3-bym0Y22p3mtShbitkENd" },
    { name: "Foie Gras Terrine", desc: "Sauternes jelly, toasted brioche, poached pear.", price: "₦42,000", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=1000&auto=format&fit=crop" },
    { name: "Crispy Octopus", desc: "Chorizo jam, saffron aioli, fingerling potatoes.", price: "₦21,500", image: "https://images.unsplash.com/photo-1599321955323-d04025f399c1?q=80&w=1000&auto=format&fit=crop" }
  ],
  "Main Courses": [
    { name: "Miso-Glazed Black Cod", desc: "Dashi broth, baby bok choy, pickled hon shimeji mushrooms.", price: "₦15,000", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_b5lcJPB7eHp4__y2XiicKaM-zoh94dRQXXg__-q3urU8TKDXGexoGf1YUIgTMCdQr8ij4lnRTVavC3hcvIr06h37W0SbEhhDt7cx3aQTCS0LuSpjD7KWR6-MyzE1Z2HhijAzkuthL_5wbwF-lRB1A7x9iBn0AH5TspAxZcH4fQIRnYK6sCDyIyo_o3qWXolyI81_ROYdbhNj08VICKGhajz7IxZaqUi0TeqN2rf1WgRR-H0b6i_aLqAvp9sIely5vxoE2i1NwywD", featured: true },
    { name: "A5 Wagyu Ribeye", desc: "Black garlic butter, smoked maitake, potato pave. (Supplement)", price: "₦85,000", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIEsZ2g9ByrdDOaeaZK3cNdqVi3WSPhlKc8CtO7Lc5MzykxfDrSUn123Sf-SDaTVhJXf-dol2hvTCRUOamTS1PJP4soEnOtLOF7bhZrTFIv4zdMr0AaU5ZJzZJ5SgK4d8f1dxb2U4PEbSy6vFkqXCaYzTDrrDRWxH75kqQ5nZtvF_WMjFxA3xLCr1Uuqvz3KH9b7jhTYX4wX1H8vG108sacPg-fm4R6fcdUHnPnwwj2y_vscSiek5VVLmez2mN3YRxSDYqkijNm3sp", featured: true },
    { name: "Pan-Roasted Duck Breast", desc: "Sour cherry gastrique, parsnip purée, braised endive.", price: "₦35,000", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6Qcm6GjMyLTx1AA-MSVjGzKDOdxtmlWvzqDRZsezwEBAu5TaKUpnAcl4TvC1erZq5EMze5vJFO_VGJLn-ObFdarjMvpEweeohH5XetTVPL7CLcUHeuReiNNuyqjdUcqUfnvk8tivHTQwj3NimpZ5MgUAEIh9eT7UOLm64vsgkun6RjxGYVdOqgN3za6SXdEEffcFscU56qpecAJ0U5WWHAxPj-vazGDgTkiEQeQMYXqR7XaBqjJ2l63F2EeANrRZVkqxZV7CfvR94" },
    { name: "Herb-Crusted Lamb Rack", desc: "Mint salsa verde, charred eggplant, lamb jus.", price: "₦25,000", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHUyPx_iDfUe99VOZPyUNCHvG9HyHsFCWoBRbn7MfxsBY4XvDqsZSaoPA6QzbBp2zV-rSrIcnKccpnQ-8Gr-8NXVIVTCLnJgteZJqENwPteS5DQmMf3YTz0o6CtzEBOsziDvmT1gtVsK15cHPfSUc4nEBfk56N1IRVwr2K6NDGNfA_ZxLd60nRbHFCPQUVPnzQ1kZ7b6rL4S9ZG7Ksx4K5X6d3hffE_-MYJhNnpsTfAcwwE3JyXTBK0K8wnJJ_BIZYr0nr6XNCmNyF" },
    { name: "Lobster Thermidor", desc: "Cognac cream, mustard, gruyere, buttered leeks.", price: "₦58,000", image: "https://images.unsplash.com/photo-1559742811-822873691df8?q=80&w=1000&auto=format&fit=crop" },
    { name: "Butter-Poached Sole", desc: "Lemon beurre blanc, capers, wilted spinach.", price: "₦34,500", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000&auto=format&fit=crop" },
    { name: "Truffle Roast Chicken", desc: "Organic chicken, black truffle, pommes purée.", price: "₦28,000", image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=1000&auto=format&fit=crop" },
    { name: "Beef Wellington", desc: "Prime fillet, mushroom duxelles, prosciutto, pastry shroud.", price: "₦65,000", image: "https://images.unsplash.com/photo-1588168333946-b6ef9336d392?q=80&w=1000&auto=format&fit=crop" }
  ],
  "Desserts": [
    { name: "Dark Chocolate Nemesis", desc: "70% Valrhona, smoked sea salt, tonka bean ice cream.", price: "₦12,500", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZaWj1eDQLdT0vjxA60R484bfLYrmN-wi1OoOhNqMTlCP8u5-2jGrk4WY_r3zfwXEsgwHq9P1NlGFYnasSt20HIFGRC4RWoA4in5QEOTkeyRNLGqOPoWipg6VKiIJQ8h8kznyoGcxCJWlUTSOIZ08J8xS7TpQOxpCbxLPG3kVEgRyIyrDzeoes3QHrTlcu3KORf_vqvKKEpu_VwE8AuiJVbjNwzaS7AH4XW_uhtywZ1mVHzzAk1HsbuFimoCtjP_k9ZgdSd4Dzn8JA", featured: true },
    { name: "Madagascar Vanilla Soufflé", desc: "Grand Marnier anglaise, prepared tableside.", price: "₦18,000", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrG_BaPdOCN1EyIaMKDHSdXtfcxupcf5X6IJzlvTJ1X-yTeMiY1grBM7xLi_qVxrc4tWQOPBc2NG8hUdUVNtnhWxxkZhXr6qHoVnhBn5dBAT5ChUqr4IRTHlc1zH25cGjgWmCNezJqpJk6BvvjywVqNp5W2k73bCzAVA6Q-zCvVSVvdP4gRUQOjfn48-Qv1gqj6FSzW4Sts50qTvZCAt1jcqAG0YHTjDcStKQv1NGRMDveK3izk1gnhISjws9TA2x-c2xPKGgTS7fQ" },
    { name: "Yuzu & Basil Tart", desc: "Toasted meringue, basil coulis, sable breton.", price: "₦14,000", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVRqDKSM1PQmWwHccqd3jsYIyiuzueqJLggL2IIZk8JmhW0gs8V7DpAUbD2OObVB-QVuy4nsJ_Ahpyi6FK2DGbGWiIeitnUIvpJ0CYqiUChIbpe6BB0TfY9B4eCO6zOJ0qYmAz_cDyXKSQ1j8yF5iezWHCQdpKDj3d8esyojkkh0xW6Lu4TU3_Ajiugj4zfBLvAI7wG1i-qfinbaY_ZYcNbdENuODwEdhYOqOlaqiaI1igFp6hukgEQgIGqEY5vtt6ut1r9XhynGXM" },
    { name: "Earl Grey Panna Cotta", desc: "Blackberry compote, honeycomb tuile.", price: "₦12,000", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOunUjCnMrYASV5abUEJcUSiJEZMvwmoTljEp0ZWtAb3remLmEhzZOubcBDHiBh533MqlO7YHPdcceRpPqyvKZ6ZRnED5jnAYHwiybSX4yQnm4w941wZcsTcfzxBtr7xAfur-TUlPaNyhYeaNnUJktzNFLTUH1K4OsX0ujnCsLfPRNdrl2LYZrjAWYwwNMMdmRXnXgwzSdRllYd_GJMXn3HLZdYFdjHI5ug6CyFnGiU7Dgl4J5EZz4Ww-tJF4WxEDhn6Ourp1mxHyZ" },
    { name: "Matcha Lava Cake", desc: "Liquid ceremonial matcha heart, pistachio dust.", price: "₦16,000", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=1000&auto=format&fit=crop" },
    { name: "Honey & Thyme Parfait", desc: "Wildflowers, fermented honey, shortbread base.", price: "₦14,000", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1000&auto=format&fit=crop" },
    { name: "Deconstructed Tiramisu", desc: "Espresso gelée, mascarpone mousse, cocoa soil.", price: "₦15,500", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop" },
    { name: "Seasonal Galette", desc: "Stone fruit, almond frangipane, vanilla bean glaze.", price: "₦13,000", image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=1000&auto=format&fit=crop" }
  ],
  "Beverages": [
    { name: "Vintage 2012 Reserva", desc: "Deep red, notes of oak and dark berries.", price: "₦120,000", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop", featured: true },
    { name: "Artesian Spring Water", desc: "Oxygenated, perfectly balanced pH.", price: "₦5,000", image: "https://images.unsplash.com/photo-1559839914-17aae19ceafl?q=80&w=1000&auto=format&fit=crop" },
    { name: "Smoked Ember Old Fashioned", desc: "Bourbon, house bitters, cedar smoke.", price: "₦12,500", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop" },
    { name: "Yuzu Sparkling Mule", desc: "Yuzu, ginger beer, mint infusion.", price: "₦9,000", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000&auto=format&fit=crop" },
    { name: "Cold Brew Martini", desc: "Single origin espresso, vodka, vanilla bean.", price: "₦11,500", image: "https://images.unsplash.com/photo-1545438102-793ca8354530?q=80&w=1000&auto=format&fit=crop" },
    { name: "Blackberry Sage Soda", desc: "House-made syrup, botanical bubbles.", price: "₦7,500", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1000&auto=format&fit=crop" },
    { name: "Chrysanthemum Tea", desc: "Wild honey, goji berries, delicate floral notes.", price: "₦6,000", image: "https://images.unsplash.com/photo-1594631252845-29fc4586d52c?q=80&w=1000&auto=format&fit=crop" },
    { name: "Single Malt 18y", desc: "Peat smoke, caramel, sea salt finish.", price: "₦45,000", image: "https://images.unsplash.com/photo-1527281405159-4b08511a3ffd?q=80&w=1000&auto=format&fit=crop" }
  ],
  "Vegetarian": [
    { name: "Burrata & Black Fig", desc: "Apulian burrata, fire-roasted black figs, aged balsamic caviar, basil oil.", price: "₦12,800", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx6pVictrlMMYiiXZfUcPr1i1iyxPLqKwPZ8Bmpnx95hgHXpWV4NbX3YkoJClSPvNQO0-aoK972xkpz_KkSnGbCi7ED8SuMGAStoxUnVqtj538doietLSdSVCHnZdtcKn_ycYVwvqO8Yuf_atsO8CptqPKbyrddr6q1LgniohTkTp_fXYjZ5a-CDckNdT_e4hkYBAFg4w_0G0Hd2_wxll_8QMfmXi8j4T8BTGmDaE7igPVStqpm2PwpXzSuUJCaA6AurmOod2nPgEi", featured: true },
    { name: "Wild Mushroom Risotto", desc: "Carnaroli rice, porcini dust, aged parmesan crisp.", price: "₦22,000", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXC5L8zpA8D1HeQ2H5k80a298xtJNapuMMlDalgwO-siLbFFsD57_V7ZxM0I2plh-048HYs692OwJcOXhXoJGUDbddPYuml0cKmO9jawMHVgdfGvfkTkKY9ddNWhyXlA-U34ksIDeLo2tpSRRiTeDjOBc6fOyX2meGdy4N1Y-p3mw06UyIS0ePgmVI7m_sdp3K6krXrLtjwDDMDS1zQ_DLke1GAEcPSmm15mcW8fnME3aGwmEhT1dOZh0u0aizQwxWecaWU9jbkyaQ" },
    { name: "Heirloom Tomato Tart", desc: "Whipped ricotta, aged balsamic, micro basil, puff pastry.", price: "₦22,000", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNsFKweYtDKzmGHQ7qia4Uqcg4bdl9uwMX1ND9H_yhr22LlH4Y6IFkIIJaEP1S98Up3niyenrz2xJ8cEcCsgWrsONET9yNzvIoGpTq7cRgb3Q3GKFlkNchwycAfdNkrhcbk4ewcgcQdKrjmRNEWP7WIcxAMVnIFBh2X__0GwteyDShPobh4v09zn4kJgz2Q0glE9eLYdr7b7N8-D5g1zeb_uzVVqgGIRgWnIcNtyH0Pau2wt5prUIiYu43DOhkrP7lJSTzYkhslgO6" },
    { name: "Truffle Gnocchi", desc: "Potato pillows, black truffle cream, fried sage.", price: "₦26,500", image: "https://images.unsplash.com/photo-1551183053-bf91e1d81141?q=80&w=1000&auto=format&fit=crop" },
    { name: "Roasted Cauliflower State", desc: "Tahini dressing, pomegranate, toasted pine nuts.", price: "₦14,500", image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=1000&auto=format&fit=crop" },
    { name: "Asparagus & Goat Cheese", desc: "Charred stalks, whipped chèvre, lemon zest.", price: "₦16,000", image: "https://images.unsplash.com/photo-1515942400420-2b98fed1f515?q=80&w=1000&auto=format&fit=crop" }
  ],
  "Vegan": [
    { name: "Roasted Root Salad", desc: "Maple glazed carrots, parsnips, walnut crumble.", price: "₦11,500", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop", featured: true },
    { name: "King Oyster Mushroom 'Steak'", desc: "Chimichurri, parsnip mousse, charred onion.", price: "₦24,000", image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=1000&auto=format&fit=crop", featured: true },
    { name: "Butternut Squash Velouté", desc: "Coconut milk froth, toasted pumpkin seeds.", price: "₦13,000", image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?q=80&w=1000&auto=format&fit=crop" },
    { name: "Zucchini Noodles", desc: "Pesto Genovese, nutritional yeast, sun-dried tomatoes.", price: "₦14,000", image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1000&auto=format&fit=crop" },
    { name: "Crispy Tofu Bao", desc: "Pickled cucumber, hoisin, scallions.", price: "₦12,500", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1000&auto=format&fit=crop" },
    { name: "Avocado Lime Mousse", desc: "Raw cocoa crust, fresh berries.", price: "₦10,500", image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1000&auto=format&fit=crop" }
  ],
  "Signature Sides": [
    { name: "Black Garlic Pommes Purée", desc: "Smooth potato, fermented garlic, cultured butter.", price: "₦8,500", image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=1000&auto=format&fit=crop" },
    { name: "Charred Broccolini", desc: "Chili flakes, lemon oil, toasted garlic.", price: "₦7,000", image: "https://images.unsplash.com/photo-1543083477-4f7db70bd912?q=80&w=1000&auto=format&fit=crop" },
    { name: "Truffle Fries", desc: "Hand-cut, parmesan dust, black truffle salt.", price: "₦9,500", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1000&auto=format&fit=crop" },
    { name: "Honey Glazed Carrots", desc: "Wild thyme, sea salt, balsamic reduction.", price: "₦6,500", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1000&auto=format&fit=crop" },
    { name: "Wilted Spinach", desc: "Nutmeg, cream reduction, crispy shallots.", price: "₦7,500", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop" },
    { name: "Parmesan Asparagus", desc: "Grilled stalks, shaved 24-month aged parmesan.", price: "₦8,000", image: "https://images.unsplash.com/photo-1550241891-b3f5240989d3?q=80&w=1000&auto=format&fit=crop" }
  ]
};


const TiltCard = ({ children, isFocused }: { children: React.ReactNode, isFocused: boolean }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFocused) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = (mouseXPos / width) - 0.5;
    const yPct = (mouseYPos / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        perspective: 1000,
        rotateX: isFocused ? rotateX : 0,
        rotateY: isFocused ? rotateY : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full relative preserve-3d h-full flex items-center justify-center p-4"
    >
      {children}
    </motion.div>
  );
};

const TrackedMenuItem = ({ item, idx, containerRef, vh }: any) => {
  const { scrollY } = useScroll({ container: containerRef });
  
  const delta = useTransform(scrollY, (y) => {
    // Focus position naturally occurs when scroll is at idx * 0.62 * vh
    const focusY = idx * 0.62 * vh;
    return (focusY - y) / (0.62 * vh);
  });

  const scale = useTransform(delta, [-1, 0, 1, 2, 3, 4, 5], [0.5, 1.8, 1.0, 0.9, 0.8, 0.7, 0.5]);
  const opacity = useTransform(delta, [-1, -0.5, 0, 0.5, 1, 4, 4.5, 5], [0, 0, 1, 1, 0.2, 0.2, 0, 0]);
  
  // Mapped continuous positions relative to absolute center
  const yTranslate = useTransform(delta, (d) => {
    if (d <= -1) return `-40vh`;
    if (d <= 0) return `${d * 40}vh`; // slides gracefully from -40vh to 0.
    if (d <= 1) return `${d * 22}vh`; // slides gracefully from 0 to 22vh down.
    if (d <= 2) return `calc(22vh + ${(d - 1) * 6}px)`; // Deck gap 1
    if (d <= 3) return `calc(22vh + 6px + ${(d - 2) * 6}px)`; // Deck gap 2
    if (d <= 4) return `calc(22vh + 12px + ${(d - 3) * 6}px)`; // Deck gap 3
    return `100vh`;
  });

  const blurValue = useTransform(delta, [-1, 0, 1, 4, 5], [0, 25, 5, 5, 0]);
  const backdropFilter = useMotionTemplate`blur(${blurValue}px)`;
  const pointerEvents = useTransform(delta, (d) => Math.abs(d) < 0.5 ? 'auto' : 'none');
  
  const [isFocused, setIsFocused] = useState(false);
  const isTargetFocused = useTransform(delta, (d) => Math.abs(d) < 0.5);
  
  useEffect(() => {
    return isTargetFocused.onChange((v) => setIsFocused(v));
  }, [isTargetFocused]);

  return (
    <motion.div 
      style={{ scale, opacity, y: yTranslate, pointerEvents, zIndex: 100 - idx }}
      className="absolute inset-0 flex items-center justify-center will-change-transform"
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <TiltCard isFocused={isFocused}>
          <motion.div 
            style={{ backdropFilter, WebkitBackdropFilter: backdropFilter }}
            className={`group flex items-center gap-4 p-4 rounded-3xl border transition-all duration-700 text-left relative overflow-hidden w-full ${
              isFocused 
                ? 'bg-white/10 dark:bg-black/20 border-white/30 shadow-[0_60px_120px_rgba(0,0,0,0.8)]' 
                : 'bg-white/5 dark:bg-white/5 border-white/10 shadow-none'
            }`}
          >
            <div className={`w-14 h-14 rounded-full overflow-hidden shrink-0 border transition-colors ${isFocused ? 'border-[var(--color-accent)] shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.4)]' : 'border-white/10'}`}>
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>

            <div className="flex-grow min-w-0">
               <div className="flex justify-between items-baseline mb-0.5">
                 <h3 className={`font-serif transition-colors truncate ${isFocused ? 'text-[var(--color-accent)] font-bold text-xl italic drop-shadow-lg' : 'text-white/60 text-base'}`}>
                   {item.name}
                 </h3>
                 <p className={`font-mono transition-all font-bold ${isFocused ? 'text-[var(--color-primary)] text-xl' : 'text-white/20 text-base'} ml-2 whitespace-nowrap`}>
                   {item.price}
                 </p>
               </div>
               <p className={`font-sans transition-colors uppercase tracking-widest ${isFocused ? 'text-white/80 text-[8px]' : 'text-white/20 text-[10px]'} truncate`}>
                 {item.desc}
               </p>
            </div>

            {isFocused && (
              <Link to="/place-order" className="shrink-0 animate-in fade-in zoom-in duration-700 pl-2 pr-1">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-transform">
                   <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            )}
          </motion.div>
        </TiltCard>
      </div>
    </motion.div>
  );
};

const MenuPage = ({ cart, updateCart, cartCount, menuData }: { cart: Record<string, number>, updateCart: (n: string, d: number) => void, cartCount: number, menuData: any }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const flattenedItems = Object.entries(menuData).flatMap(([category, items]: [string, any]) => 
    items.map((item: any) => ({ ...item, category }))
  );

  const categories = ["All", ...Object.keys(menuData)];

  const filteredItems = flattenedItems.filter(item => {
    const matchesSearch = searchQuery 
      ? (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
         item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Appetizers": return <UtensilsCrossed className="w-4 h-4" />;
      case "Main Courses": return <ChefHat className="w-4 h-4" />;
      case "Desserts": return <IceCream className="w-4 h-4" />;
      case "Beverages": return <GlassWater className="w-4 h-4" />;
      case "Vegetarian": return <Leaf className="w-4 h-4" />;
      case "Vegan": return <Sprout className="w-4 h-4" />;
      case "Signature Sides": return <ConciergeBell className="w-4 h-4" />;
      default: return <Plus className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-[var(--color-bg-dark)] min-h-screen pt-28 pb-48 md:pb-40 px-4 sm:px-6 lg:px-8 relative overflow-x-hidden">
       {/* Ambient Background Effects */}
       <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-[var(--color-primary)]/10 blur-[120px] mix-blend-screen opacity-50"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--color-accent)]/10 blur-[100px] mix-blend-screen opacity-30"></div>
       </div>

       <div className="max-w-7xl mx-auto w-full relative z-10">
          
          {/* Editorial Header Section */}
          <div className="mb-12 text-center md:text-left max-w-3xl mx-auto md:mx-0">
            <h1 className="font-serif text-4xl md:text-6xl text-[var(--color-text-main)] tracking-tight mb-4 leading-tight font-bold">
                Taste the <br className="hidden md:block"/><span className="italic text-transparent bg-clip-text bg-[linear-gradient(135deg,var(--color-primary),var(--color-accent))]">Extraordinary</span>
            </h1>
            <p className="font-sans text-[var(--color-text-muted)] text-lg md:text-xl max-w-2xl leading-relaxed opacity-80">
                A masterpiece of culinary engineering. Every element is selected with extreme intent to provide a symphony of flavors for your palate.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 sticky top-24 z-40">
            {/* Quick Access Pills */}
            <div className="hidden lg:flex flex-wrap items-center gap-3 w-full md:w-auto">
               <span className="font-sans uppercase tracking-[0.2em] text-[10px] text-[var(--color-text-dimmed)] font-bold mr-2">Quick Navigation:</span>
               {["All", "Appetizers", "Main Courses", "Desserts"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full font-sans text-[10px] uppercase tracking-widest font-bold transition-all duration-300 border ${
                    activeCategory === cat
                      ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-[0_10px_20px_rgba(194,77,44,0.3)] hover:border-[var(--color-accent)]"
                      : "bg-[var(--color-bg-surface-light)]/40 backdrop-blur-md border-[var(--color-border-heavy)] text-[var(--color-text-dimmed)] hover:text-white hover:border-[var(--color-accent)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="bg-[var(--color-bg-surface-light)]/40 backdrop-blur-[10px] rounded-full flex items-center px-4 py-3 shadow-[0px_20px_40px_rgba(0,0,0,0.4)] border border-[var(--color-border-heavy)] w-full md:w-80 lg:w-96 transition-all hover:border-[var(--color-accent)] focus-within:border-[var(--color-accent)] focus-within:ring-1 focus-within:ring-[var(--color-accent)]/50 group">
                    <Search className="text-[var(--color-primary)] mr-3 group-focus-within:text-[var(--color-accent)] w-5 h-5 transition-colors" />
                    <input 
                      className="bg-transparent border-none text-[var(--color-text-main)] w-full font-sans placeholder-[var(--color-text-muted)] opacity-50 focus:opacity-100 text-sm outline-none focus:ring-0" 
                      placeholder="Search culinary offerings..." 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <button 
                  onClick={() => setIsFilterOpen(true)}
                  className="bg-[var(--color-bg-surface-light)]/40 backdrop-blur-[10px] text-[var(--color-text-main)] border border-[var(--color-border-heavy)] px-6 py-3 rounded-full font-sans text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-[var(--color-primary)] hover:border-[var(--color-accent)] hover:text-white transition-all group"
                >
                   <Menu className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                   Categories
                </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 auto-rows-fr">
            {filteredItems.map(item => {
              const quantity = cart[item.name] || 0;
              return (
                <article key={item.name} className="flex flex-row overflow-hidden relative group transition-all duration-500 h-full border-l-[3px] border-[var(--color-primary)]/20 hover:border-[var(--color-accent)] hover:bg-white/[0.02] py-0">
                    <Link to={`/product/${encodeURIComponent(item.name)}`} className="w-1/3 min-w-[130px] bg-[#0a0a0a] overflow-hidden relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" referrerPolicy="no-referrer" />
                    </Link>
                    <div className="p-6 flex flex-col flex-grow justify-between">
                        <Link to={`/product/${encodeURIComponent(item.name)}`}>
                            <h3 className="font-serif text-[var(--color-primary)] text-xl mb-2 leading-tight group-hover:text-[var(--color-accent)] transition-colors">
                               {item.name}
                            </h3>
                            <p className="font-sans text-[var(--color-text-dimmed)] text-xs line-clamp-2 opacity-80 leading-relaxed italic">{item.desc}</p>
                        </Link>
                        <div className="mt-6 flex justify-between items-center">
                            <span className="font-mono font-bold text-[var(--color-text-main)] tracking-tighter text-lg">{item.price}</span>
                            
                            <div className="flex items-center">
                               {quantity > 0 ? (
                                 <div className="flex items-center bg-[var(--color-bg-overlay)] border border-[var(--color-border-light)] rounded-full p-1 animate-in zoom-in duration-300 shadow-lg">
                                    <button 
                                      onClick={() => updateCart(item.name, -1)}
                                      className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-text-dimmed)] hover:text-white hover:bg-white/10 transition-all"
                                    >
                                       <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-3 font-mono font-bold text-sm text-[var(--color-accent)] min-w-[32px] text-center">{quantity}</span>
                                    <button 
                                      onClick={() => updateCart(item.name, 1)}
                                      className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-primary)] hover:text-white hover:bg-[var(--color-primary)] transition-all"
                                    >
                                       <Plus className="w-4 h-4" />
                                    </button>
                                 </div>
                               ) : (
                                 <button 
                                   onClick={() => updateCart(item.name, 1)}
                                   className="w-10 h-10 rounded-full bg-[var(--color-bg-overlay)] flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all border border-[var(--color-border-light)] hover:border-[var(--color-primary)] shadow-md"
                                 >
                                    <Plus className="w-5 h-5" />
                                 </button>
                               )}
                            </div>
                        </div>
                    </div>
                </article>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
             <div className="py-32 text-center bg-[var(--color-bg-surface-light)]/20 rounded-[3rem] border border-dashed border-[var(--color-border-light)]">
                <h3 className="font-serif text-3xl text-[var(--color-text-muted)] italic mb-6">No pairings match your refined search.</h3>
                <button onClick={() => {setSearchQuery(""); setActiveCategory("All");}} className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-full font-sans uppercase tracking-[0.2em] text-[10px] font-bold hover:scale-105 transition-transform">Reset Your Sequence</button>
             </div>
          )}

       </div>

       {/* Floating Order Bar */}
       <AnimatePresence>
         {cartCount > 0 && (
           <motion.div 
             initial={{ y: 100, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             exit={{ y: 100, opacity: 0 }}
             className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-2xl"
           >
              <div className="bg-[var(--color-bg-surface)] backdrop-blur-3xl border border-[var(--color-accent)]/30 rounded-[2.5rem] p-4 pr-6 flex items-center justify-between shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
                  <div className="flex items-center gap-6 pl-4">
                      <div className="relative">
                         <div className="w-14 h-14 rounded-2xl bg-[linear-gradient(135deg,var(--color-primary),var(--color-accent))] flex items-center justify-center text-white shadow-lg">
                            <UtensilsCrossed className="w-6 h-6" />
                         </div>
                         <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-black font-mono text-[11px] font-bold flex items-center justify-center border-2 border-[var(--color-accent)] animate-bounce">
                           {cartCount}
                         </span>
                      </div>
                      <div>
                         <h4 className="font-serif text-lg text-[var(--color-text-main)] italic">Culinary Sequence Started</h4>
                         <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-dimmed)] font-bold">Experience defined</p>
                      </div>
                  </div>
                  
                  <Link to="/place-order" className="bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white hover:text-black px-10 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-[0.25em] transition-all flex items-center gap-4 shadow-xl group">
                     Proceed to Table
                     <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
              </div>
           </motion.div>
         )}
       </AnimatePresence>

       {/* Slide-Over Filter Panel */}
       <AnimatePresence>
         {isFilterOpen && (
           <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilterOpen(false)}
                className="fixed inset-0 bg-black/70 backdrop-blur-md z-[110]"
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 h-full w-full max-w-sm bg-[var(--color-bg-surface)] shadow-[-30px_0_90px_rgba(0,0,0,0.9)] z-[111] border-l border-[var(--color-border-heavy)] flex flex-col"
              >
                  <div className="p-4 border-b border-[var(--color-border-light)] flex justify-between items-center bg-black/40 backdrop-blur-2xl">
                     <div>
                        <h2 className="font-serif text-3xl text-[var(--color-text-main)] italic">Refine Sequence</h2>
                        <p className="font-sans uppercase tracking-[0.2em] text-[8px] text-[var(--color-text-dimmed)] font-bold mt-1">Symphony selection</p>
                     </div>
                     <button 
                       onClick={() => setIsFilterOpen(false)}
                       className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[var(--color-text-dimmed)] hover:bg-white/10 hover:text-white transition-all shadow-inner"
                     >
                        <X className="w-6 h-6" />
                     </button>
                  </div>

                  <div className="flex-1 overflow-y-auto beautiful-scrollbar p-3">
                      <div className="flex flex-col gap-1.5">
                        {categories.map((cat) => (
                           <button
                             key={cat}
                             onClick={() => {
                               setActiveCategory(cat);
                               setIsFilterOpen(false);
                             }}
                             className={`group flex items-center justify-between p-2.5 rounded-2xl transition-all duration-300 ${
                               activeCategory === cat
                                 ? "bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/40 text-[var(--color-primary)] shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
                                 : "bg-transparent border border-transparent text-[var(--color-text-dimmed)] hover:bg-white/5 hover:border-[var(--color-border-light)]"
                             }`}
                           >
                              <div className="flex items-center gap-5">
                                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 transform ${activeCategory === cat ? 'bg-[var(--color-primary)] text-white rotate-12' : 'bg-white/5 group-hover:bg-white/10 text-[var(--color-text-dimmed)]'}`}>
                                    {getCategoryIcon(cat)}
                                 </div>
                                 <span className={`font-sans uppercase tracking-[0.2em] text-xs font-bold ${activeCategory === cat ? 'text-[var(--color-primary)]' : 'group-hover:text-white'}`}>{cat}</span>
                              </div>
                              {activeCategory === cat && <div className="w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center"><Check className="w-3.5 h-3.5 text-white" /></div>}
                           </button>
                        ))}
                      </div>
                  </div>

                  <div className="p-4 bg-black/50 backdrop-blur-2xl border-t border-[var(--color-border-light)]">
                      <button 
                        onClick={() => {setActiveCategory("All"); setIsFilterOpen(false); setSearchQuery("");}}
                        className="w-full py-2.5 text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[var(--color-text-dimmed)] hover:text-[var(--color-primary)] transition-all flex items-center justify-center gap-4 border border-dashed border-[var(--color-border-light)] rounded-2xl hover:border-[var(--color-primary)]/40 group"
                      >
                         <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" /> Clear All Selection
                      </button>
                  </div>
              </motion.div>
           </>
         )}
       </AnimatePresence>
    </div>
  );
};

// --- Dashboard & Admin Components ---

const UserDashboard = ({ userProfile, setUserProfile }: { userProfile: any, setUserProfile: any }) => {

  const [testimonialType, setTestimonialType] = useState<string | null>(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => setPreview(reader.result as string);
          reader.readAsDataURL(file);
      }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
      {isEditProfileOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsEditProfileOpen(false)}></div>
              <div className="bg-[var(--color-bg-surface)] p-8 rounded-3xl border border-[var(--color-border-light)] w-full max-w-sm relative z-10 shadow-2xl">
                  <h3 className="text-xl font-serif mb-6 text-[var(--color-text-main)]">Edit Profile</h3>
                  <div className="space-y-4">
                      <input className="w-full bg-black/40 border border-[var(--color-border-light)] rounded-xl p-3 text-sm text-[var(--color-text-main)] outline-none" placeholder="Name" defaultValue="Alex Thorne" />
                      <input className="w-full bg-black/40 border border-[var(--color-border-light)] rounded-xl p-3 text-sm text-[var(--color-text-main)] outline-none" placeholder="Email" defaultValue="alex@example.com" />
                      <input type="password" className="w-full bg-black/40 border border-[var(--color-border-light)] rounded-xl p-3 text-sm text-[var(--color-text-main)] outline-none" placeholder="New Password" />
                      <Button className="w-full border-none">Save Changes</Button>
                  </div>
              </div>
          </div>
      )}
      <div className="flex flex-col md:flex-row gap-12 mb-20">
        <div className="md:w-1/3 text-center md:text-left">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[var(--color-primary)] mx-auto md:mx-0 mb-6 shadow-2xl relative group cursor-pointer" onClick={() => setIsEditProfileOpen(true)}>
            <img src="https://i.pravatar.cc/150?u=user" alt="User Profile" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest transition-opacity">Edit</div>
          </div>
          <h2 className="font-serif text-3xl text-[var(--color-text-main)] mb-1">{userProfile.name}</h2>
          <p className="font-sans text-xs uppercase tracking-widest text-[var(--color-text-dimmed)]">Epicurean Member</p>
          <Link to="/menu">
            <Button className="mt-8 w-full border-none text-[10px] uppercase tracking-widest">Place an Order</Button>
          </Link>
        </div>

        <div className="md:w-2/3">
          <h3 className="font-serif text-2xl text-[var(--color-text-main)] mb-8 italic">Order History</h3>
          <div className="space-y-4">
            {userProfile.orders.length > 0 ? userProfile.orders.map((order: any) => (
              <div key={order.id} className="bg-[var(--color-bg-surface-light)]/20 border border-[var(--color-border-light)] p-6 rounded-2xl flex justify-between items-center group hover:border-[var(--color-accent)]/30 transition-all">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[10px] text-[var(--color-accent)]">{order.id}</span>
                    <span className="font-sans text-[10px] text-[var(--color-text-dimmed)] uppercase tracking-widest">{order.date}</span>
                  </div>
                  <p className="font-sans text-sm text-[var(--color-text-main)]">{order.items.join(', ')}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-lg text-[var(--color-text-main)] mb-1">{order.total}</p>
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[8px] uppercase font-bold tracking-widest">{order.status || 'Completed'}</span>
                </div>
              </div>
            )) : (
              <p className="text-sm text-[var(--color-text-dimmed)] italic">No orders found.</p>
            )}
          </div>

          <div className="mt-12">
            <h3 className="font-serif text-2xl text-[var(--color-text-main)] mb-8 italic">Saved Custom Pairings</h3>
            <div className="space-y-4">
                {userProfile.pairings && userProfile.pairings.length > 0 ? userProfile.pairings.map((pairingRecord: any) => (
                  <div key={pairingRecord.id} className="bg-[var(--color-bg-surface-light)]/20 border border-[var(--color-border-light)] p-6 rounded-2xl flex flex-col group hover:border-[var(--color-primary)]/40 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="font-serif text-lg text-[var(--color-text-main)]">{pairingRecord.dishName}</span>
                    </div>
                    <div className="pl-4 border-l border-white/10 space-y-2">
                        {pairingRecord.pairings.map((p: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"></span>
                              <span className="font-mono text-xs text-white/80">{p}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-[var(--color-text-dimmed)] italic">No custom pairings saved.</p>
                )}
            </div>
          </div>

          <div className="mt-12 bg-[var(--color-bg-surface)] p-8 rounded-[2rem] border border-[var(--color-border-light)]">
            <h4 className="font-serif text-xl text-[var(--color-primary)] mb-6">Leave a Reflection</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { type: 'text', icon: <Quote className="w-5 h-5" />, label: 'Text' },
                { type: 'image', icon: <Image className="w-5 h-5" />, label: 'Image' },
                { type: 'video', icon: <Video className="w-5 h-5" />, label: 'Video' },
                { type: 'audio', icon: <Mic2 className="w-5 h-5" />, label: 'Audio' }
              ].map(item => (
                <button 
                  key={item.type}
                  onClick={() => { setTestimonialType(item.type); setPreview(null); }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${testimonialType === item.type ? 'bg-[var(--color-primary)]/20 border-[var(--color-primary)] text-[var(--color-text-main)]' : 'bg-black/20 border-transparent text-[var(--color-text-dimmed)] hover:border-[var(--color-border-light)]'}`}
                >
                  {item.icon}
                  <span className="text-[10px] uppercase tracking-widest font-bold">{item.label}</span>
                </button>
              ))}
            </div>
            {testimonialType && (
              <div className="animate-in fade-in duration-500">
                {testimonialType === 'text' && (
                  <textarea 
                    className="w-full bg-black/40 border border-[var(--color-border-light)] rounded-xl p-4 text-sm text-[var(--color-text-main)] outline-none focus:border-[var(--color-accent)] h-32 mb-4"
                    placeholder="Speak your mind through text..."
                  />
                )}
                {(testimonialType === 'image' || testimonialType === 'video' || testimonialType === 'audio') && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                      <label className="flex flex-col items-center gap-2 p-6 rounded-xl bg-black/40 border border-white/10 hover:border-[var(--color-accent)] cursor-pointer">
                        <CloudUpload className="w-8 h-8 text-[var(--color-accent)]" />
                        <span className="text-xs uppercase font-bold">Upload</span>
                        <input type="file" className="hidden" onChange={handleFileChange} accept={testimonialType === 'image' ? 'image/*' : testimonialType === 'video' ? 'video/*' : 'audio/*'} />
                      </label>
                      <button className="flex flex-col items-center gap-2 p-6 rounded-xl bg-black/40 border border-white/10 hover:border-[var(--color-accent)]">
                        {testimonialType === 'image' && <Aperture className="w-8 h-8 text-[var(--color-accent)]" />}
                        {testimonialType === 'video' && <Video className="w-8 h-8 text-[var(--color-accent)]" />}
                        {testimonialType === 'audio' && <Mic2 className="w-8 h-8 text-[var(--color-accent)]" />}
                        <span className="text-xs uppercase font-bold">{testimonialType === 'audio' ? 'Record' : 'Capture'}</span>
                      </button>
                  </div>
                )}
                {preview && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-white/10">
                    {testimonialType === 'image' && <img src={preview} alt="Preview" className="w-full h-48 object-cover" />}
                    {testimonialType === 'video' && <video src={preview} controls className="w-full h-48 object-cover" />}
                    {testimonialType === 'audio' && <div className="p-4 bg-black/60 text-xs font-mono">Audio file ready: {preview.slice(0, 20)}...</div>}
                  </div>
                )}
                <Button className="w-full text-xs uppercase tracking-widest bg-[var(--color-accent)] text-black border-none hover:bg-white">Post Personal Reflection</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pt-20 border-t border-[var(--color-border-light)]">
        <h3 className="font-serif text-2xl text-[var(--color-text-main)] mb-10 text-center">Speculative Pairings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { name: "Roasted Root Salad", price: "₦11,500", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop" },
            { name: "Burrata & Black Fig", price: "₦12,800", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCx6pVictrlMMYiiXZfUcPr1i1iyxPLqKwPZ8Bmpnx95hgHXpWV4NbX3YkoJClSPvNQO0-aoK972xkpz_KkSnGbCi7ED8SuMGAStoxUnVqtj538doietLSdSVCHnZdtcKn_ycYVwvqO8Yuf_atsO8CptqPKbyrddr6q1LgniohTkTp_fXYjZ5a-CDckNdT_e4hkYBAFg4w_0G0Hd2_wxll_8QMfmXi8j4T8BTGmDaE7igPVStqpm2PwpXzSuUJCaA6AurmOod2nPgEi" },
            { name: "Dark Chocolate Nemesis", price: "₦12,500", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZaWj1eDQLdT0vjxA60R484bfLYrmN-wi1OoOhNqMTlCP8u5-2jGrk4WY_r3zfwXEsgwHq9P1NlGFYnasSt20HIFGRC4RWoA4in5QEOTkeyRNLGqOPoWipg6VKiIJQ8h8kznyoGcxCJWlUTSOIZ08J8xS7TpQOxpCbxLPG3kVEgRyIyrDzeoes3QHrTlcu3KORf_vqvKKEpu_VwE8AuiJVbjNwzaS7AH4XW_uhtywZ1mVHzzAk1HsbuFimoCtjP_k9ZgdSd4Dzn8JA" }
          ].map(p => (
            <div key={p.name} className="group relative rounded-2xl overflow-hidden aspect-[4/3] feature-card">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-6">
                <p className="font-serif text-lg text-white mb-1">{p.name}</p>
                <Link to="/menu" className="font-sans text-[10px] text-[var(--color-accent)] uppercase tracking-widest font-bold flex items-center gap-2">Explore <ArrowRight className="w-3 h-3" /></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getDefaultPairings = (dishName: string, dishCategory: string, menuData: any) => {
    const allDishes = Object.values(menuData).flat() as any[];
    const foodItems = allDishes.filter(d => !d.category?.toLowerCase().includes('drink') && !d.category?.toLowerCase().includes('beverage') && d.name !== dishName);
    const beverages = allDishes.filter(d => d.category?.toLowerCase().includes('drink') || d.category?.toLowerCase().includes('beverage'));
    
    let seed = dishName.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    const seededRandom = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    const shuffledFood = [...foodItems].sort((a, b) => {
        const aMatch = a.category === dishCategory ? 2 : 0;
        const bMatch = b.category === dishCategory ? 2 : 0;
        return (bMatch + seededRandom()) - (aMatch + seededRandom());
    });
    const shuffledBev = [...beverages].sort(() => 0.5 - seededRandom());
    
    const suggestions = [...shuffledFood.slice(0, 3), ...shuffledBev.slice(0, 1)];
    
    if (suggestions.length < 4) {
        const extra = allDishes.filter(d => d.name !== dishName && !suggestions.find(s => s.name === d.name));
        suggestions.push(...extra.slice(0, 4 - suggestions.length));
    }
    
    return suggestions.map(s => s.name);
};

const AdminCMS = ({ menuData, setMenuData }: { menuData: any, setMenuData: any }) => {
  const [selectedDish, setSelectedDish] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAdminPairingModal, setShowAdminPairingModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', desc: '', price: '', image: '', images: [] as string[], category: '', pairings: [] as string[] });
  const [activeTab, setActiveTab] = useState<'menu' | 'users' | 'orders' | 'comments' | 'notifications'>('menu');

  const allDishNames = Object.values(menuData).flat().map((d: any) => d.name);

  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
     const fetchAdminData = async () => {
         try {
             const { collection, getDocs, orderBy, query } = await import('firebase/firestore');
             const { db } = await import('./firebase');
             const uSnap = await getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc')));
             const oSnap = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')));
             setUsers(uSnap.docs.map(d => ({id: d.id, ...d.data()})));
             setOrders(oSnap.docs.map(d => ({id: d.id, ...d.data()})));
         } catch (e) {
             console.error('Cant fetch admin data', e);
         }
     };
     fetchAdminData();
  }, []);

  const startEdit = (dish: any, category: string) => {
    setSelectedDish({ ...dish, oldName: dish.name, category });
    const initialPairings = dish.pairings !== undefined ? dish.pairings : getDefaultPairings(dish.name, category, menuData);
    setEditForm({ ...dish, category, pairings: initialPairings, images: dish.images || (dish.image ? [dish.image] : []) });
    setIsModalOpen(true);
  };

  const startCreate = () => {
    setSelectedDish(null);
    setEditForm({ name: '', desc: '', price: '', image: '', images: [], category: Object.keys(menuData)[0] || 'Appetizers', pairings: [] });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newData = { ...menuData };
    const savedImage = editForm.images.length > 0 ? editForm.images[0] : editForm.image;
    
    if (selectedDish) {
      const catItems = [...newData[editForm.category]];
      const idx = catItems.findIndex(i => i.name === selectedDish.oldName);
      if (idx > -1) {
        catItems[idx] = { 
          name: editForm.name,
          desc: editForm.desc, 
          price: editForm.price, 
          image: savedImage,
          images: editForm.images,
          pairings: editForm.pairings
        };
        newData[editForm.category] = catItems;
      }
    } else {
      if (!newData[editForm.category]) newData[editForm.category] = [];
      newData[editForm.category].push({ 
          name: editForm.name, 
          desc: editForm.desc, 
          price: editForm.price, 
          image: savedImage,
          images: editForm.images,
          pairings: editForm.pairings
      });
    }

    setMenuData(newData);
    setIsModalOpen(false);
  };

  const handleDelete = (name: string, category: string) => {
    const newData = { ...menuData };
    newData[category] = newData[category].filter((i: any) => i.name !== name);
    setMenuData(newData);
  };

  const renderContent = () => {
    if (activeTab === 'menu') {
      return (
        <div className="w-full">
          <div className="flex justify-between items-center mb-12">
            <h2 className="font-serif text-3xl text-[var(--color-text-main)] italic tracking-tight">Menu Options (CMS)</h2>
            <div className="flex gap-4">
               <Button onClick={startCreate} className="border-none bg-[var(--color-primary)] text-white text-[10px] uppercase">Create Item</Button>
            </div>
          </div>
          
          <div className="space-y-12">
            {Object.entries(menuData).map(([category, items]: [string, any]) => (
              <div key={category}>
                <h3 className="font-sans text-xs uppercase tracking-[0.4em] text-[var(--color-accent)] mb-6 font-bold">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item: any) => (
                    <div 
                      key={item.name} 
                      className="bg-[var(--color-bg-surface-light)]/10 border border-[var(--color-border-light)] p-4 rounded-xl flex gap-4 items-center group cursor-pointer hover:border-[var(--color-primary)] transition-all"
                      onClick={() => startEdit(item, category)}
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-sm text-[var(--color-text-main)] truncate">{item.name}</p>
                        <p className="font-mono text-[10px] text-[var(--color-accent)]">{item.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={(e) => { e.stopPropagation(); handleDelete(item.name, category); }} className="p-2 text-red-500/50 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'users') {
      return (
        <div className="w-full">
          <h2 className="font-serif text-3xl text-[var(--color-text-main)] mb-8 italic tracking-tight">Users</h2>
          <div className="space-y-4 max-h-[700px] overflow-y-auto pr-4 custom-scrollbar">
             {users.length === 0 ? <p className="text-[var(--color-text-dimmed)] text-xs font-mono">No users found.</p> : users.map(u => (
                <div key={u.id} className="bg-[var(--color-bg-surface-light)]/10 border border-[var(--color-border-light)] p-4 rounded-xl">
                  <p className="font-sans font-bold text-[var(--color-text-main)]">{u.firstName} {u.lastName}</p>
                  <p className="font-mono text-[10px] text-[var(--color-primary)]">{u.email}</p>
                  <p className="font-mono text-[9px] text-[var(--color-text-dimmed)] mt-2">ID: {u.id}</p>
                </div>
             ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'orders') {
      return (
        <div className="w-full">
          <h2 className="font-serif text-3xl text-[var(--color-text-main)] mb-8 italic tracking-tight">Orders</h2>
          <div className="space-y-4 max-h-[700px] overflow-y-auto pr-4 custom-scrollbar">
             {orders.length === 0 ? <p className="text-[var(--color-text-dimmed)] text-xs font-mono">No active orders.</p> : orders.map(o => (
                <div key={o.id} className="bg-[var(--color-bg-surface-light)]/10 border border-[var(--color-border-light)] p-4 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                     <p className="font-mono text-[10px] text-[var(--color-primary)] uppercase">Order {o.id}</p>
                     <p className="font-mono text-lg font-bold text-[var(--color-text-main)]">{o.total}</p>
                  </div>
                  <p className="font-sans text-[11px] text-[var(--color-text-main)] opacity-70 mb-2 leading-relaxed">{o.items?.join(', ')}</p>
                  <div className="flex justify-between items-center mt-4">
                     <span className="px-2 py-1 bg-green-500/20 text-green-500 text-[8px] uppercase tracking-widest rounded-full">{o.status}</span>
                     <span className="font-mono text-[9px] text-[var(--color-text-dimmed)]">{new Date(o.createdAt).toLocaleString()}</span>
                  </div>
                </div>
             ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'comments') {
      return (
        <div className="w-full">
          <h2 className="font-serif text-3xl text-[var(--color-text-main)] mb-8 italic tracking-tight">Comments & Feedback</h2>
          <p className="text-[var(--color-text-dimmed)] text-xs font-mono">No feedback available.</p>
        </div>
      );
    }

    if (activeTab === 'notifications') {
      return (
        <div className="w-full">
          <h2 className="font-serif text-3xl text-[var(--color-text-main)] mb-8 italic tracking-tight">System Notifications</h2>
          <p className="text-[var(--color-text-dimmed)] text-xs font-mono">All systems nominal. No new alerts.</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] pt-32 pb-32 px-4 md:px-8 relative flex flex-row items-start">
      <div className="flex-1 max-w-6xl mx-auto pr-8 md:pr-20">
         {renderContent()}
      </div>

      {/* Right side navigation that "peeks" in */}
      <aside className="w-16 sticky top-1/2 -translate-y-1/2 ml-auto">
        <div className="w-16 hover:w-64 bg-[var(--color-bg-surface)] border-l border-y border-[var(--color-border-heavy)] transition-all duration-300 z-[60] group overflow-hidden rounded-l-[2.5rem] shadow-[-20px_0_40px_rgba(0,0,0,0.5)] h-fit max-h-[70vh] py-12 absolute right-0 top-1/2 -translate-y-1/2">
           <div className="w-64 flex flex-col p-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-dimmed)] mb-6 px-4">Navigation</h3>
              <button 
                onClick={() => { setActiveTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                className={`text-left px-4 py-4 rounded-xl text-sm transition-all focus:outline-none ${activeTab === 'menu' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold' : 'text-[var(--color-text-main)] hover:bg-white/5'}`}
              >
                Menu Options
              </button>
              <button 
                onClick={() => { setActiveTab('users'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                className={`text-left px-4 py-4 rounded-xl text-sm transition-all focus:outline-none ${activeTab === 'users' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold' : 'text-[var(--color-text-main)] hover:bg-white/5'}`}
              >
                Users
              </button>
              <button 
                onClick={() => { setActiveTab('orders'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                className={`text-left px-4 py-4 rounded-xl text-sm transition-all focus:outline-none ${activeTab === 'orders' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold' : 'text-[var(--color-text-main)] hover:bg-white/5'}`}
              >
                Orders
              </button>
              <button 
                onClick={() => { setActiveTab('comments'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                className={`text-left px-4 py-4 rounded-xl text-sm transition-all focus:outline-none ${activeTab === 'comments' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold' : 'text-[var(--color-text-main)] hover:bg-white/5'}`}
              >
                Comments
              </button>
              <button 
                onClick={() => { setActiveTab('notifications'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                className={`text-left px-4 py-4 rounded-xl text-sm transition-all focus:outline-none ${activeTab === 'notifications' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold' : 'text-[var(--color-text-main)] hover:bg-white/5'}`}
              >
                Notifications
              </button>
           </div>
           {/* Peek indicators */}
           <div className="absolute inset-y-0 left-0 w-16 flex flex-col items-center justify-center gap-8 group-hover:opacity-0 transition-opacity">
              <div className={`w-1.5 h-1.5 rounded-full ${activeTab === 'menu' ? 'bg-[var(--color-primary)]' : 'bg-white/20'}`}></div>
              <div className={`w-1.5 h-1.5 rounded-full ${activeTab === 'users' ? 'bg-[var(--color-primary)]' : 'bg-white/20'}`}></div>
              <div className={`w-1.5 h-1.5 rounded-full ${activeTab === 'orders' ? 'bg-[var(--color-primary)]' : 'bg-white/20'}`}></div>
              <div className={`w-1.5 h-1.5 rounded-full ${activeTab === 'comments' ? 'bg-[var(--color-primary)]' : 'bg-white/20'}`}></div>
              <div className={`w-1.5 h-1.5 rounded-full ${activeTab === 'notifications' ? 'bg-[var(--color-primary)]' : 'bg-white/20'}`}></div>
              <ChevronLeft className="w-4 h-4 mt-4 text-[var(--color-text-dimmed)] animate-pulse" />
           </div>
        </div>
      </aside>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
               initial={{ y: 20, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.95 }}
               className="bg-[var(--color-bg-surface)] p-8 rounded-[2rem] border border-[var(--color-border-heavy)] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
               onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-serif text-2xl text-[var(--color-text-main)] mb-8 italic">{selectedDish ? 'Edit Menu Item' : 'Create Menu Item'}</h3>
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] uppercase text-[var(--color-text-dimmed)] tracking-widest">Name</label>
                  <input 
                    value={selectedDish ? selectedDish.name : editForm.name} 
                    onChange={(e) => { if (!selectedDish) setEditForm({...editForm, name: e.target.value}); }} 
                    className={`bg-black/40 border border-[var(--color-border-light)] rounded-xl p-4 text-xs text-[var(--color-text-main)] focus:border-[var(--color-accent)] outline-none ${selectedDish ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    placeholder="Dish Name" 
                    readOnly={!!selectedDish}
                  />
                  {selectedDish && <p className="text-[8px] text-[var(--color-accent)] font-mono pl-2">Name cannot be modified for existing items.</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] uppercase text-[var(--color-text-dimmed)] tracking-widest">Description</label>
                  <textarea value={editForm.desc} onChange={(e) => setEditForm({...editForm, desc: e.target.value})} className="bg-black/40 border border-[var(--color-border-light)] rounded-xl p-4 text-xs text-[var(--color-text-main)] focus:border-[var(--color-accent)] outline-none h-24" placeholder="Brief epicurean description" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[9px] uppercase text-[var(--color-text-dimmed)] tracking-widest">Price</label>
                    <input value={editForm.price} onChange={(e) => setEditForm({...editForm, price: e.target.value})} className="bg-black/40 border border-[var(--color-border-light)] rounded-xl p-4 text-[13px] text-[var(--color-text-main)] focus:border-[var(--color-accent)] outline-none h-[52px] w-full" placeholder="₦..." />
                  </div>
                  <div className="flex flex-col gap-2 relative z-50">
                    <label className="font-mono text-[9px] uppercase text-[var(--color-text-dimmed)] tracking-widest">Category</label>
                    <CustomSelect 
                      value={editForm.category} 
                      onChange={(val: string) => setEditForm({...editForm, category: val})} 
                      options={[{ label: '', items: Object.keys(menuData).map(c => ({ label: c, value: c })) }]}
                      placeholder="Category"
                      variant="dense"
                      triggerClassName="bg-black/40 border border-[var(--color-border-light)] rounded-xl p-4 text-[13px] text-[var(--color-text-main)] outline-none hover:border-[var(--color-accent)] w-full flex justify-between items-center cursor-pointer transition-all h-[52px]"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] uppercase text-[var(--color-text-dimmed)] tracking-widest pl-2">Images (Upload or Paste Link)</label>
                  <div className="space-y-2">
                      {editForm.images.map((img, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                           <input value={img} onChange={(e) => {
                              const newImages = [...editForm.images];
                              newImages[idx] = e.target.value;
                              setEditForm({...editForm, images: newImages});
                           }} className="bg-black/40 border border-[var(--color-border-light)] rounded-xl p-4 text-xs text-[var(--color-text-main)] focus:border-[var(--color-accent)] outline-none flex-1" placeholder="Image URL" />
                           <button onClick={() => {
                              const newImages = [...editForm.images];
                              newImages.splice(idx, 1);
                              setEditForm({...editForm, images: newImages});
                           }} className="text-red-500/50 hover:text-red-500 p-2"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                         <button onClick={() => setEditForm({...editForm, images: [...editForm.images, '']})} className="flex-1 bg-black/40 border border-[var(--color-border-light)] rounded-xl p-3 text-[10px] text-[var(--color-text-main)] hover:border-[var(--color-accent)] transition-all uppercase tracking-widest flex items-center justify-center gap-2"><Plus className="w-3 h-3" /> Add Link</button>
                         <button onClick={() => alert('Future feature: Local Upload Pipeline to Cautionary Folder')} className="flex-1 bg-black/40 border border-[var(--color-border-light)] rounded-xl p-3 text-[10px] text-[var(--color-text-main)] hover:border-[var(--color-accent)] transition-all uppercase tracking-widest flex items-center justify-center gap-2"><CloudUpload className="w-3 h-3" /> Upload File</button>
                      </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] uppercase text-[var(--color-text-dimmed)] tracking-widest pl-2">Associated Pairings ({(editForm.pairings || []).length})</label>
                  <div className="flex flex-col gap-1 mb-2 border border-[var(--color-border-light)] rounded-xl py-2 px-2 bg-black/20">
                      {(!editForm.pairings || editForm.pairings.length === 0) && <span className="text-[10px] text-white/20 italic p-2">No pairings defined</span>}
                      {(editForm.pairings || []).map(p => (
                          <div key={p} className="bg-[var(--color-bg-surface-light)]/40 border border-[var(--color-border-light)] rounded-xl p-3 text-[13px] flex justify-between items-center group transition-all">
                              <span className="text-[var(--color-text-main)] font-sans">{p}</span>
                              <button 
                                  onClick={() => setEditForm({...editForm, pairings: (editForm.pairings || []).filter(i => i !== p)})}
                                  className="text-[var(--color-text-dimmed)] hover:text-red-500 transition-colors"
                              >
                                  <Trash2 className="w-4 h-4" />
                              </button>
                          </div>
                      ))}
                  </div>
                  <div className="mt-2 w-full">
                    <CustomSelect 
                      value="" 
                      onChange={(val: string) => {
                          const currentPairings = editForm.pairings || [];
                          if (val && !currentPairings.includes(val)) {
                              setEditForm({...editForm, pairings: [...currentPairings, val]});
                          }
                      }}
                      options={[{ label: '', items: (allDishNames || []).filter(n => n !== (selectedDish?.name || editForm.name) && !(editForm.pairings || []).includes(n)).map(n => ({ label: n, value: n })) }]}
                      placeholder="Add Pairing"
                      variant="dense"
                      triggerClassName="bg-[var(--color-bg-surface)] border border-[var(--color-border-light)] rounded-xl p-4 text-[13px] text-[var(--color-text-main)] outline-none hover:border-[var(--color-accent)] w-full flex justify-between items-center cursor-pointer transition-all h-[52px]"
                      icon={<Plus className="w-4 h-4 flex-shrink-0 text-[var(--color-text-dimmed)]" />}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button onClick={handleSave} className="flex-1 border-none bg-[var(--color-primary)] text-white text-[10px] uppercase">
                    {selectedDish ? 'Save Changes' : 'Create Item'}
                  </Button>
                  <button onClick={() => setIsModalOpen(false)} className="flex-1 font-sans text-[10px] uppercase tracking-widest text-[var(--color-text-dimmed)] hover:text-red-500 hover:bg-red-900/30 border border-transparent hover:border-red-900/50 rounded-xl transition-all h-12">Discard</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const LoginPage = ({ onLogin }: { onLogin: (email: string) => void }) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
      const { auth, db } = await import('./firebase');
      const { doc, setDoc, getDoc } = await import('firebase/firestore');

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email || '';
      
      // Just for prototype purposes, let's allow anyone who signs in to see the dashboard.
      // But if they have 'admin' in their email, we make them an admin in the database.
      if (email.includes('admin') || email === 'chomiadeyemi7@gmail.com') {
         await setDoc(doc(db, 'admins', result.user.uid), { isAdmin: true }, { merge: true });
         onLogin('admin@banjue.com'); // trigger local state
      } else {
         // Create the user record
         await setDoc(doc(db, 'users', result.user.uid), {
             firstName: result.user.displayName?.split(' ')[0] || 'Guest',
             lastName: result.user.displayName?.split(' ').slice(1).join(' ') || 'User',
             email: email,
             createdAt: Date.now(),
             userId: result.user.uid
         }, { merge: true });
         
         onLogin(email);
      }
      
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[var(--color-bg-surface)] backdrop-blur-3xl rounded-[2.5rem] border border-[var(--color-border-light)] p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/10 blur-3xl rounded-full -mr-10 -mt-10"></div>
        <div className="mb-10 text-center">
          <h2 className="font-serif text-4xl text-[var(--color-text-main)] mb-3 italic">Enter the Seat</h2>
          <p className="font-sans text-xs uppercase tracking-widest text-[var(--color-text-dimmed)]">Your culinary journey awaits</p>
        </div>

        <div className="space-y-6">
          <Button onClick={handleGoogleLogin} className="w-full border-none bg-[var(--color-primary)] text-white gap-3 shadow-xl">
             <div className="w-4 h-4 text-white transition-opacity">
               <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
             </div>
            Continue with Google <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="mt-10 flex items-center gap-4">
          <div className="flex-1 h-[1px] bg-white/5"></div>
          <span className="font-mono text-[8px] uppercase text-[var(--color-text-dimmed)] tracking-widest">or integrate via</span>
          <div className="flex-1 h-[1px] bg-white/5"></div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <button onClick={() => { onLogin('admin@banjue.com'); }} className="flex flex-col items-center justify-center gap-1 bg-white/5 border border-white/5 rounded-2xl py-3 hover:bg-white/10 transition-all group">
             <span className="font-mono text-[9px] uppercase">Mock Admin</span>
          </button>
          <button onClick={() => { onLogin('customer@banjue.com'); }} className="flex flex-col items-center justify-center gap-1 bg-white/5 border border-white/5 rounded-2xl py-3 hover:bg-white/10 transition-all group">
             <span className="font-mono text-[9px] uppercase">Mock Customer</span>
          </button>
        </div>

        <div className="mt-8 text-center text-[var(--color-text-dimmed)] text-[9px] uppercase tracking-widest italic opacity-40">
          admin@banjue.com | customer@banjue.com
        </div>
      </div>
    </div>
  );
};

const CompanionSelectionModal = ({ 
    isOpen, 
    onClose, 
    menuData, 
    currentDishName, 
    selectedPairings, 
    onSelectPairing, 
    baseImage 
}: { 
    isOpen: boolean, 
    onClose: () => void, 
    menuData: any, 
    currentDishName: string, 
    selectedPairings: string[], 
    onSelectPairing: (name: string) => void,
    baseImage?: string | null
}) => {
    const [pairingSearch, setPairingSearch] = useState('');
    const [hoveredModalImage, setHoveredModalImage] = useState<string | null>(null);

    if (!isOpen) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center sm:p-4 p-0">
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-black bg-cover bg-center"
                        style={{ backgroundImage: `url(${hoveredModalImage || baseImage || ''})` }}
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[24px]"></div>
                    </motion.div>
                    
                    <div className="absolute inset-0 z-0" onClick={onClose}></div>

                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative z-10 w-full max-w-6xl h-full sm:h-[85vh] flex flex-col md:flex-row bg-[var(--color-bg-surface)] border border-[var(--color-border-heavy)] sm:rounded-3xl shadow-[0_40px_120px_rgba(0,0,0,0.8)] overflow-hidden"
                    >
                        <div className="flex-1 flex flex-col min-w-0 md:border-r border-[var(--color-border-heavy)]">
                            <div className="p-8 pb-4 flex justify-between items-start">
                                <div className="space-y-1">
                                    <h2 className="font-serif text-4xl italic text-[var(--color-text-main)] tracking-tighter">Companion Selection</h2>
                                    <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--color-text-dimmed)] font-bold">Haroma Orchestration</p>
                                </div>
                                <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-bg-overlay)] border border-[var(--color-border-light)] text-[var(--color-text-dimmed)] hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="px-8 mb-4">
                                <div className="flex items-center gap-3 px-4 py-3 bg-[var(--color-bg-dark)] border border-[var(--color-border-light)] rounded-xl focus-within:border-[var(--color-accent)] transition-all group">
                                    <Search className="w-4 h-4 text-[var(--color-text-dimmed)] group-focus-within:text-[var(--color-accent)]" />
                                    <input type="text" value={pairingSearch} onChange={(e) => setPairingSearch(e.target.value)} placeholder="Sieve through the collection..." className="bg-transparent border-none outline-none text-sm text-[var(--color-text-main)] w-full placeholder:text-[var(--color-text-dimmed)] placeholder:italic" />
                                </div>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto beautiful-scrollbar px-8 pb-8 space-y-8">
                                {Object.entries(menuData).map(([cat, items]: [string, any]) => {
                                    const filteredItems = items.filter((d: any) => d.name !== currentDishName && (d.name.toLowerCase().includes(pairingSearch.toLowerCase()) || d.desc.toLowerCase().includes(pairingSearch.toLowerCase())));
                                    if (filteredItems.length === 0) return null;
                                    return (
                                        <div key={cat} className="space-y-4">
                                            <h3 className="font-mono text-[8px] uppercase tracking-[0.5em] text-[var(--color-accent)] font-bold pl-1">{cat}</h3>
                                            <div className="grid grid-cols-1 gap-2">
                                                {filteredItems.map((d: any) => {
                                                    const isAdded = selectedPairings.includes(d.name);
                                                    return (
                                                        <button key={d.name} onClick={() => !isAdded && onSelectPairing(d.name)} onMouseEnter={() => setHoveredModalImage(d.image || (d.images && d.images[0]) || '')} onMouseLeave={() => setHoveredModalImage(null)} className={`group flex items-center justify-between p-4 rounded-xl border transition-all text-left ${isAdded ? 'bg-[var(--color-bg-overlay)] border-[var(--color-border-heavy)] opacity-40 cursor-not-allowed' : 'bg-[var(--color-bg-overlay)] border-[var(--color-border-light)] hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-surface-light)]'}`}>
                                                            <div className="flex flex-col gap-1 pr-4 min-w-0">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-serif text-lg text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition-colors">{d.name}</span>
                                                                    {isAdded && <Check className="w-3 h-3 text-[var(--color-accent)]" />}
                                                                </div>
                                                                <p className="font-sans text-[10px] text-[var(--color-text-dimmed)] truncate max-w-md italic">{d.desc}</p>
                                                            </div>
                                                            <div className="flex items-center gap-4 shrink-0">
                                                                <span className="font-mono text-sm font-bold text-[var(--color-text-main)]">{d.price}</span>
                                                                {!isAdded && <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--color-accent)]/10 text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-black transition-all"><Plus className="w-4 h-4" /></div>}
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="hidden md:block w-2/5 bg-[var(--color-bg-dark)] relative overflow-hidden group">
                            <AnimatePresence mode="wait">
                                <motion.div key={hoveredModalImage || 'placeholder'} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }} className="absolute inset-0" style={{ backgroundImage: `url(${hoveredModalImage || baseImage || ''})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

const ProductDetailPage = ({ menuData, cart, updateCart, cartPairings, updateCartPairing }: { menuData: any, cart: any, updateCart: any, cartPairings: any, updateCartPairing: any }) => {
    const { name } = useParams();
    const dishName = decodeURIComponent(name || "");
    const [selectedPairing, setSelectedPairing] = useState<number>(0);
    const [showAllergens, setShowAllergens] = useState(false);
    const [heroImageIdx, setHeroImageIdx] = useState(0);
    const [hoveredPairingImage, setHoveredPairingImage] = useState<string | null>(null);
    const [showPairingModal, setShowPairingModal] = useState(false);
    const [pairingSearch, setPairingSearch] = useState('');
    const [hoveredModalImage, setHoveredModalImage] = useState<string | null>(null);
    const sliderIntervalRef = useRef<any>(null);
    const touchStartRef = useRef<number | null>(null);
    
    // Find the dish in our menu
    let dish: any = null;
    let categoryName = "";
    Object.entries(menuData).forEach(([category, items]: [string, any]) => {
        const found = items.find((i: any) => i.name === dishName);
        if (found) {
            dish = found;
            categoryName = category;
        }
    });

    const heroImages = dish ? [
        dish.image,
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1600&h=900",
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1600&h=900"
    ] : [];

    useEffect(() => {
        sliderIntervalRef.current = setInterval(() => {
            setHeroImageIdx(prev => (prev + 1) % heroImages.length);
        }, 3000); // 3 seconds interval allows for animation + 2 seconds read time
        return () => {
            if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current);
        };
    }, [heroImages.length]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartRef.current === null) return;
        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStartRef.current - touchEnd;
        if (Math.abs(diff) > 50) {
            if (diff > 0) setHeroImageIdx(prev => (prev + 1) % heroImages.length);
            else setHeroImageIdx(prev => (prev - 1 + heroImages.length) % heroImages.length);
        }
        touchStartRef.current = null;
    };

    if (!dish) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-dark)] text-[var(--color-text-main)]">
                <div className="text-center">
                    <h1 className="text-4xl font-serif mb-4 tracking-tighter uppercase">Dish Not Found</h1>
                    <Link to="/menu" className="text-[var(--color-primary)] hover:underline flex items-center gap-2 justify-center font-bold font-sans tracking-widest text-xs">
                        <ChevronLeft className="w-4 h-4" /> BACK TO MENU
                    </Link>
                </div>
            </div>
        );
    }

    const allDishes = Object.values(menuData).flat() as any[];
    const allDishNames = allDishes.map(d => d.name);
    const [userPairings, setUserPairings] = useState<string[]>(cartPairings[dish.name] || dish.pairings || []);
    const [pairingsEnabled, setPairingsEnabled] = useState(false);

    useEffect(() => {
       updateCartPairing(dish.name, userPairings);
    }, [userPairings, dish.name]);

    const menuGroupOptions = Object.entries(menuData).map(([category, items]: [string, any]) => ({
        label: category,
        items: items
            .filter((i: any) => i.name !== dish.name && !userPairings.includes(i.name))
            .map((item: any) => ({ 
                label: item.name, 
                value: item.name, 
                desc: item.desc, 
                price: item.price, 
                image: item.image 
            }))
    }));

    const suggestedPairings = useMemo(() => {
        let suggestions: any[] = [];
        let pairingNamesToUse = userPairings;
        
        // If it's the exact same length as dish.pairings and both are empty, and dish.pairings IS defined, it means the DB explicitly has []
        const isExplicitlyEmpty = dish.pairings !== undefined && userPairings.length === 0 && dish.pairings.length === 0;
        
        if (isExplicitlyEmpty) {
            return [];
        }
        
        // If no user override is happening and DB is undefined, use defaults
        if (pairingNamesToUse.length === 0 && dish.pairings === undefined) {
             pairingNamesToUse = getDefaultPairings(dish.name, categoryName, menuData);
        }
        
        if (pairingNamesToUse.length > 0) {
            suggestions = pairingNamesToUse.map(name => allDishes.find(d => d.name === name)).filter(Boolean);
        }
        
        // Removed the extra < 4 random population if we're dealing with explicit settings
        return suggestions;
    }, [dish, userPairings, allDishes, categoryName, menuData]);

    const calculateTotal = useMemo(() => {
        const dishPrice = parseInt(dish.price.replace(/[^\d]/g, '')) || 0;
        if (!pairingsEnabled) return dishPrice;
        
        const pairingsPrice = suggestedPairings.reduce((sum, p) => {
            const pPrice = parseInt(p.price.replace(/[^\d]/g, '')) || 0;
            return sum + pPrice;
        }, 0);
        
        return dishPrice + pairingsPrice;
    }, [dish.price, suggestedPairings, pairingsEnabled]);

    const formatCurrency = (num: number) => {
        return "₦" + num.toLocaleString();
    };

    const innerCircle = [
        { user: "Alexander V.", combination: "Double Truffle + Reserve Cabernet", date: "2 nights ago" },
        { user: "Sarah L.", combination: "Standard Pair + Extra Hearth Salt", date: "Last Saturday" }
    ];

    useEffect(() => {
        if (hoveredPairingImage) {
            document.body.classList.add('dish-focus-mode');
        } else {
            document.body.classList.remove('dish-focus-mode');
        }
        return () => document.body.classList.remove('dish-focus-mode');
    }, [hoveredPairingImage]);

    return (
        <main className="bg-[var(--color-bg-dark)] pt-32 pb-24 text-[var(--color-text-main)] transition-colors duration-500 relative min-h-screen">
             <style>{`
                body.dish-focus-mode nav,
                body.dish-focus-mode footer,
                body.dish-focus-mode .dish-focus-fade-layer { opacity: 0; pointer-events: none; }
                nav, footer, .dish-focus-fade-layer { transition: opacity 0.5s ease-in-out; }
                .beautiful-scrollbar::-webkit-scrollbar { width: 4px; }
                .beautiful-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .beautiful-scrollbar::-webkit-scrollbar-thumb { background: var(--color-border-heavy); border-radius: 10px; }
            `}</style>


            <div className="absolute top-0 left-0 w-full h-[100vh] pointer-events-none overflow-hidden z-0">
                <motion.div 
                    animate={{ 
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 1.05, 1],
                        rotate: [0, 1, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full bg-[radial-gradient(circle_at_center,var(--color-accent)_0%,transparent_70%)] opacity-10 blur-3xl translate-x-[-10%] translate-y-[-20%]"
                />
            </div>

            <div className={`max-w-[1600px] mx-auto px-4 md:px-12 relative z-10 transition-opacity duration-500 dish-focus-fade-layer ${hoveredPairingImage ? 'opacity-0' : 'opacity-100'}`}>
                <Link to="/menu" className="inline-flex items-center gap-2 text-[var(--color-text-dimmed)] hover:text-[var(--color-primary)] transition-colors mb-12 font-sans text-[10px] uppercase tracking-[0.2em] font-bold">
                    <ChevronLeft className="w-4 h-4" />
                    Back to {categoryName} Offerings
                </Link>

                <CompanionSelectionModal
                    isOpen={showPairingModal}
                    onClose={() => setShowPairingModal(false)}
                    menuData={menuData}
                    currentDishName={dish.name}
                    selectedPairings={userPairings}
                    onSelectPairing={(name) => {
                        const currentNames = suggestedPairings.map(s => s.name);
                        setUserPairings([...currentNames, name]);
                        setShowPairingModal(false);
                        if (!pairingsEnabled) setPairingsEnabled(true);
                    }}
                    baseImage={dish.image}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
                    <div className="lg:col-span-12 xl:col-span-8 space-y-16">
                        <div className="relative group">
                            {/* Cinematic Slider */}
                            <div 
                                className="w-full aspect-video lg:h-[70vh] bg-[var(--color-bg-surface-light)] rounded-[1.5rem] overflow-hidden relative shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-[var(--color-border-heavy)]"
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                            >
                                <AnimatePresence>
                                    <motion.div 
                                        key={heroImageIdx}
                                        initial={{ x: 100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -100, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="absolute inset-0 w-full h-full"
                                    >
                                        <img 
                                            alt={dish.name} 
                                            className="w-full h-full object-cover object-center" 
                                            src={heroImages[heroImageIdx]} 
                                            referrerPolicy="no-referrer" 
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Slider Controls */}
                                <div className="absolute inset-x-0 bottom-8 flex justify-center items-center gap-6 z-20">
                                    <button 
                                        onClick={() => setHeroImageIdx((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
                                        className="w-10 h-10 rounded-full bg-[var(--color-bg-overlay)] backdrop-blur-md border border-[var(--color-border-light)] flex items-center justify-center text-[var(--color-text-main)] hover:bg-[var(--color-accent)] hover:text-black transition-all"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <div className="flex gap-2">
                                        {heroImages.map((_, i) => (
                                            <div 
                                                key={i} 
                                                className={`w-1.5 h-1.5 rounded-full transition-all ${heroImageIdx === i ? 'bg-[var(--color-accent)] w-5' : 'bg-[var(--color-text-muted)] opacity-30'}`} 
                                            />
                                        ))}
                                    </div>
                                    <button 
                                        onClick={() => setHeroImageIdx((prev) => (prev + 1) % heroImages.length)}
                                        className="w-10 h-10 rounded-full bg-[var(--color-bg-overlay)] backdrop-blur-md border border-[var(--color-border-light)] flex items-center justify-center text-[var(--color-text-main)] hover:bg-[var(--color-accent)] hover:text-black transition-all"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Section: Essential Information (Moved underneath) */}
                            <div className="mt-12 space-y-10">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-[var(--color-border-light)] pb-12">
                                    <div className="max-w-2xl">
                                        <motion.h1 
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            className="font-serif text-4xl md:text-6xl text-[var(--color-text-main)] tracking-tighter mb-4 leading-tight italic"
                                        >
                                            {dish.name}
                                        </motion.h1>
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] font-bold bg-[var(--color-accent)]/10 px-4 py-2 rounded-full border border-[var(--color-accent)]/20">
                                                Provenance: {dish.name.includes("Wagyu") ? "Miyazaki" : "Lagos Central"}
                                            </span>
                                            <button 
                                                onClick={() => setShowAllergens(!showAllergens)}
                                                className="flex items-center gap-2 group cursor-pointer h-10 pl-1 pr-4 rounded-full bg-[var(--color-bg-surface-light)] border border-[var(--color-border-light)] hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                                    <Info className="w-4 h-4 text-[var(--color-accent)] group-hover:text-black" />
                                                </div>
                                                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-main)] group-hover:text-black font-bold">Allergen Secrets</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-serif italic text-3xl text-[var(--color-text-dimmed)] max-w-xs leading-tight">
                                            "A dialogue between flame, obsidian, and raw essence."
                                        </p>
                                    </div>
                                </div>
                                <div className="max-w-4xl">
                                    <p className="font-sans text-lg text-[var(--color-text-dimmed)] leading-relaxed italic border-l-4 border-[var(--color-accent)] pl-8">
                                        {dish.desc || "A signature creation defining the boundary between tradition and exploration."}
                                    </p>
                                </div>
                            </div>
                            
                            <AnimatePresence>
                                {showAllergens && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="fixed inset-0 z-[100] bg-[var(--color-bg-overlay)] backdrop-blur-3xl flex items-center justify-center p-12"
                                    >
                                        <div className="max-w-md w-full bg-[var(--color-bg-surface)] p-8 border border-[var(--color-border-heavy)] shadow-2xl rounded-2xl text-center">
                                            <ShieldCheck className="w-16 h-16 text-[var(--color-accent)] mx-auto mb-6" />
                                            <h3 className="font-serif text-3xl mb-4 italic text-[var(--color-text-main)]">Dietary Transparency</h3>
                                            <p className="font-sans text-sm text-[var(--color-text-dimmed)] mb-8 leading-relaxed">
                                                This dish contains trace amounts of dairy in the emulsion and foraged seeds that may contain allergens. Our kitchen maintains high isolation standards.
                                            </p>
                                            <div className="grid grid-cols-3 gap-4 mb-10">
                                                {['Gluten', 'Dairy', 'Nuts'].map(t => (
                                                    <div key={t} className="bg-[var(--color-bg-surface-light)] border border-[var(--color-border-light)] rounded-lg py-4">
                                                        <p className="font-mono text-[10px] uppercase text-[var(--color-text-muted)] mb-1">{t}</p>
                                                        <Check className={`w-4 h-4 mx-auto ${t === 'Nuts' ? 'text-red-500' : 'text-green-500'}`} />
                                                    </div>
                                                ))}
                                            </div>
                                            <Button onClick={() => setShowAllergens(false)} className="bg-[var(--color-primary)] text-white w-full border-none px-12 h-14 rounded-full font-bold uppercase tracking-widest text-[10px]">Close Secrets</Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Section 2: Interactive Sommelier Pairings */}
                        <div className={`bg-[var(--color-bg-surface)] rounded-[0.5rem] p-4 lg:p-10 border border-[var(--color-border-heavy)] relative overflow-visible backdrop-blur-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.5)] transition-opacity duration-500 ${!pairingsEnabled ? 'opacity-40' : 'opacity-100'}`}>
                             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                                <div>
                                    <h3 className="font-serif text-4xl mb-2 italic tracking-tight text-[var(--color-text-main)]">Interactive Sommelier Pairings</h3>
                                    <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--color-accent)] font-bold pl-1">The science of harmonic resonance</p>
                                </div>
                                
                                <div className="flex items-center gap-4 bg-[var(--color-bg-dark)]/50 p-2 pl-4 rounded-full border border-[var(--color-border-light)]">
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-dimmed)] font-bold">Include Pairings</span>
                                    <button 
                                        onClick={() => setPairingsEnabled(!pairingsEnabled)}
                                        className={`w-12 h-6 rounded-full relative transition-all duration-300 shadow-inner ${pairingsEnabled ? 'bg-[var(--color-accent)]' : 'bg-white/5'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${pairingsEnabled ? 'left-7' : 'left-1'}`}></div>
                                    </button>
                                </div>
                             </div>

                             <div className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch transition-all duration-500 ${!pairingsEnabled ? 'pointer-events-none' : ''}`}>
                                {suggestedPairings.map((p: any, idx) => {
                                    return (
                                        <motion.div 
                                            key={p.name}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="bg-[var(--color-bg-dark)] border border-[var(--color-border-light)] rounded-lg overflow-hidden group transition-all flex flex-col relative h-full hover:border-[var(--color-accent)] hover:shadow-xl"
                                        >
                                            <div className="aspect-[4/5] relative overflow-hidden bg-[var(--color-bg-dark)]/50">
                                                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" />
                                                
                                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-sm">
                                                    <p className="font-serif text-lg text-[var(--color-text-main)] mb-1 leading-tight">{p.name}</p>
                                                    <div className="flex justify-between items-center">
                                                        <span className="font-mono text-[10px] text-[var(--color-accent)] font-bold">{p.price}</span>
                                                        <Link to={`/product/${encodeURIComponent(p.name)}`} className="font-mono text-[8px] uppercase tracking-widest text-[var(--color-text-dimmed)] hover:text-[var(--color-text-main)] flex items-center gap-1">Explore</Link>
                                                    </div>
                                                </div>

                                                <button 
                                                    onClick={() => {
                                                        if (suggestedPairings.length <= 1) return;
                                                        const currentNames = suggestedPairings.map(s => s.name);
                                                        setUserPairings(currentNames.filter(name => name !== p.name));
                                                    }}
                                                    className={`absolute top-3 right-3 w-8 h-8 rounded-[0.25rem] bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all border border-white/10 shadow-2xl z-10 ${suggestedPairings.length <= 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-red-500 hover:text-white'}`}
                                                    title={suggestedPairings.length <= 1 ? "At least one pairing required" : "Remove pairing"}
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    );
                                })}

                                {/* Add Pairing Placeholder Card */}
                                {suggestedPairings.length < 10 && (
                                    <div 
                                        className="border-2 border-dashed border-[var(--color-border-heavy)] rounded-lg flex flex-col items-center justify-center min-h-[150px] gap-4 group cursor-pointer hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-surface-light)] transition-all bg-[var(--color-bg-dark)]/50"
                                        onClick={() => setShowPairingModal(true)}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-[var(--color-bg-surface-light)] border border-[var(--color-border-heavy)] flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:text-black transition-all group-hover:scale-110">
                                            <Plus className="w-5 h-5 text-[var(--color-text-main)] group-hover:text-black" />
                                        </div>
                                        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--color-text-dimmed)] group-hover:text-[var(--color-text-main)] transition-colors font-bold text-center">Add Pairing</p>
                                    </div>
                                )}
                             </div>

                             <div className="mt-12 pt-10 border-t border-[var(--color-border-light)] flex justify-center">
                                <Link to="/place-order" className="group">
                                    <Button className="px-12 py-5 bg-[var(--color-primary)] text-white shadow-[0_20px_50px_rgba(var(--color-primary-rgb),0.3)] hover:bg-[var(--color-accent)] hover:text-black transition-all flex items-center gap-4">
                                        Place an Order
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                    </Button>
                                </Link>
                             </div>
                        </div>

                        {/* Section 3: What to Expect */}
                        <div className="relative w-full h-[300px] overflow-hidden group border border-[var(--color-border-heavy)] rounded-[1.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                             <img 
                                alt="Experience"
                                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" 
                                src="https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=1600" 
                                referrerPolicy="no-referrer" 
                             />
                             
                             <div className="absolute inset-0 flex items-center px-10 md:px-20 bg-black/30 backdrop-blur-[1px]">
                                <div className="max-w-2xl">
                                    <h3 className="font-serif text-5xl lg:text-7xl italic text-[var(--color-text-main)] mb-2 leading-none tracking-tighter">What to Expect</h3>
                                    <p className="font-sans text-sm text-[var(--color-text-dimmed)] italic max-w-xl">
                                        The "Convergence" — our table-side finale.
                                    </p>
                                </div>
                             </div>
                        </div>

                        {/* Section 4: The voice of tongues... */}
                        <div className="space-y-12 pb-12">
                             <div className="flex items-center gap-6">
                                <h2 className="font-serif text-4xl italic text-[var(--color-text-main)]">The voice of tongues, the voice of the tongues that have tasted</h2>
                                <div className="h-[1px] flex-1 bg-gradient-to-r from-[var(--color-border-heavy)] to-transparent"></div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-[var(--color-text-main)]">
                                {innerCircle.map((entry, idx) => (
                                    <div key={idx} className="bg-[var(--color-bg-surface)] backdrop-blur-[40px] p-8 rounded-[0.5rem] border border-[var(--color-border-heavy)] shadow-[0_40px_100px_rgba(0,0,0,0.3)] hover:border-[var(--color-accent)] transition-all flex flex-col gap-6 group">
                                         <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-[var(--color-bg-dark)] flex items-center justify-center text-[var(--color-accent)] font-mono text-sm uppercase border border-[var(--color-border-light)]">
                                                    {entry.user[0]}
                                                </div>
                                                <div>
                                                    <p className="font-sans text-sm font-bold text-[var(--color-text-main)]">{entry.user}</p>
                                                    <p className="font-mono text-[9px] uppercase text-[var(--color-text-dimmed)] tracking-widest">{entry.date}</p>
                                                </div>
                                            </div>
                                            <Quote className="w-6 h-6 text-[var(--color-accent)] opacity-20 group-hover:opacity-100 transition-opacity" />
                                         </div>
                                         <p className="font-serif italic text-xl text-[var(--color-text-main)] leading-relaxed">
                                            "{entry.combination}"
                                         </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Order & Pricing (Sticky) */}
                    <div className="lg:col-span-12 xl:col-span-4 self-start sticky top-32 z-40">
                        <div className="bg-[var(--color-bg-surface)] backdrop-blur-[40px] rounded-[0.5rem] p-5 shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-[var(--color-border-heavy)] relative overflow-visible">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)]/5 blur-3xl rounded-full translate-x-10 translate-y-[-10%]"></div>
                             
                             {/* THE STICKY PRICE BOX SECTION */}
                             <div className="mb-8 border-b border-[var(--color-border-heavy)] pb-8">
                                <p className="font-serif text-7xl text-[var(--color-text-main)] tracking-tighter mb-4 leading-none truncate pr-2">
                                    {formatCurrency(calculateTotal)}
                                </p>
                                <div className="flex items-center gap-2">
                                    <p className="font-sans text-[10px] text-[var(--color-text-dimmed)] italic uppercase tracking-widest font-bold">
                                        {pairingsEnabled ? "Pairing resonance included." : "Base preparation only."}
                                    </p>
                                    {pairingsEnabled && (
                                        <div className="flex gap-1">
                                            <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
                                            <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] animate-pulse delay-75"></span>
                                            <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] animate-pulse delay-150"></span>
                                        </div>
                                    )}
                                </div>
                             </div>

                             <div className="space-y-8">
                                <div className="flex flex-col gap-4">
                                    <h4 className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-text-dimmed)] font-bold pl-1">Quantity Selector</h4>
                                    <div className="flex items-center justify-between bg-[var(--color-bg-dark)]/50 rounded-xl p-4 border border-[var(--color-border-light)]">
                                        <button 
                                            onClick={() => updateCart(dish.name, -1)}
                                            className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--color-bg-surface)] border border-[var(--color-border-light)] hover:bg-[var(--color-accent)] hover:text-black hover:border-transparent transition-all shadow-sm group"
                                        >
                                            <Minus className="w-4 h-4 text-[var(--color-text-main)] group-hover:text-black" />
                                        </button>
                                        <span className="font-mono text-2xl font-bold text-[var(--color-text-main)]">{cart[dish.name] || 0}</span>
                                        <button 
                                            onClick={() => updateCart(dish.name, 1)}
                                            className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--color-bg-surface)] border border-[var(--color-border-light)] hover:bg-[var(--color-accent)] hover:text-black hover:border-transparent transition-all shadow-sm group"
                                        >
                                            <Plus className="w-4 h-4 text-[var(--color-text-main)] group-hover:text-black" />
                                        </button>
                                    </div>
                                </div>

                                <Link to="/place-order" className="block">
                                    <Button className="w-full py-5 bg-[var(--color-primary)] text-white shadow-[0_20px_50px_rgba(var(--color-primary-rgb),0.3)] hover:bg-[var(--color-accent)] hover:text-black hover:border-transparent group transition-all">
                                        Place an Order
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

const CustomDatePicker = ({ value, onChange }: { value: Date | null, onChange: (d: Date) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const handlePrevMonth = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)); };
  const handleNextMonth = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)); };

  return (
    <div className="relative w-full" ref={dropdownRef} style={{ zIndex: isOpen ? 500 : 1 }}>
      <div 
         className="bg-[var(--color-bg-overlay)] border border-[var(--color-border-light)] rounded-xl py-3 px-4 text-[var(--color-text-main)] cursor-pointer flex justify-between items-center transition-colors hover:border-[var(--color-primary)]/50 min-h-[48px]"
         onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate pr-4 leading-none text-sm font-medium uppercase tracking-wider">{value ? value.toLocaleDateString('en-GB') : 'dd/mm/yyyy'}</span>
        <CalendarDays className="w-4 h-4 text-[var(--color-text-dimmed)]" />
      </div>

      {isOpen && (
        <div style={{ backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)' }} className="absolute top-[calc(100%+8px)] left-0 w-full bg-[var(--color-bg-dropdown)] border border-[var(--color-border-light)] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 z-[500] animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="flex justify-between items-center mb-4">
            <button type="button" onClick={handlePrevMonth} className="magnetic-btn text-[var(--color-text-muted)] hover:text-white p-2 rounded-full overflow-hidden">
              <div className="hover-bg"></div>
              <ChevronLeft className="w-4 h-4 relative z-10"/>
            </button>
            <div className="font-serif text-base tracking-wide text-[var(--color-text-main)]">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>
            <button type="button" onClick={handleNextMonth} className="magnetic-btn text-[var(--color-text-muted)] hover:text-white p-2 rounded-full overflow-hidden">
              <div className="hover-bg"></div>
              <ChevronRight className="w-4 h-4 relative z-10"/>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(d => (
              <div key={d} className="text-center font-mono text-[9px] uppercase tracking-widest text-[var(--color-text-muted)] opacity-60">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1 gap-x-1">
            {days.map((day, idx) => {
              if (!day) return <div key={idx} className="h-8"></div>;
              const isSelected = value && value.getDate() === day && value.getMonth() === currentMonth.getMonth() && value.getFullYear() === currentMonth.getFullYear();
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
                    setIsOpen(false);
                  }}
                   className={`h-8 w-8 flex flex-col items-center justify-center rounded-full text-xs font-sans relative transition-all duration-300 mx-auto ${
                    isSelected 
                      ? 'bg-[var(--color-accent)] text-[#0A0C0F] font-bold shadow-[0_4px_10px_rgba(227,154,40,0.5)] scale-110' 
                      : 'text-[var(--color-text-main)] hover:bg-[var(--color-bg-overlay)]'
                    }`}
                >
                  {day}
                  {isSelected && <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#0A0C0F]"></span>}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-6 mt-4 pt-3 border-t border-[var(--color-border-light)] text-[10px] font-sans text-[var(--color-text-muted)]">
             <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] opacity-80"></span> Available</div>
             <div className="flex items-center gap-1.5"><span className="w-2 h-[1px] bg-[var(--color-text-dimmed)]"></span> Fully Booked</div>
          </div>
        </div>
      )}
    </div>
  );
};

const CustomSelect = ({ value, onChange, options, placeholder, icon, menuClassName, triggerClassName, onHoverItem, variant }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Removed auto-focus to prevent unexpected scrolling behavior
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current && !containerRef.current.contains(target) && popupRef.current && !popupRef.current.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const normalizedOptions = (options && Array.isArray(options) && options.length > 0 && typeof options[0] === 'string')
    ? [{ category: 'Global Search', items: options.map(opt => ({ label: opt, value: opt })) }]
    : (options || []);

  const getSelectedLabel = () => {
     for(const group of normalizedOptions) {
        if (!group.items) continue;
        const found = group.items.find((i: any) => i.value === value);
        if(found) return found.label;
     }
     return placeholder;
  };

  const filteredOptions = normalizedOptions.map((group: any) => ({
    ...group,
    items: (group.items || []).filter((item: any) => 
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter((group: any) => group.items && group.items.length > 0);

  const handleSelection = (itemValue: any) => {
    onChange(itemValue);
    // Removed setIsOpen(false) per user request to keep dropdown open on selection
    setHoveredImage(null);
    if (onHoverItem) onHoverItem(null);
  };

  const isDense = variant === 'dense';

  return (
    <div className={`w-full relative CustomSelect-container`} ref={containerRef}>
      <div 
         className={triggerClassName || "bg-[var(--color-bg-overlay)] border border-[var(--color-border-light)] rounded-xl py-3 px-4 text-[var(--color-text-main)] cursor-pointer flex justify-between items-center transition-all hover:border-[var(--color-border-heavy)] min-h-[52px]"}
         onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate pr-4 leading-none text-sm font-medium uppercase tracking-widest">{getSelectedLabel()}</span>
        {icon || <ChevronDown className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''} text-[var(--color-text-dimmed)]`} />}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            ref={popupRef}
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            className={`absolute top-[calc(100%+12px)] left-0 w-full z-[10000] ${isDense ? 'bg-[#1a1a1a]' : 'bg-[#1a1a1a]/70 backdrop-blur-3xl'} border border-white/5 rounded-2xl shadow-[0_100px_150px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col ${menuClassName || ''}`}
            style={isDense ? {} : { WebkitBackdropFilter: 'blur(40px)' }}
          >
            <div className={`max-h-[50vh] overflow-y-auto beautiful-scrollbar ${isDense ? 'p-1.5' : 'p-3 pt-4 pb-6'} ${isDense ? 'space-y-0.5' : 'space-y-4'}`}>
              {filteredOptions.length === 0 ? (
                 <div className="p-8 text-center text-sm text-white/30 italic font-serif">Silence of the harvest.</div>
              ) : (
                   filteredOptions.map((group: any, gIdx: number) => (
                      <div key={gIdx} className={isDense ? 'space-y-0.5' : 'space-y-3'}>
                        {(group.label || group.category) && (
                          <div className={isDense ? 'px-2 py-1' : 'px-3'}>
                             <h2 className="font-serif italic text-[11px] uppercase tracking-[0.4em] text-white/30 font-bold">
                                {group.label || group.category}
                             </h2>
                             {!isDense && <div className="h-[1px] w-full bg-white/5 mt-1.5"></div>}
                          </div>
                        )}
                        <div className={`flex flex-col ${isDense ? 'gap-px' : 'gap-1'}`}>
                           {(group.items || []).map((item: any) => {
                             const isSelected = item.value === value;
                             return (
                               <button
                                 key={item.value}
                                 type="button"
                                 className={`group relative flex items-center ${isDense ? 'py-1.5 px-3 gap-2.5' : 'p-2.5 gap-5'} rounded-xl text-left transition-all duration-300 border ${isSelected ? 'bg-white/5 border-[#e39a28]/40 shadow-[0_15px_30px_rgba(0,0,0,0.4)]' : 'bg-transparent border-transparent hover:bg-white/5 hover:border-[#e39a28]/20'}`}
                                 onClick={() => {
                                   onChange(item.value);
                                   // Keep open per user request
                                   // setIsOpen(false);
                                   setSearchQuery('');
                                 }}
                                 onMouseEnter={() => {
                                   if (onHoverItem) onHoverItem(item.image);
                                 }}
                                 onMouseLeave={() => {
                                   if (onHoverItem) onHoverItem(null);
                                 }}
                               >
                                  {item.image && (
                                    <div className={`w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 transition-all duration-500 ${isSelected ? 'border-[#e39a28] scale-105 shadow-[0_0_15px_rgba(227,154,40,0.2)]' : 'border-white/10 group-hover:border-[#e39a28]/60'}`}>
                                      <img src={item.image} alt={item.label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                    </div>
                                  )}

                                  <div className="flex-1 min-w-0 pr-3">
                                     <div className="flex justify-between items-baseline mb-0.5">
                                        <h4 className={`font-serif leading-tight transition-colors truncate pr-2 ${isSelected ? 'text-[#e39a28] font-bold' : 'text-white/80'} ${isDense ? 'text-base' : 'text-lg'}`}>
                                          {item.label}
                                        </h4>
                                        {item.price && (
                                          <span className={`font-mono transition-colors shrink-0 ${isSelected ? 'text-[#e39a28] font-bold' : 'text-white/30'} ${isDense ? 'text-sm' : 'text-base'}`}>
                                            {item.price}
                                          </span>
                                        )}
                                     </div>
                                     {item.desc && (
                                       <p className={`text-[10px] leading-relaxed transition-colors line-clamp-1 uppercase tracking-[0.12em] font-medium ${isSelected ? 'text-[#e39a28]/70' : 'text-white/20'}`}>
                                         {item.desc}
                                       </p>
                                     )}
                                  </div>

                                  {isSelected && (
                                    <div className={`absolute top-2 right-2 ${isDense ? 'w-4 h-4' : 'w-5 h-5'} bg-[#e39a28] rounded-[3px] flex items-center justify-center text-black shadow-lg`}>
                                       <Check className={isDense ? 'w-2.5 h-2.5 stroke-[4px]' : 'w-3.5 h-3.5 stroke-[4px]'} />
                                    </div>
                                  )}
                               </button>
                             );
                           })}
                        </div>
                      </div>
                   ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TimeSelectionDropdown = ({ value, onChange }: { value: string, onChange: (v: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const minTime = 8 * 60; // 08:00
  const maxTime = 20 * 60; // 20:00

  const parseTimeValue = (v: string) => {
    if(!v) return minTime;
    const match = v.match(/(\d+):(\d+)\s+(AM|PM)/);
    if(match) {
       let h = parseInt(match[1]);
       const m = parseInt(match[2]);
       const ampm = match[3];
       if(ampm === 'PM' && h !== 12) h += 12;
       if(ampm === 'AM' && h === 12) h = 0;
       return h * 60 + m;
    }
    return minTime;
  };

  const [valMins, setValMins] = useState(parseTimeValue(value));
  const snappedMins = Math.round(valMins / 15) * 15;
  const isSet = !!value;

  const formatTime12h = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    const finalH = h12 === 0 ? 12 : h12;
    return `${finalH}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  const startTimeStr = formatTime12h(snappedMins);

  useEffect(() => {
    if (valMins !== parseTimeValue(value)) {
       onChange(startTimeStr);
    }
  }, [snappedMins, onChange]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const valPct = ((snappedMins - minTime) / (maxTime - minTime)) * 100;

  return (
    <div className="relative w-full" ref={dropdownRef} style={{ zIndex: isOpen ? 500 : 1 }}>
      <div 
         className={`bg-[var(--color-bg-overlay)] border border-[var(--color-border-light)] rounded-xl py-3 px-4 text-[var(--color-text-main)] cursor-pointer flex justify-between items-center transition-colors hover:border-[var(--color-primary)]/50 min-h-[48px] ${isOpen || isSet ? 'text-[var(--color-accent)]' : 'text-[var(--color-primary)]'}`}
         onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate pr-4 leading-none text-sm font-medium uppercase tracking-wider">{isSet ? startTimeStr : 'Select Time'}</span>
        <Clock className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div style={{ backdropFilter: 'blur(15px)', WebkitBackdropFilter: 'blur(15px)' }} className="absolute top-[calc(100%+8px)] left-0 mt-2 w-full bg-[var(--color-bg-dropdown)] border border-[var(--color-border-light)] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-5 z-[500] animate-in slide-in-from-top-2 fade-in duration-300">
           <div className="flex justify-between items-center mb-6">
             <span className="font-mono text-[9px] uppercase text-[var(--color-text-dimmed)] tracking-[0.3em]">Arrival Time</span>
             <span className="font-serif italic text-xl text-[var(--color-accent)]">{startTimeStr}</span>
           </div>
           
           <div className="relative h-8 flex items-center group mb-2">
             <div className="absolute inset-x-0 h-[1px] bg-[var(--color-border-heavy)] overflow-hidden rounded-full">
                <div className="h-full bg-[var(--color-accent)]" style={{ width: `${valPct}%` }}></div>
             </div>
             <input 
                type="range" min={minTime} max={maxTime} value={snappedMins} 
                onChange={(e) => {
                  setValMins(Number(e.target.value));
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10"
             />
             <div 
               className={`absolute w-3 h-3 rounded-full bg-[var(--color-accent)] pointer-events-none shadow-[0_0_15px_rgba(227,154,40,0.6)] transition-transform duration-200 ${isFocused ? 'scale-150' : 'group-hover:scale-125'}`}
               style={{ left: `calc(${valPct}% - 6px)` }}
             ></div>
           </div>

           <div className="flex justify-between font-mono text-[8px] text-[var(--color-text-dimmed)] tracking-widest px-1 relative z-10 select-none">
              {[8, 11, 14, 17, 20].map(h => (
                   <span key={h}>{h % 12 || 12}:00</span>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

// --- End of CheckoutPage Helpers ---

const serveStyleOptions = [{ label: '', items: [
  { label: 'Serve sequentially (One after the other)', value: 'sequential' },
  { label: 'Serve everything at once', value: 'all' }
]}];

const guestOptions = [{ label: '', items: [
  { label: '1 Person', value: '1 Person' },
  { label: '2 People', value: '2 People' },
  { label: '3 People', value: '3 People' },
  { label: '4+ People', value: '4+ People' },
]}];

const timeOptions = [{ label: '', items: [
  { label: '18:00', value: '18:00' }, { label: '18:30', value: '18:30' },
  { label: '19:00', value: '19:00' }, { label: '19:30', value: '19:30' },
  { label: '20:00', value: '20:00' }, { label: '20:30', value: '20:30' },
  { label: '21:00', value: '21:00' }, { label: '21:30', value: '21:30' },
  { label: '22:00', value: '22:00' }
]}];

const IntervalDropdownSlider = ({ value, onChange }: { value: number, onChange: (val: number) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const valPct = ((value - 10) / 50) * 100; // 10 to 60.
  const isSet = value > 0;
  const colorClass = isSet ? 'text-[var(--color-accent)]' : 'text-[var(--color-primary)]';

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)} 
        className={`px-4 py-2 transition-colors relative flex items-center justify-center gap-1.5 ${isOpen || isSet ? colorClass : 'text-[var(--color-primary)] hover:text-white'}`}
      >
         <Clock className="w-4 h-4" />
         <span className="text-[10px] uppercase font-bold tracking-widest leading-none mt-0.5">{value || 0} min</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-[120%] right-0 mt-2 w-64 bg-[var(--color-bg-dropdown)] backdrop-blur-3xl border border-[var(--color-border-heavy)] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-5 z-[500] animate-in slide-in-from-top-2 fade-in duration-300">
           <div className="flex justify-between items-center mb-6">
             <span className="font-mono text-[9px] uppercase text-[var(--color-text-dimmed)] tracking-[0.3em]">Interval</span>
             <span className="font-serif italic text-xl text-[var(--color-accent)]">{value || 0} <span className="text-[10px] not-italic font-sans uppercase tracking-widest opacity-60">min</span></span>
           </div>
           
           <div className="relative h-8 flex items-center group">
             <div className="absolute inset-x-0 h-[1px] bg-[var(--color-border-heavy)] overflow-hidden rounded-full">
                <div className="h-full bg-[var(--color-accent)]" style={{ width: `${valPct}%` }}></div>
             </div>
             <input 
                type="range" min="10" max="60" value={value || 10} 
                onChange={(e) => onChange(Number(e.target.value))}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="absolute inset-x-0 w-full h-full opacity-0 cursor-pointer z-10"
             />
             <div 
               className={`absolute w-3 h-3 rounded-full bg-[var(--color-accent)] pointer-events-none shadow-[0_0_15px_rgba(227,154,40,0.6)] transition-transform duration-200 ${isFocused ? 'scale-150' : 'group-hover:scale-125'}`}
               style={{ left: `calc(${valPct}% - 6px)` }}
             ></div>
           </div>
        </div>
      )}
    </div>
  );
};


const PlaceOrderPage = ({ cart, menuData }: { cart: Record<string, number>, menuData: any }) => {
  const menuGroupOptions = Object.entries(menuData).map(([category, items]: [string, any]) => ({
    label: category,
    items: items.map((item: any) => ({ 
      label: item.name, 
      value: item.name, 
      desc: item.desc, 
      price: item.price, 
      image: item.image 
    }))
  }));
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const navigate = useNavigate();

  const [dishes, setDishes] = useState(() => {
    const initialDishes = Object.entries(cart).flatMap(([name, count]) => 
      Array(count).fill(null).map((_, i) => ({
        id: Date.now() + Math.random() + i,
        name,
        interval: '15'
      }))
    );
    return initialDishes.length > 0 ? initialDishes : [{ id: Date.now(), name: '', interval: '15' }];
  });
  const [diningContext, setDiningContext] = useState<'dine-in' | 'delivery'>('dine-in');
  const [serveStyle, setServeStyle] = useState('sequential');
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2 People');
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [activeDishId, setActiveDishId] = useState<number | null>(null);
  const [contactMethod, setContactMethod] = useState('Email');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [securityError, setSecurityError] = useState<string | null>(null);

  const addDish = () => setDishes([...dishes, { id: Date.now() + Math.random(), name: '', interval: '15' }]);
  const removeDish = (id: number) => setDishes(dishes.filter(d => d.id !== id));
  const updateDish = (id: number, field: string, val: string) => setDishes(dishes.map(d => d.id === id ? { ...d, [field]: val } : d));

  const validateAddress = (val: string) => {
     setDeliveryAddress(val);
     const vLow = val.toLowerCase();
     if (vLow.includes('jos') || vLow.includes('insecure') || vLow.includes('riot')) {
         setSecurityError("We can't deliver to this location at this time because of insecurity in that area.");
     } else {
         setSecurityError(null);
     }
  };

  useEffect(() => {
    if (hoveredImage) {
      document.body.classList.add('dish-focus-mode');
    } else {
      document.body.classList.remove('dish-focus-mode');
    }
    return () => document.body.classList.remove('dish-focus-mode');
  }, [hoveredImage]);

  return (
    <div className="relative pt-48 pb-32 px-8 min-h-screen">
      {/* GLOBAL BACKGROUND - SHARP & CRYSTAL CLEAR CROSS-FADE */}
      <div className="fixed inset-0 z-0 bg-[var(--color-bg-dark)] pointer-events-none overflow-hidden transition-colors duration-500">
        <AnimatePresence mode="popLayout">
          {hoveredImage && (
            <motion.div
              key={hoveredImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${hoveredImage})` }}
            />
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .beautiful-scrollbar::-webkit-scrollbar { width: 6px; }
        .beautiful-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .beautiful-scrollbar::-webkit-scrollbar-thumb { background: var(--color-border-heavy); border-radius: 10px; }
        .beautiful-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--color-border-light); }
        
        body.dish-focus-mode .dish-focus-hide, 
        body.dish-focus-mode nav, 
        body.dish-focus-mode footer {
            opacity: 0;
            pointer-events: none;
        }
        body.dish-focus-mode .dish-focus-fade-group:not(.is-active) {
            opacity: 0;
            pointer-events: none;
        }
        .dish-focus-hide, .dish-focus-fade-group, nav, footer {
            transition: opacity 0.4s ease-in-out;
        }
      `}</style>

      <div className={`relative z-10 max-w-4xl mx-auto px-6`}>
        <div className="text-center mb-16 mix-blend-difference dish-focus-hide">
          <h1 className="font-serif italic text-5xl md:text-7xl text-[var(--color-text-main)] mb-6 drop-shadow-2xl">Complete Your Journey</h1>
          <p className="font-sans text-lg text-[var(--color-text-muted)] font-light drop-shadow-md">Curate the sequence of your evening.</p>
        </div>
        
        <div className="relative rounded-[3rem] bg-transparent border-none overflow-visible">
          <form className="p-8 md:p-12 flex flex-col gap-12 overflow-visible">

            {/* 1. DINING CONTEXT */}
            <div className="flex flex-col gap-6 dish-focus-hide">
               <div>
                  <h3 className="font-serif text-2xl text-[var(--color-text-main)] mb-1">Dining Context</h3>
                  <p className="font-mono text-[9px] uppercase text-[var(--color-text-dimmed)] tracking-[0.3em]">Where will you be dining?</p>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button" 
                    onClick={() => setDiningContext('dine-in')}
                    className={`p-6 rounded-2xl border transition-all ${diningContext === 'dine-in' ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-xl' : 'bg-[var(--color-bg-overlay)] border-[var(--color-border-light)] text-[var(--color-text-muted)] hover:border-white/20'}`}
                  >
                     <span className="font-serif text-xl block mb-2">Banjue Seat</span>
                     <span className="font-mono text-[9px] uppercase tracking-widest opacity-80">Reserved Dine-In</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setDiningContext('delivery')}
                    className={`p-6 rounded-2xl border transition-all ${diningContext === 'delivery' ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-xl' : 'bg-[var(--color-bg-overlay)] border-[var(--color-border-light)] text-[var(--color-text-muted)] hover:border-white/20'}`}
                  >
                     <span className="font-serif text-xl block mb-2">Delivery</span>
                     <span className="font-mono text-[9px] uppercase tracking-widest opacity-80">Comfort Of Your Vault</span>
                  </button>
               </div>
            </div>

            {/* 2. PACING & FLOW */}
            <div className="flex flex-col gap-6 pt-6 border-t border-[var(--color-border-light)] relative dish-focus-hide" style={{ zIndex: 100 }}>
              <div className="flex flex-col gap-2 relative">
                <label className="font-mono text-[9px] uppercase text-[var(--color-text-dimmed)] tracking-[0.3em]">Pacing & Flow</label>
                <CustomSelect value={serveStyle} onChange={setServeStyle} options={serveStyleOptions} placeholder="-- Select serving style --" />
              </div>
            </div>

            {/* 3. CULINARY PROGRESSION */}
            <div className="flex flex-col gap-6 pt-6 border-t border-[var(--color-border-light)] relative" style={{ zIndex: 90 }}>
              <div className="dish-focus-hide">
                <h3 className="font-serif text-2xl text-[var(--color-text-main)] mb-1">Build your progression</h3>
                <p className="font-mono text-[9px] uppercase text-[var(--color-text-dimmed)] tracking-[0.3em]">Your Sequence</p>
              </div>

              <div className="space-y-4">
                {dishes.map((dish, index) => (
                  <div key={dish.id} className={`flex flex-col md:flex-row gap-4 w-full dish-focus-fade-group ${activeDishId === dish.id ? 'is-active' : ''}`}>
                    <div className={`group flex flex-1 gap-0 items-center bg-[var(--color-bg-overlay)] border border-[var(--color-border-light)] p-2 rounded-2xl focus-within:border-[var(--color-border-heavy)] transition-all relative overflow-visible`} style={{ zIndex: dishes.length - index }}>
                      <div className="font-mono text-[10px] text-[var(--color-text-dimmed)] w-10 text-center select-none font-bold">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="flex-1 min-w-0 pr-2">
                        <CustomSelect 
                          value={dish.name} 
                          onChange={(val: string) => updateDish(dish.id, 'name', val)} 
                          options={menuGroupOptions} 
                          placeholder="-- Select a dish --" 
                          onHoverItem={(img: string | null) => {
                            setHoveredImage(img);
                            setActiveDishId(img ? dish.id : null);
                          }}
                          menuClassName="left-0 w-full"
                        />
                      </div>
                      <div className="flex items-center dish-focus-hide">
                        {serveStyle === 'sequential' && index > 0 && (
                           <IntervalDropdownSlider value={Number(dish.interval)} onChange={(v) => updateDish(dish.id, 'interval', String(v))} />
                        )}
                        {dishes.length > 1 && (
                          <button type="button" onClick={() => removeDish(dish.id)} className="bg-transparent border-none text-[var(--color-text-dimmed)] hover:text-white p-4" aria-label="Remove dish">
                              <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button type="button" onClick={addDish} className="dish-focus-hide bg-[var(--color-primary)]/5 border border-dashed border-[var(--color-primary)]/20 text-[var(--color-primary)] hover:border-[var(--color-primary)]/40 w-full py-3 rounded-full mt-2 transition-transform active:scale-[0.99]">
                  <Plus className="w-3 h-3 mr-2" /> Add next course
                </Button>
              </div>
            </div>

            {/* 4. NUMBER OF GUESTS */}
            <div className="flex flex-col gap-2 pt-6 border-t border-[var(--color-border-light)] relative dish-focus-hide" style={{ zIndex: 80 }}>
              <label className="font-mono text-[9px] uppercase text-[var(--color-text-dimmed)] tracking-[0.3em]">Companions</label>
              <CustomSelect value={guests} onChange={setGuests} options={guestOptions} placeholder="-- Select guests --" variant="dense" />
            </div>

            {/* 5. ARRIVAL TIME & DATE (DYNAMIC) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[var(--color-border-light)] relative dish-focus-hide" style={{ zIndex: 70 }}>
              <div className="flex flex-col gap-2 relative">
                <label className="font-mono text-[9px] uppercase text-[var(--color-text-dimmed)] tracking-[0.3em]">{diningContext === 'delivery' ? 'Delivery Date' : 'Arrival Date'}</label>
                <CustomDatePicker value={date} onChange={setDate} />
              </div>
              <div className="flex flex-col gap-2 relative z-[150]">
                <label className="font-mono text-[9px] uppercase text-[var(--color-text-dimmed)] tracking-[0.3em]">{diningContext === 'delivery' ? 'Delivery Time' : 'Arrival Time'}</label>
                <TimeSelectionDropdown value={time} onChange={setTime} />
              </div>
            </div>

            {/* 6. PERSONAL INFO (NAME) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[var(--color-border-light)] dish-focus-hide">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] uppercase text-[var(--color-text-dimmed)] tracking-[0.3em]">First Name</label>
                <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" className="bg-[var(--color-bg-overlay)] border border-[var(--color-border-light)] rounded-xl py-4 px-5 text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)] transition-all min-h-[56px]" placeholder="Julian" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] uppercase text-[var(--color-text-dimmed)] tracking-[0.3em]">Last Name</label>
                <input value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text" className="bg-[var(--color-bg-overlay)] border border-[var(--color-border-light)] rounded-xl py-4 px-5 text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)] transition-all min-h-[56px]" placeholder="Thorne" />
              </div>
            </div>

            {/* 7. CONTACT INFO WITH SELECTOR */}
            <div className="flex flex-col gap-4 dish-focus-hide">
               <label className="font-mono text-[9px] uppercase text-[var(--color-text-dimmed)] tracking-[0.3em]">Preferred Contact Method</label>
               <div className="grid grid-cols-3 gap-2">
                  {['Email', 'Phone', 'WhatsApp'].map(m => (
                    <button 
                      key={m} type="button" onClick={() => setContactMethod(m)}
                      className={`py-3 rounded-xl border text-[10px] font-sans tracking-widest uppercase transition-all ${contactMethod === m ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' : 'bg-transparent border-[var(--color-border-light)] text-[var(--color-text-muted)] hover:border-[var(--color-border-heavy)]'}`}
                    >
                      {m}
                    </button>
                  ))}
               </div>
               <div className="mt-2">
                  <input 
                    id="contactInputEmailOrTel"
                    type={contactMethod === 'Email' ? 'email' : 'tel'} 
                    className="bg-[var(--color-bg-overlay)] border border-[var(--color-border-light)] rounded-xl py-4 px-5 w-full text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)] transition-all min-h-[56px]" 
                    placeholder={contactMethod === 'Email' ? 'julian@example.com' : '+234 ...'} 
                  />
               </div>
            </div>

            {/* 8. DELIVERY ADDRESS (MOCK VALIDATION) */}
            {diningContext === 'delivery' && (
                <div className="flex flex-col gap-4 pt-6 border-t border-[var(--color-border-light)] animate-in fade-in slide-in-from-top-4 duration-500 dish-focus-hide">
                   <label className="font-mono text-[9px] uppercase text-[var(--color-text-dimmed)] tracking-[0.3em]">Secure Delivery Address</label>
                   
                   <div className="relative">
                      <input 
                        type="text" 
                        value={deliveryAddress}
                        onChange={(e) => validateAddress(e.target.value)}
                        className={`bg-[var(--color-bg-overlay)] border ${securityError ? 'border-red-500/50 focus:border-red-500' : 'border-[var(--color-border-light)] focus:border-[var(--color-primary)]'} rounded-xl py-4 px-5 w-full text-[var(--color-text-main)] outline-none transition-all min-h-[56px]`} 
                        placeholder="Enter full delivery coordinates or street address..." 
                      />
                      {securityError && (
                         <div className="absolute -bottom-8 left-0 text-red-500 text-[10px] font-bold font-sans tracking-wider animate-pulse">
                            {securityError}
                         </div>
                      )}
                   </div>
                   
                   {/* Mock Google Map Embed Style UI */}
                   <div className={`mt-4 w-full h-40 rounded-xl overflow-hidden relative border ${securityError ? 'border-red-500/30' : 'border-white/10'} pointer-events-none`}>
                      <img src="https://picsum.photos/seed/map/800/400?blur=10" alt="Map View" className="w-full h-full object-cover opacity-30 grayscale" />
                      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                         <span className="font-mono text-xs text-white/50 bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md inline-block">
                           Map synchronization active. Area scan online.
                         </span>
                      </div>
                   </div>
                </div>
            )}

            <div className="pt-10 dish-focus-hide">
               <div className="bg-[var(--color-bg-overlay)] backdrop-blur-md p-6 rounded-2xl border border-[var(--color-accent)]/20 relative overflow-hidden mb-8">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-accent)] animate-pulse"></div>
                  <p className="font-sans text-[12px] text-[var(--color-text-muted)] leading-relaxed pl-3 italic">
                    If you are not available within 45 minutes of the speculative time, your order and reservation will be cancelled and you will be refunded only 70% of the total cost.
                  </p>
               </div>
               
               <Button className="w-full border-none text-lg py-6 shadow-[0_30px_60px_rgba(194,77,44,0.4)] hover:shadow-[0_0_30px_var(--color-primary)] transition-shadow font-bold tracking-widest uppercase cursor-pointer" type="button" onClick={() => navigate('/checkout', { state: { firstName, lastName, email: (document.getElementById('contactInputEmailOrTel') as HTMLInputElement)?.value || 'test@example.com', date, time } })}>
                 Confirm Reservation & Journey
               </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = ({ onConfirm }: { onConfirm: (userData: any) => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { firstName, lastName, email, date, time } = location.state || {};

  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const methods = ['Apple Pay', 'Google Pay', 'Mastercard', 'Bank Transfer'];
  
  const handlePayment = async () => {
     setIsProcessing(true);
     await onConfirm({ firstName, lastName, email, date, time });
     navigate('/order-success');
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] pt-32 pb-20 px-4 md:px-8 max-w-xl mx-auto flex flex-col justify-center">
      <h2 className="text-3xl font-serif mb-8 text-[var(--color-text-main)] text-center">Secure Checkout</h2>
      {email && <p className="text-center text-[var(--color-text-dimmed)] mb-8 font-mono text-xs">Checkout for: {email}</p>}
      <div className="space-y-4 mb-10">
        {methods.map(m => (
          <button 
            key={m}
            className={`w-full p-6 text-left rounded-2xl border ${selectedMethod === m ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10' : 'border-[var(--color-border-light)] bg-[var(--color-bg-surface)]'} hover:border-[var(--color-primary)] transition-all flex items-center justify-between`}
            onClick={() => setSelectedMethod(m)}
            disabled={isProcessing}
          >
            <span className="font-sans font-bold text-lg text-[var(--color-text-main)]">{m}</span>
            {selectedMethod === m && <Check className="w-5 h-5 text-[var(--color-primary)]" />}
          </button>
        ))}
      </div>
      <Button 
        className="w-full text-lg py-6 tracking-widest uppercase border-none bg-green-600/80 hover:bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all"
        disabled={!selectedMethod || isProcessing}
        onClick={handlePayment}
      >
        {isProcessing ? 'Processing Authentication & Payment...' : 'Confirm Payment'}
      </Button>
    </div>
  );
};

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] pt-40 pb-20 px-4 flex flex-col items-center justify-center">
       <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
         <Check className="w-12 h-12 animate-in slide-in-from-bottom-5 fade-in duration-500" />
       </div>
       <h2 className="text-4xl font-serif mb-4 text-[var(--color-text-main)] text-center">Payment Verified</h2>
       <p className="text-[var(--color-text-muted)] text-sm uppercase tracking-widest mb-12">Your reservation has been confirmed.</p>
       <div className="w-8 h-8 border-4 border-t-transparent border-[var(--color-primary)] rounded-full animate-spin"></div>
       <p className="mt-4 text-xs font-mono text-[var(--color-text-dimmed)] animate-pulse">Redirecting to Dashboard...</p>
    </div>
  );
};

export default function App() {
  const [isLight, setIsLight] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartPairings, setCartPairings] = useState<Record<string, string[]>>({});
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({
    name: "Alex Thorne",
    email: "alex@example.com",
    password: "password123",
    profilePicture: "https://i.pravatar.cc/150?u=user",
    orders: [] as any[],
    reviews: [] as any[]
  });

  const handleConfirmPayment = async (userData: any) => {
    let totalValue = 0;
    Object.keys(cart).forEach(name => {
         totalValue += (cart[name] * 42000); 
    });

    try {
      const { auth, db } = await import('./firebase');
      const { setDoc, doc, addDoc, collection } = await import('firebase/firestore');

      let userId = auth.currentUser?.uid;
      let email = userData.email || auth.currentUser?.email || 'test@example.com';

      if (!userId) {
         try {
             // If not logged in, prompt Google Login
             const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
             const provider = new GoogleAuthProvider();
             const result = await signInWithPopup(auth, provider);
             userId = result.user.uid;
             email = result.user.email || email;
             
             // Ensure user record is created
             await setDoc(doc(db, 'users', userId), {
                 firstName: result.user.displayName?.split(' ')[0] || userData.firstName || 'Guest',
                 lastName: result.user.displayName?.split(' ').slice(1).join(' ') || userData.lastName || 'User',
                 email: email,
                 createdAt: Date.now(),
                 userId: userId
             }, { merge: true });
             
             await setDoc(doc(db, 'emails', email), { exists: true, userId }, { merge: true });
         } catch (e: any) {
             console.error('Login failed during checkout', e);
             return; // Stop checkout if they don't login
         }
      }

      if (userId) {
         const newOrder = {
             userId,
             date: new Date().toISOString().split('T')[0],
             total: `₦${totalValue.toLocaleString()}`,
             items: Object.keys(cart).length ? Object.keys(cart) : ['Banjue Experience'],
             status: 'Processing',
             createdAt: Date.now()
         };
         const orderRef = await addDoc(collection(db, 'orders'), newOrder);
         
         // Save custom pairings for each item in cart
         for (const dishName of Object.keys(cart)) {
             if (cartPairings[dishName] && cartPairings[dishName].length > 0) {
                 await addDoc(collection(db, 'userPairings'), {
                     userId,
                     dishName,
                     pairings: cartPairings[dishName],
                     createdAt: Date.now(),
                 });
             }
         }

         // Update local state to sync with the ui without reloading everything
         setUserProfile(prev => ({ 
           ...prev, 
           name: `${userData.firstName} ${userData.lastName}`,
           email: email,
           orders: [{ id: orderRef.id, ...newOrder }, ...prev.orders] 
         }));
      }
    } catch (e) {
      console.error(e);
    }
    
    setCart({}); // clear cart
  };

  useEffect(() => {
    (async () => {
      try {
        const { auth, db } = await import('./firebase');
        const { onAuthStateChanged } = await import('firebase/auth');
        const { collection, getDocs, query, where, orderBy } = await import('firebase/firestore');

        onAuthStateChanged(auth, async (currentUser) => {
           if (currentUser) {
               // Load orders
               try {
                 const oSnap = await getDocs(query(collection(db, 'orders'), where('userId', '==', currentUser.uid)));
                 const fetchedOrders = oSnap.docs.map(d => ({id: d.id, ...d.data()})).sort((a: any, b: any) => b.createdAt - a.createdAt);
                 
                 const pSnap = await getDocs(query(collection(db, 'userPairings'), where('userId', '==', currentUser.uid)));
                 const fetchedPairings = pSnap.docs.map(d => ({id: d.id, ...d.data()})).sort((a: any, b: any) => b.createdAt - a.createdAt);
                 
                 setUserProfile(prev => ({
                     ...prev,
                     name: currentUser.displayName || prev.name,
                     email: currentUser.email || prev.email,
                     orders: fetchedOrders,
                     pairings: fetchedPairings
                 }));

               } catch (e) {
                 console.error('Failed to fetch user data for dashboard', e);
               }
           }
        });
      } catch (e) {}
    })();
  }, []);

  const handleLogin = (email: string) => {
    if (email === 'admin@banjue.com') {
      const u = { email, role: 'ADMIN' };
      setUser(u);
      navigate('/admin');
    } else {
      const u = { email, role: 'CUSTOMER' };
      setUser(u);
      navigate('/dashboard');
    }
  };

  // --- MOCK DATABASE STATE ---
  const [menuData, setMenuData] = useState(() => {
    const saved = localStorage.getItem('banjue_menu_data');
    return saved ? JSON.parse(saved) : initialMenuItems;
  });

  useEffect(() => {
    import('./firebase').then(({ db }) => {
       import('firebase/firestore').then(({ doc, getDoc }) => {
           getDoc(doc(db, 'system', 'menuData')).then((snap) => {
               if (snap.exists()) {
                   setMenuData(snap.data());
               }
           }).catch(console.error);
       });
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('banjue_menu_data', JSON.stringify(menuData));
    import('./firebase').then(({ db }) => {
       import('firebase/firestore').then(({ doc, setDoc }) => {
           setDoc(doc(db, 'system', 'menuData'), menuData).catch(console.error);
       });
    });
  }, [menuData]);

  const updateCart = (name: string, delta: number) => {
    setCart(prev => {
      const current = prev[name] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [name]: next };
    });
  };

  const updateCartPairing = (dishName: string, pairings: string[]) => {
    setCartPairings(prev => ({ ...prev, [dishName]: pairings }));
  };

  const cartCount = (Object.values(cart) as number[]).reduce((a, b) => a + b, 0);

  useEffect(() => {
    if (isLight) document.documentElement.classList.add('light');
    else document.documentElement.classList.remove('light');
  }, [isLight]);

  const location = useLocation();

  const prevLocationRef = useRef(location.pathname);
  const transitionTypeRef = useRef('fade');

  if (prevLocationRef.current !== location.pathname) {
    const p = prevLocationRef.current;
    const c = location.pathname;
    const isMenuToProduct = (p === '/menu' && c.startsWith('/product/')) || 
                            (p.startsWith('/product/') && c === '/menu');
    const isDashboardTransition = c === '/dashboard' || p === '/dashboard';
    
    transitionTypeRef.current = (isMenuToProduct || isDashboardTransition) ? 'slide' : 'fade';
    prevLocationRef.current = c;
  }
  
  const animType = transitionTypeRef.current;

  return (
    <div className={`bg-[var(--color-bg-dark)] min-h-screen text-[var(--color-text-main)] transition-colors duration-300 relative`}>
      <NoiseOverlay />
      <ScrollToTop />
      <Navbar toggleTheme={() => setIsLight(!isLight)} isLight={isLight} user={user} />
      <main className="grid grid-cols-1 grid-rows-1">
        <AnimatePresence mode="popLayout" custom={animType}>
          <motion.div 
            key={location.pathname} 
            className="col-start-1 row-start-1 w-full"
            custom={animType}
            variants={{
              initial: (type) => type === 'slide' ? { x: "-100%", opacity: 0 } : { opacity: 0, x: 0 },
              animate: (type) => type === 'slide' 
                ? { x: 0, opacity: 1, transition: { duration: 1.1, ease: [0.4, 0, 0.2, 1] } } 
                : { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
              exit: (type) => type === 'slide' 
                ? { x: "100%", opacity: 0, transition: { duration: 1.1, ease: [0.4, 0, 0.2, 1] } } 
                : { opacity: 0, x: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
            }}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
              <Route path="/menu" element={<MenuPage cart={cart} updateCart={updateCart} cartCount={cartCount} menuData={menuData} />} />
              <Route path="/product/:name" element={<ProductDetailPage menuData={menuData} cart={cart} updateCart={updateCart} cartPairings={cartPairings} updateCartPairing={updateCartPairing} />} />
              <Route path="/place-order" element={<PlaceOrderPage cart={cart} menuData={menuData} />} />
              <Route path="/checkout" element={<CheckoutPage onConfirm={handleConfirmPayment} />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/dashboard" element={<UserDashboard userProfile={userProfile} setUserProfile={setUserProfile} />} />
              <Route path="/admin" element={<AdminCMS menuData={menuData} setMenuData={setMenuData} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
