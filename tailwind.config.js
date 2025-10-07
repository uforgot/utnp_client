import ConstantStyle from './src/constant/constant.style';
import plugin from 'tailwindcss/plugin';
import TailwindMq, { Mq } from './src/util/mq.js';

Mq.setBreakPoint([ConstantStyle.MIN_WIDTH_MOBILE]);

Mq.constantStyle = ConstantStyle;
Mq.setMobileRatio(1 / 2);

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx,css}'],
  theme: ConstantStyle.TAILWIND_THEME,
  plugins: [plugin(TailwindMq)],
};
