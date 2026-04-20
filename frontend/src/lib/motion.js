export const ease = [0.22, 1, 0.36, 1];
export const easeDrama = [0.7, 0, 0.1, 1];
export const easeInOut = [0.76, 0, 0.24, 1];

export const pageVariants = {
  initial: { opacity: 0, filter: 'blur(6px)' },
  enter: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.9, ease } },
  exit: { opacity: 0, filter: 'blur(4px)', transition: { duration: 0.45, ease } },
};

export const revealVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease, delay: i * 0.08 },
  }),
};

export const heroChild = {
  hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.25, ease: easeDrama, delay: 0.25 + i * 0.14 },
  }),
};

export const maskedReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  show: (i = 0) => ({
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 1.2, ease: easeDrama, delay: i * 0.1 },
  }),
};
