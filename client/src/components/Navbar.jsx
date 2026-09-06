import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Menu, X, Github, FileDown } from 'lucide-react';

const RESUME_URL = 'https://drive.google.com/file/d/1-lhUbFMlgic3UXMZFDqSfXojE0P5Ybw-/view';

const NAV_LINKS = [
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Experience', to: 'experience' },
  { label: 'Education', to: 'education' },
  { label: 'Achievements', to: 'achievements' },
  { label: 'Contact', to: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-glass py-3' : 'py-5 bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="hero" smooth duration={600} className="cursor-pointer select-none flex-shrink-0">
          <span className="font-display font-extrabold text-xl tracking-tight">
            <span className="gradient-text">AK</span>
            <span className="text-text-muted font-mono text-xs ml-2">{'{ dev }'}</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                smooth
                duration={600}
                offset={-80}
                spy
                activeClass="!text-text-primary"
                className="font-body text-sm text-text-secondary hover:text-text-primary transition-colors duration-200 cursor-pointer tracking-wide relative group px-3 py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-3 right-3 h-px bg-accent-light scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </li>
          ))}

          {/* Resume */}
          <li className="ml-2">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg glass text-sm text-accent hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 font-medium"
            >
              <FileDown size={13} />
              Resume
            </a>
          </li>

          {/* GitHub */}
          <li>
            <a
              href="https://github.com/aniket821108"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg glass text-sm text-text-secondary hover:text-text-primary hover:border-accent/30 transition-all duration-300"
            >
              <Github size={14} />
              GitHub
            </a>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          className="lg:hidden text-text-secondary hover:text-text-primary transition-colors p-1"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden glass border-t border-border"
          >
            <ul className="flex flex-col px-6 py-5 gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth
                    duration={600}
                    offset={-80}
                    spy
                    activeClass="!text-accent-light"
                    onClick={() => setMobileOpen(false)}
                    className="font-body text-base text-text-secondary hover:text-text-primary cursor-pointer transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {/* Mobile Resume + GitHub */}
              <li className="border-t border-border pt-4 flex items-center gap-4">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors text-sm font-medium"
                >
                  <FileDown size={14} />
                  Resume
                </a>
                <a
                  href="https://github.com/aniket821108"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-light transition-colors text-sm"
                >
                  <Github size={14} />
                  GitHub
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
