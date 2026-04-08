import { motion } from 'framer-motion';

export default function SectionTitle({ index, label, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mb-16"
    >
      <p className="font-mono text-accent-light text-sm mb-3 tracking-widest">
        // {index.toString().padStart(2, '0')}.&nbsp;{label.toUpperCase()}
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary leading-tight">
        {label}
      </h2>
    </motion.div>
  );
}
