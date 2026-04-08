import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Layers, Brain, ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionTitle from './ui/SectionTitle';
import { fetchProjects } from '../utils/api';

const FALLBACK = [
  {
    _id: '1',
    title: 'E-Shop — AI Powered E-Commerce',
    category: 'fullstack',
    featured: true,
    description:
      'MERN Stack e-commerce platform with microservices architecture. Integrated a Python-based ML churn prediction model into a Role-Based Admin Dashboard that flags at-risk customers in real-time.',
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Python', 'Scikit-Learn', 'Redux', 'Tailwind CSS'],
    githubUrl: 'https://github.com/aniket821108',
  },
  {
    _id: '2',
    title: 'Predictive Maintenance System',
    category: 'ml',
    featured: true,
    description:
      'End-to-end ML pipeline classifying bearing health stages and estimating Remaining Useful Life (RUL) from time-series vibration sensor data, with a real-time monitoring dashboard.',
    techStack: ['Python', 'Scikit-Learn', 'XGBoost', 'Pandas', 'NumPy', 'SciPy', 'Flask', 'Matplotlib'],
    githubUrl: 'https://github.com/aniket821108',
  },
];

const CATEGORY_ICON = { fullstack: Layers, ml: Brain };
const CATEGORY_LABEL = { fullstack: 'Full-Stack', ml: 'Machine Learning' };
const CATEGORY_COLOR = {
  fullstack: 'from-accent/20 to-blue-500/10 border-accent/20',
  ml: 'from-cyan-accent/20 to-teal-500/10 border-cyan-accent/20',
};
const ICON_COLOR = { fullstack: 'text-accent-light', ml: 'text-cyan-accent' };
const ICON_BG = { fullstack: 'bg-accent/10 group-hover:bg-accent/20', ml: 'bg-cyan-accent/10 group-hover:bg-cyan-accent/20' };

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK);
  const { ref, inView } = useScrollAnimation();

  useEffect(() => {
    fetchProjects()
      .then(({ data }) => {
        if (data.data?.length) setProjects(data.data);
      })
      .catch(() => {});
  }, []);

  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle index={3} label="Projects" inView={inView} />

        <div className="flex flex-col gap-8">
          {featured.map((project, i) => {
            const Icon = CATEGORY_ICON[project.category] || Layers;
            const catColor = CATEGORY_COLOR[project.category] || '';
            const iconColor = ICON_COLOR[project.category] || 'text-accent-light';
            const iconBg = ICON_BG[project.category] || 'bg-accent/10';

            return (
              <motion.article
                key={project._id}
                initial={{ opacity: 0, y: 44 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-2xl p-8 md:p-10 hover:border-white/10 transition-all duration-500 group relative overflow-hidden"
              >
                {/* Hover gradient overlay */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${catColor} pointer-events-none rounded-2xl`}
                />

                <div className="relative flex flex-col md:flex-row md:items-start gap-6">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-13 h-13 w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center transition-colors duration-300`}
                  >
                    <Icon size={22} className={iconColor} />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div>
                        <span className={`font-mono text-xs ${iconColor} tracking-widest`}>
                          {CATEGORY_LABEL[project.category] || project.category}
                        </span>
                        <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary mt-0.5">
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex gap-3 flex-shrink-0 mt-1">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-text-primary transition-colors"
                            aria-label="GitHub"
                          >
                            <Github size={18} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-text-primary transition-colors"
                            aria-label="Live Demo"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="font-body text-text-secondary leading-relaxed mt-3 mb-6">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs px-3 py-1 rounded-full bg-surface-2 text-text-muted border border-border hover:border-border-light hover:text-text-secondary transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/aniket821108"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm text-text-secondary hover:text-accent-light transition-colors duration-200 group"
          >
            <Github size={16} />
            View more on GitHub
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
