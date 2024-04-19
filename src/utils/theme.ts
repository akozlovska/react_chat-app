import { transparentize } from '@theme-ui/color';
import { deep } from '@theme-ui/presets';

const buttonsGeneralStyles = {
  cursor: 'pointer',
  borderRadius: '10px',
};

const buttons = {
  primary: {
    ...buttonsGeneralStyles,
    background: 'primary',
    color: 'light',
    border: '1px solid',
    borderColor: 'primary',
    transition: `all 0.3s ease-in-out`,
    '&:hover': {
      background: `transparent`,
      color: 'text',
    },
  },
  outline: {
    ...buttonsGeneralStyles,
    background: 'transparent',
    border: '1px solid',
    borderColor: 'primary',
    color: 'text',
    transition: `all 0.3s ease-in-out`,
    '&:hover': {
      background: 'primary',
      color: 'light',
    },
  },

  sideBar: {
    ...buttonsGeneralStyles,
    p: 0,
  },
};

const tabs = {
  active: {
    ...buttonsGeneralStyles,
    background: 'transparent',
    color: 'text',
    transition: `all 0.3s ease-in-out`,
    '&:hover': {
      background: 'highlight',
    },
  },
  inactive: {
    ...buttonsGeneralStyles,
    background: 'transparent',
    color: transparentize('text', 0.5),
    transition: `all 0.3s ease-in-out`,
    '&:hover': {
      background: 'highlight',
    },
  },
};

const alerts = {
  error: {
    borderRadius: '10px',
    background: 'accent',
    color: 'light',
    fontSize: 1,
  },
};

const labels = {
  hidden: {
    position: 'absolute',
    left: '-9999px',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
  },
};

const nav = {
  px: 5,
  py: 2,
  height: '57px',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const aside = {
  height: '100%',
  top: 0,
  bottom: 0,
  left: 0,
  overflowY: 'scroll',
  boxShadow: '0 10px 10px var(--theme-ui-colors-boxShadow)',
};

const cards = {
  user: {
    borderRadius: '10px',
    gap: '20px',
    alignItems: 'center',
    boxShadow: '2px 2px 5px var(--theme-ui-colors-boxShadow)',
  },
  userRoom: {
    bg: 'transparent',
    display: 'block',
    color: 'text',
    textDecoration: 'none',
    transition: 'all 0.3s',
    paddingLeft: 3,
    borderBottom: '1px solid',
    borderColor: 'highlight',
    borderRadius: '10px',
  },
  userRoomActive: {
    bg: 'highlight',
    display: 'block',
    color: 'text',
    textDecoration: 'none',
    transition: 'all 0.3s',
    paddingLeft: 3,
    borderBottom: '1px solid',
    borderColor: 'transparent',
    borderRadius: '10px',
  },
  room: {
    borderRadius: '10px',
    boxShadow: '2px 2px 5px var(--theme-ui-colors-boxShadow)',
  },
};

const badges = {
  primary: {
    bg: transparentize('gray', 0.4),
    fontWeight: 'normal',
  },
};

const messages = {
  own: {
    bg: transparentize('gray', 0.6),
    borderRadius: '10px',
    minWidth: '200px',
  },
  other: {
    bg: transparentize('secondary', 0.6),
    borderRadius: '10px',
    minWidth: '200px',
  },
};

export default {
  config: {
    initialColorModeName: 'light',
  },
  ...deep,
  colors: {
    ...deep.colors,
    background: 'white',
    text: deep.colors.background,
    highlight: '#efeffe',
    boxShadow: deep.colors.highlight,
    light: deep.colors.text,
    accent: '#660099',
    modes: {
      dark: {
        ...deep.colors,
        boxShadow: deep.colors.secondary,
      },
    },
  },
  buttons,
  alerts,
  tabs,
  labels,
  nav,
  aside,
  cards,
  badges,
  messages,
  styles: {
    ...deep.styles,
  },
};
