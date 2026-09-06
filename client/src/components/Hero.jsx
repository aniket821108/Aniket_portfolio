import { useState, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import {
  ArrowDown,
  Github,
  Mail,
  Linkedin,
  Terminal,
  Sparkles,
  FileDown,
} from 'lucide-react';

// Lazy-load the 3D scene so it doesn't block first paint
const HeroScene = lazy(() => import('./three/HeroScene'));

/* ── animation variants ─────────────────────────── */
const stagger = {
  animate: { transition: { staggerChildren: 0.11 } },
};
const fadeUp = {
  initial: { y: 48, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── rotating roles for typewriter ──────────────── */
const ROLES = [
  'Full-Stack Engineer',
  'Machine Learning',
  'Systems Builder',
  'Problem Solver',
];

function useTypewriter(words, typingMs = 80, pauseMs = 2200, deleteMs = 45) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplay(word.substring(0, charIdx + 1));
          setCharIdx((c) => c + 1);
          if (charIdx + 1 === word.length) {
            setTimeout(() => setIsDeleting(true), pauseMs);
          }
        } else {
          setDisplay(word.substring(0, charIdx - 1));
          setCharIdx((c) => c - 1);
          if (charIdx <= 1) {
            setIsDeleting(false);
            setWordIdx((w) => (w + 1) % words.length);
          }
        }
      },
      isDeleting ? deleteMs : typingMs
    );

    return () => clearTimeout(timeout);
  }, [charIdx, isDeleting, wordIdx, words, typingMs, pauseMs, deleteMs]);

  return display;
}

/* ── social links ───────────────────────────────── */
const SOCIAL = [
  { icon: Github, href: 'https://github.com/aniket821108', label: 'GitHub' },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/aniket-kumar-1225a7284/',
    label: 'LinkedIn',
  },
  {
    icon: Mail,
    href: 'mailto:aniketkumar821108@gmail.com',
    label: 'Email',
  },
];

/* ── component ──────────────────────────────────── */
export default function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-12 overflow-hidden"
    >
      {/* 3D Background — lazy loaded with CSS orbs as fallback */}
      <Suspense
        fallback={
          <>
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[140px] animate-pulse-slow pointer-events-none" />
            <div
              className="absolute bottom-1/4 right-1/5 w-[350px] h-[350px] rounded-full bg-cyan-accent/8 blur-[120px] animate-pulse-slow pointer-events-none"
              style={{ animationDelay: '2.5s' }}
            />
          </>
        }
      >
        <HeroScene />
      </Suspense>

      {/* Radial glow behind text */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-accent/8 blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div variants={stagger} initial="initial" animate="animate">
          {/* Status badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 glass px-5 py-2.5 rounded-full mb-10 text-sm font-mono text-accent-light border border-accent/15"
          >
            <Terminal size={12} className="text-accent" />
            <span>Available for opportunities</span>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </motion.div>

          {/* Name */}
          <motion.div variants={fadeUp}>
            <h1 className="font-display font-extrabold tracking-tight leading-[0.9] mb-6">
              <span className="block text-7xl md:text-9xl gradient-text">
                Aniket
              </span>
              <span className="block text-7xl md:text-9xl text-text-primary">
                Kumar
              </span>
            </h1>
          </motion.div>

          {/* Role — typewriter */}
          <motion.div
            variants={fadeUp}
            className="font-display text-lg md:text-2xl text-text-secondary font-medium mb-8 tracking-wider h-8 md:h-10"
          >
            <span className="gradient-text font-semibold">{typed}</span>
            <span className="inline-block w-[2px] h-5 md:h-6 bg-accent-light ml-1 animate-pulse align-middle" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="max-w-2xl mx-auto font-body text-base md:text-lg text-text-secondary leading-relaxed mb-12"
          >
            I build intelligent, end-to-end digital products — bridging
            production-grade web engineering with predictive ML systems that
            solve real-world problems.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <Link to="projects" smooth duration={700} offset={-80}>
              <button className="group px-8 py-3.5 bg-accent hover:bg-accent/85 text-white rounded-xl font-body font-semibold transition-all duration-300 shadow-accent hover:shadow-accent hover:scale-105 active:scale-95 flex items-center gap-2">
                <Sparkles
                  size={15}
                  className="group-hover:rotate-12 transition-transform"
                />
                View Projects
              </button>
            </Link>
            <Link to="contact" smooth duration={700} offset={-80}>
              <button className="px-8 py-3.5 glass hover:border-accent/30 text-text-secondary hover:text-text-primary rounded-xl font-body font-semibold transition-all duration-300">
                Get In Touch
              </button>
            </Link>
            <a
              href="https://drive.google.com/drive/u/0/folders/1yghJTbs11AH3NEi8wv9HZCkAfKc5MiWD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 glass hover:border-cyan-accent/30 text-text-secondary hover:text-cyan-accent rounded-xl font-body font-semibold transition-all duration-300 group"
            >
              <FileDown
                size={15}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
              Resume
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-6"
          >
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-text-muted hover:text-accent-light transition-colors duration-200 text-sm font-mono group"
              >
                <Icon
                  size={15}
                  className="group-hover:scale-110 transition-transform"
                />
                {label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <Link
          to="about"
          smooth
          duration={600}
          offset={-80}
          className="cursor-pointer flex flex-col items-center gap-2 text-text-muted hover:text-accent-light transition-colors"
        >
          <span className="font-mono text-[10px] tracking-[0.3em]">
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <ArrowDown size={13} />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
