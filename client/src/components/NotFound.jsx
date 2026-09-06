import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="noise relative min-h-screen bg-background flex items-center justify-center px-6">
      {/* Background effects */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="fixed inset-0 bg-hero-gradient pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-md"
      >
        {/* 404 number */}
        <h1 className="font-display font-extrabold text-8xl md:text-9xl gradient-text mb-4 leading-none">
          404
        </h1>

        <h2 className="font-display text-xl md:text-2xl font-bold text-text-primary mb-4">
          Page Not Found
        </h2>

        <p className="font-body text-text-secondary text-base leading-relaxed mb-10">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/"
            className="group px-8 py-3.5 bg-accent hover:bg-accent/85 text-white rounded-xl font-body font-semibold transition-all duration-300 shadow-accent-sm hover:shadow-accent hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Home size={15} />
            Go Home
          </a>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3.5 glass hover:border-accent/30 text-text-secondary hover:text-text-primary rounded-xl font-body font-semibold transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeft size={15} />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
