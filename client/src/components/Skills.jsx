import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionTitle from './ui/SectionTitle';
import { fetchSkills } from '../utils/api';

const FALLBACK_SKILLS = {
  language: [
    { name: 'Python', proficiency: 90 },
    { name: 'JavaScript (ES6+)', proficiency: 88 },
    { name: 'C++', proficiency: 85 },
  ],
  web: [
    { name: 'React.js', proficiency: 88 },
    { name: 'Node.js', proficiency: 85 },
    { name: 'Express.js', proficiency: 85 },
    { name: 'MongoDB', proficiency: 82 },
    { name: 'Tailwind CSS', proficiency: 90 },
    { name: 'Django', proficiency: 75 },
  ],
  ml: [
    { name: 'Scikit-Learn', proficiency: 87 },
    { name: 'Pandas', proficiency: 90 },
    { name: 'NumPy', proficiency: 88 },
    { name: 'XGBoost', proficiency: 78 },
  ],
};

const CATEGORY_META = {
  language: { label: 'Languages', color: 'from-violet-500 to-purple-500' },
  web: { label: 'Web & Backend', color: 'from-accent to-blue-500' },
  ml: { label: 'Machine Learning', color: 'from-cyan-accent to-teal-500' },
};

function SkillBar({ name, proficiency, inView, delay, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-body text-sm text-text-secondary">{name}</span>
        <span className="font-mono text-xs text-text-muted">{proficiency}%</span>
      </div>
      <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${proficiency}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.15, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState(null);
  const { ref, inView } = useScrollAnimation();

  useEffect(() => {
    fetchSkills()
      .then(({ data }) => {
        const grouped = {};
        (data.data || []).forEach((s) => {
          if (!grouped[s.category]) grouped[s.category] = [];
          grouped[s.category].push(s);
        });
        if (Object.keys(grouped).length) setSkills(grouped);
      })
      .catch(() => {}); // silently use fallback
  }, []);

  const displaySkills = skills || FALLBACK_SKILLS;

  return (
    <section id="skills" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index={2} label="Skills" inView={inView} />

        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(displaySkills).map(([category, items], ci) => {
            const meta = CATEGORY_META[category] || { label: category, color: 'from-accent to-cyan-accent' };
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: ci * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-2xl p-7 hover:border-accent/20 transition-all duration-300"
              >
                <h3 className="font-display font-semibold text-text-primary mb-6 flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${meta.color} flex-shrink-0`} />
                  {meta.label}
                </h3>
                <div className="flex flex-col gap-5">
                  {items.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      proficiency={skill.proficiency}
                      inView={inView}
                      delay={ci * 0.08 + si * 0.07}
                      color={meta.color}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
