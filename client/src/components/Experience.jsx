import { motion } from 'framer-motion';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionTitle from './ui/SectionTitle';

const EXPERIENCES = [
  {
    role: 'Machine Learning Intern',
    company: 'Indian Institute of Technology Guwahati',
    shortCompany: 'IIT Guwahati',
    period: '2024',
    location: 'Guwahati, Assam',
    url: 'https://www.iitg.ac.in',
    type: 'Internship',
    highlights: [
      'Developed end-to-end ML pipelines for Predictive Maintenance using time-series vibration sensor data from industrial bearings.',
      'Built multi-class classifiers (Random Forest, SVM, XGBoost) to detect four stages of bearing health degradation with high accuracy.',
      'Estimated Remaining Useful Life (RUL) of industrial bearings using regression models on extracted signal features.',
      'Performed advanced feature engineering: FFT-based frequency analysis, statistical moments (RMS, kurtosis, skewness), and envelope analysis.',
      'Developed a real-time monitoring dashboard using Flask + Matplotlib, displaying health stage predictions and maintenance alerts.',
    ],
    tags: ['Python', 'Scikit-Learn', 'XGBoost', 'Pandas', 'NumPy', 'SciPy', 'Flask', 'Time-Series', 'Signal Processing'],
  },
];

export default function Experience() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="experience" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index={4} label="Experience" inView={inView} />

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-0 md:left-7 top-2 bottom-8 w-px bg-gradient-to-b from-accent/70 via-accent/25 to-transparent" />

          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-8 md:pl-24 pb-4"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-4px] md:left-[24px] top-1.5 w-3.5 h-3.5 rounded-full bg-accent shadow-accent-sm border-2 border-background" />

              <div className="glass rounded-2xl p-7 md:p-9 hover:border-accent/20 transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-6">
                  <div>
                    <span className="inline-block font-mono text-xs text-accent/70 tracking-widest mb-1">
                      {exp.type}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary">
                      {exp.role}
                    </h3>
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent-light font-body font-medium text-sm mt-1 hover:underline underline-offset-2"
                    >
                      {exp.shortCompany}
                      <ExternalLink size={11} />
                    </a>
                  </div>

                  <div className="flex flex-row md:flex-col gap-3 md:gap-1.5 md:text-right flex-shrink-0">
                    <span className="inline-flex items-center gap-1.5 text-text-muted text-sm font-mono">
                      <Calendar size={12} />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-text-muted text-sm font-body">
                      <MapPin size={12} />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="flex flex-col gap-3 mb-6">
                  {exp.highlights.map((h, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.35 + j * 0.07, duration: 0.5 }}
                      className="flex gap-3 text-text-secondary font-body text-sm leading-relaxed"
                    >
                      <span className="flex-shrink-0 text-accent mt-[3px]">▸</span>
                      {h}
                    </motion.li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-3 py-1 rounded-full bg-surface-2 text-text-muted border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
