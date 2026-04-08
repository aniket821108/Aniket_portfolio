import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Github, Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="hero" smooth duration={700} className="cursor-pointer select-none">
          <span className="font-display font-extrabold text-lg tracking-tight">
            <span className="gradient-text">AK</span>
          </span>
        </Link>

        <p className="font-mono text-xs text-text-muted flex items-center gap-1.5 text-center">
          © {year} Aniket Kumar · Built with React &amp; Tailwind
          <Heart size={11} className="text-accent fill-accent" />
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/aniket821108"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent-light transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}
