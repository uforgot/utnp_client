import ConstantStyle from './src/constant/constant.style';
import plugin from 'tailwindcss/plugin';
import TailwindMq, { Mq } from '@designfever/tailwind-mq';

Mq.setBreakPoint([
  ConstantStyle.MIN_WIDTH_MOBILE,
  ConstantStyle.MIN_WIDTH_TABLET - 1,
  ConstantStyle.MIN_WIDTH_DESKTOP,
]);

Mq.constantStyle = ConstantStyle;
Mq.setMobileRatio(620 / 360);

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx,css}'],
  theme: ConstantStyle.TAILWIND_THEME,
  plugins: [plugin(TailwindMq)],
};
