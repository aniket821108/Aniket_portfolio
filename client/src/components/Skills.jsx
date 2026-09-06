import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionTitle from './ui/SectionTitle';

/* ─── skill data with devicon classes ──────────── */
const SKILL_GROUPS = [
  {
    label: 'Languages',
    color: 'from-violet-500 to-purple-500',
    borderHover: 'hover:border-violet-500/30',
    items: [
      { name: 'Python', icon: 'devicon-python-plain colored' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'C++', icon: 'devicon-cplusplus-plain colored' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
    ],
  },
  {
    label: 'Web & Backend',
    color: 'from-accent to-blue-500',
    borderHover: 'hover:border-accent/30',
    items: [
      { name: 'React', icon: 'devicon-react-original colored' },
      { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
      { name: 'Express', icon: 'devicon-express-original' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain colored' },
      { name: 'Tailwind', icon: 'devicon-tailwindcss-original colored' },
      { name: 'Django', icon: 'devicon-django-plain' },
    ],
  },
  {
    label: 'Machine Learning',
    color: 'from-cyan-accent to-teal-500',
    borderHover: 'hover:border-cyan-accent/30',
    items: [
      { name: 'Scikit-Learn', icon: 'devicon-scikitlearn-plain colored' },
      { name: 'Pandas', icon: 'devicon-pandas-plain colored' },
      { name: 'NumPy', icon: 'devicon-numpy-plain colored' },
      { name: 'Flask', icon: 'devicon-flask-original' },
      { name: 'Matplotlib', icon: 'devicon-matplotlib-plain colored' },
    ],
  },
  {
    label: 'Tools & DevOps',
    color: 'from-orange-500 to-amber-500',
    borderHover: 'hover:border-orange-500/30',
    items: [
      { name: 'Git', icon: 'devicon-git-plain colored' },
      { name: 'GitHub', icon: 'devicon-github-original' },
      { name: 'Linux', icon: 'devicon-linux-plain' },
      { name: 'VS Code', icon: 'devicon-vscode-plain colored' },
      { name: 'Postman', icon: 'devicon-postman-plain colored' },
      { name: 'Docker', icon: 'devicon-docker-plain colored' },
    ],
  },
];

function SkillCard({ name, icon, inView, delay, borderHover }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`glass rounded-xl p-4 flex flex-col items-center gap-3 group cursor-default ${borderHover} transition-all duration-300 hover:bg-surface-2/50`}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
    >
      <i
        className={`${icon} text-3xl transition-transform duration-300 group-hover:scale-110`}
        style={{ filter: icon.includes('colored') ? 'none' : 'brightness(0.7) invert(0.8)' }}
      />
      <span className="font-mono text-xs text-text-secondary group-hover:text-text-primary transition-colors">
        {name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section id="skills" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index={2} label="Skills" inView={inView} />

        <div className="grid md:grid-cols-2 gap-8">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: gi * 0.12,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass rounded-2xl p-7"
            >
              {/* Category header */}
              <h3 className="font-display font-semibold text-text-primary mb-5 flex items-center gap-2.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${group.color} flex-shrink-0`}
                />
                {group.label}
              </h3>

              {/* Skills grid */}
              <div className="grid grid-cols-3 gap-3">
                {group.items.map((skill, si) => (
                  <SkillCard
                    key={skill.name}
                    name={skill.name}
                    icon={skill.icon}
                    inView={inView}
                    delay={gi * 0.08 + si * 0.05}
                    borderHover={group.borderHover}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
