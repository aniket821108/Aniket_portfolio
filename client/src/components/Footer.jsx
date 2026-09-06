import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

const LINKS = [
  {
    icon: Github,
    href: 'https://github.com/aniket821108',
    label: 'GitHub',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/aniketkumar821108',
    label: 'LinkedIn',
  },
  {
    icon: Mail,
    href: 'mailto:aniketkumar821108@gmail.com',
    label: 'Email',
  },
];

const SITE_LINKS = [
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Experience', to: 'experience' },
  { label: 'Contact', to: 'contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-14 px-6 border-t border-border relative">
      <div className="max-w-6xl mx-auto">
        {/* Top row — logo + nav + socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Logo */}
          <Link to="hero" smooth duration={700} className="cursor-pointer select-none">
            <span className="font-display font-extrabold text-xl tracking-tight">
              <span className="gradient-text">AK</span>
              <span className="text-text-muted font-mono text-xs ml-2">
                {'{ dev }'}
              </span>
            </span>
          </Link>

          {/* Quick nav */}
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {SITE_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  smooth
                  duration={600}
                  offset={-80}
                  className="font-body text-sm text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-text-muted hover:text-accent-light hover:border-accent/20 transition-all duration-300"
                aria-label={label}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border-light to-transparent mb-6" />

        {/* Bottom row — copyright + back to top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-text-muted flex items-center gap-1.5 text-center">
            © {year} Aniket Kumar · Built with React & Tailwind
            <Heart size={11} className="text-accent fill-accent" />
          </p>

          <Link
            to="hero"
            smooth
            duration={800}
            className="cursor-pointer group inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-accent-light transition-colors"
          >
            Back to top
            <span className="w-7 h-7 rounded-lg glass flex items-center justify-center group-hover:border-accent/20 transition-all">
              <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
