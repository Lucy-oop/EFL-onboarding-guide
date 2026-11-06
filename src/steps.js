import { Globe, Home, Menu, LogIn, Mail, KeyRound, LayoutGrid } from 'lucide-react';

// One entry per step, same order as the text in i18n.js.
// Screenshots (missing files show a placeholder):
//   phone   → public/steps/mobile/step-N.webp
//   desktop → public/steps/desktop/step-N.webp
// `only: 'mobile'` → step is hidden on desktop.
// `highlight`: red box drawn on the screenshot, in % of the image (left, top, width, height).
const RAW = [
  { icon: Globe },
  { icon: Home },
  { icon: Menu, only: 'mobile' },
  {
    // EFL login page → type email + password, then Sign in with Microsoft
    icon: LogIn,
    highlight: {
      desktop: { x: 37.5, y: 28, w: 23.5, h: 28.5 },
      mobile: { x: 10.5, y: 31.5, w: 79, h: 26 },
    },
  },
  {
    // Microsoft "Sign in" — type email again
    icon: Mail,
    highlight: {
      desktop: { x: 35, y: 38.5, w: 27, h: 6.5 },
      mobile: { x: 4.5, y: 20.5, w: 90.5, h: 6.5 },
    },
  },
  {
    // Microsoft "Update your password"
    icon: KeyRound,
    highlight: {
      desktop: { x: 37, y: 50, w: 26.5, h: 20.5 },
      mobile: { x: 4.5, y: 33.5, w: 89, h: 19.5 },
    },
  },
  {
    // Dashboard → Enrolled Courses
    icon: LayoutGrid,
    highlight: {
      desktop: { x: 0.5, y: 50, w: 22.5, h: 6.8 },
      mobile: { x: 2, y: 83, w: 96, h: 7.5 },
    },
  },
];

export const STEPS = RAW.map((s, i) => ({
  ...s,
  image: {
    mobile: `${import.meta.env.BASE_URL}steps/mobile/step-${i + 1}.webp`,
    desktop: `${import.meta.env.BASE_URL}steps/desktop/step-${i + 1}.webp`,
  },
}));

// Indices of the steps shown on this device
export const visibleSteps = (isDesktop) =>
  STEPS.flatMap((s, i) => (isDesktop && s.only === 'mobile' ? [] : [i]));
