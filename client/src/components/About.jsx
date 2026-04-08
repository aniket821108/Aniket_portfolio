import { motion } from 'framer-motion';
import { Code2, Brain, Cpu } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionTitle from './ui/SectionTitle';
import GlassCard from './ui/GlassCard';

const TRAITS = [
  {
    icon: Code2,
    title: 'Full-Stack Engineering',
    desc: 'Building scalable MERN applications with clean architecture, RESTful APIs, and intuitive user experiences.',
  },
  {
    icon: Brain,
    title: 'Machine Learning',
    desc: 'Designing predictive pipelines and time-series models for real industrial applications like bearing health monitoring.',
  },
  {
    icon: Cpu,
    title: 'Systems Integration',
    desc: 'Bridging ML microservices with production web infrastructure to ship end-to-end intelligent products.',
  },
];

export default function About() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="about" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index={1} label="About" inView={inView} />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-body text-text-secondary text-lg leading-relaxed mb-6">
              I'm{' '}
              <span className="text-text-primary font-semibold">Aniket Kumar</span>, a
              software developer at the intersection of Full-Stack Web Engineering and
              Machine Learning. I have a deep passion for building systems that are not
              just functional, but genuinely intelligent.
            </p>
            <p className="font-body text-text-secondary text-lg leading-relaxed mb-6">
              During my ML internship at{' '}
              <span className="text-accent-light font-medium">IIT Guwahati</span>, I
              developed predictive maintenance pipelines using Python and time-series
              vibration sensor data — training classifiers to detect bearing degradation
              stages and regression models to estimate Remaining Useful Life (RUL).
            </p>
            <p className="font-body text-text-secondary text-lg leading-relaxed mb-10">
              On the web side, I architect full-stack MERN applications with clean
              microservices patterns — including integrating Python ML models directly
              into production admin dashboards.
            </p>

            {/* Stat row */}
            <div className="flex gap-8">
              {[
                { value: '2+', label: 'Years Coding' },
                { value: '2', label: 'Major Projects' },
                { value: '2', label: 'Hackathon Honours' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display font-bold text-3xl gradient-text">{value}</p>
                  <p className="font-body text-text-muted text-sm mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Trait cards */}
          <div className="flex flex-col gap-4">
            {TRAITS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassCard className="p-5 flex gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon size={18} className="text-accent-light" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-text-primary mb-1">{title}</h3>
                    <p className="font-body text-text-secondary text-sm leading-relaxed">{desc}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
