import { motion } from 'framer-motion';

const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.035, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

/**
 * Splits text into characters and animates each one in.
 * @param {string} text   - Text to animate
 * @param {string} tag    - HTML tag (h1, h2, span, p…)
 * @param {string} className
 * @param {boolean} inView - from useInView
 */
export default function AnimatedText({ text, tag: Tag = 'span', className = '', inView = true }) {
  return (
    <Tag className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={charVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Tag>
  );
}
