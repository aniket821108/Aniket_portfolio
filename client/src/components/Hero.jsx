import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowDown, Github, Mail, Terminal, Sparkles } from 'lucide-react';

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

const SOCIAL = [
  { icon: Github, href: 'https://github.com/aniket821108', label: 'GitHub' },
  { icon: Mail, href: 'mailto:aniket@example.com', label: 'Email' },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[140px] animate-pulse-slow pointer-events-none" />
      <div
        className="absolute bottom-1/4 right-1/5 w-[350px] h-[350px] rounded-full bg-cyan-accent/8 blur-[120px] animate-pulse-slow pointer-events-none"
        style={{ animationDelay: '2.5s' }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-[200px] h-[200px] rounded-full bg-accent/6 blur-[80px] animate-pulse-slow pointer-events-none"
        style={{ animationDelay: '1.2s' }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div variants={stagger} initial="initial" animate="animate">

          {/* Status badge */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 glass px-5 py-2.5 rounded-full mb-10 text-sm font-mono text-accent-light border border-accent/15">
            <Terminal size={12} className="text-accent" />
            <span>Available for opportunities</span>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </motion.div>

          {/* Name */}
          <motion.div variants={fadeUp}>
            <h1 className="font-display font-extrabold tracking-tight leading-[0.9] mb-6">
              <span className="block text-7xl md:text-9xl gradient-text">Aniket</span>
              <span className="block text-7xl md:text-9xl text-text-primary">Kumar</span>
            </h1>
          </motion.div>

          {/* Role */}
          <motion.p
            variants={fadeUp}
            className="font-display text-lg md:text-2xl text-text-secondary font-medium mb-8 tracking-wider"
          >
            Full-Stack Engineer
            <span className="mx-3 text-border-light">×</span>
            Machine Learning
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="max-w-2xl mx-auto font-body text-base md:text-lg text-text-secondary leading-relaxed mb-12"
          >
            I build intelligent, end-to-end digital products — bridging production-grade web
            engineering with predictive ML systems that solve real-world problems.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <Link to="projects" smooth duration={700} offset={-80}>
              <button className="group px-8 py-3.5 bg-accent hover:bg-accent/85 text-white rounded-xl font-body font-semibold transition-all duration-300 shadow-accent hover:shadow-accent hover:scale-105 active:scale-95 flex items-center gap-2">
                <Sparkles size={15} className="group-hover:rotate-12 transition-transform" />
                View Projects
              </button>
            </Link>
            <Link to="contact" smooth duration={700} offset={-80}>
              <button className="px-8 py-3.5 glass hover:border-accent/30 text-text-secondary hover:text-text-primary rounded-xl font-body font-semibold transition-all duration-300">
                Get In Touch
              </button>
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-6">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-text-muted hover:text-accent-light transition-colors duration-200 text-sm font-mono group"
              >
                <Icon size={15} className="group-hover:scale-110 transition-transform" />
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
          <span className="font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ArrowDown size={13} />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
