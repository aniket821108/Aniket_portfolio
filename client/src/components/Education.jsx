import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionTitle from './ui/SectionTitle';

const EDUCATION = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Your University Name',
    period: '2022 – 2026',
    location: 'Your City, India',
    highlights: [
      'Relevant Coursework: Data Structures & Algorithms, Machine Learning, Database Systems, Operating Systems, Computer Networks, Compiler Design',
      'Active member of coding club and ML research group',
    ],
    tags: ['DSA', 'Machine Learning', 'DBMS', 'OS', 'Computer Networks', 'Compiler Design'],
  },
];

export default function Education() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="education" ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index={5} label="Education" inView={inView} />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-7 top-2 bottom-8 w-px bg-gradient-to-b from-cyan-accent/70 via-cyan-accent/25 to-transparent" />

          {EDUCATION.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: 0.2 + i * 0.1,
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative pl-8 md:pl-24 pb-4"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-4px] md:left-[24px] top-1.5 w-3.5 h-3.5 rounded-full bg-cyan-accent shadow-[0_0_20px_rgba(34,211,238,0.3)] border-2 border-background" />

              <div className="glass rounded-2xl p-7 md:p-9 hover:border-cyan-accent/20 transition-all duration-300 group">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <GraduationCap size={16} className="text-cyan-accent" />
                      <span className="font-mono text-xs text-cyan-accent/70 tracking-widest">
                        EDUCATION
                      </span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary">
                      {edu.degree}
                    </h3>
                    <p className="text-accent-light font-body font-medium text-sm mt-1">
                      {edu.institution}
                    </p>
                  </div>

                  <div className="flex flex-row md:flex-col gap-3 md:gap-1.5 md:text-right flex-shrink-0">
                    <span className="inline-flex items-center gap-1.5 text-text-muted text-sm font-mono">
                      <Calendar size={12} />
                      {edu.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-text-muted text-sm font-body">
                      <MapPin size={12} />
                      {edu.location}
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <ul className="flex flex-col gap-3 mb-6">
                  {edu.highlights.map((h, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.35 + j * 0.07, duration: 0.5 }}
                      className="flex gap-3 text-text-secondary font-body text-sm leading-relaxed"
                    >
                      <BookOpen
                        size={14}
                        className="flex-shrink-0 text-cyan-accent mt-[3px]"
                      />
                      {h}
                    </motion.li>
                  ))}
                </ul>

                {/* Course tags */}
                <div className="flex flex-wrap gap-2">
                  {edu.tags.map((t) => (
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
