export const outletAnimation = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: 100,
    opacity: 0,
  },
};

export const messageAnimation = {
  hidden: {
    y: 100,
    x: 0,
    opacity: 0,
  },
  visible: {
    y: 0,
    x: 0,
    opacity: 1,
  },
  exit: {
    x: 100,
    y: 0,
    opacity: 0,
  },
};

export const sideBarAnimation = {
  initial: {
    opacity: 0,
    x: -100,
    width: 0,
  },
  animate: {
    opacity: 1,
    x: 0,
    width: '64px',
  },
  hover: {
    width: '230px',
  },
};

export const sideMenuAnimation = {
  initial: {
    opacity: 0,
    x: -100,
    width: 0,
  },
  animate: {
    opacity: 1,
    x: 0,
    width: '300px',
  },
};

export const slideUpAnimation = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  staggeredVisible: (custom: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: custom * 0.2 },
  }),
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export const alertAnimation = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
};

export const slideLeftAnimation = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  staggeredVisible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: custom * 0.2 },
  }),
};
