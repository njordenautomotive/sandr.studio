export const ease = [0.22, 1, 0.36, 1];

export const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.4, ease } },
};

export const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease, delay: i * 0.08 },
  }),
};

export const heroChild = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease, delay: 0.15 + i * 0.12 },
  }),
};
