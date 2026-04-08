import { motion } from 'framer-motion';
import { Trophy, Star } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionTitle from './ui/SectionTitle';

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    badge: 'Nominee',
    title: 'Smart India Hackathon 2024',
    desc: "Selected as a nominee in India's largest national-level hackathon, organised by the Government of India. Competed against thousands of student teams from institutions across the country, showcasing a tech solution with real-world impact.",
    accent: 'from-yellow-500/20 to-orange-500/10',
    iconColor: 'text-yellow-400',
    iconBg: 'bg-yellow-500/10 group-hover:bg-yellow-500/20',
    badgeColor: 'text-yellow-400',
  },
  {
    icon: Star,
    badge: 'Finalist',
    title: 'Sci-Arena Hackathon',
    desc: 'Reached the finals of the Sci-Arena Hackathon, demonstrating strong technical problem-solving, rapid prototyping skills, and the ability to build and present a complete project under competitive pressure and tight time constraints.',
    accent: 'from-cyan-accent/20 to-blue-500/10',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10 group-hover:bg-cyan-500/20',
    badgeColor: 'text-cyan-accent',
  },
];

export default function Achievements() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="achievements" ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index={5} label="Achievements" inView={inView} />

        <div className="grid md:grid-cols-2 gap-6">
          {ACHIEVEMENTS.map(({ icon: Icon, badge, title, desc, accent, iconColor, iconBg, badgeColor }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-8 hover:border-white/10 transition-all duration-300 group relative overflow-hidden"
            >
              {/* bg accent on hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${accent} pointer-events-none rounded-2xl`}
              />
              <div className="relative">
                <div
                  className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-5 transition-colors duration-300`}
                >
                  <Icon size={22} className={iconColor} />
                </div>
                <p className={`font-mono text-xs tracking-widest mb-1.5 ${badgeColor}`}>
                  {badge}
                </p>
                <h3 className="font-display text-lg md:text-xl font-bold text-text-primary mb-3">
                  {title}
                </h3>
                <p className="font-body text-text-secondary text-sm leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
