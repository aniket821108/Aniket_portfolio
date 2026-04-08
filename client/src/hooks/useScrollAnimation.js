import { useInView } from 'react-intersection-observer';

/**
 * A small wrapper around react-intersection-observer for
 * triggering scroll-based animations once.
 *
 * @param {number} threshold  - 0–1 visibility ratio to trigger
 * @param {string} rootMargin - CSS margin for the intersection root
 * @returns {{ ref, inView }}
 */
export function useScrollAnimation(threshold = 0.12, rootMargin = '0px') {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
    rootMargin,
  });
  return { ref, inView };
}

/** Shared Framer Motion variants */
export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};
