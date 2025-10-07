class ConstantStyle {
  static MIN_WIDTH_MOBILE = 1080;

  static MEDIA_BREAK_POINTS = [ConstantStyle.MIN_WIDTH_MOBILE];

  static getPixelToEm(spacing: number) {
    return spacing / 1000 + 'em';
  }

  static TAILWIND_THEME = {
    letterSpacing: {
      tightest: ConstantStyle.getPixelToEm(-50),
      tighter: ConstantStyle.getPixelToEm(-40),
      tight: ConstantStyle.getPixelToEm(-30),
      normal: ConstantStyle.getPixelToEm(-20),
      wide: ConstantStyle.getPixelToEm(20),
      wider: ConstantStyle.getPixelToEm(10),
      widest: ConstantStyle.getPixelToEm(0),
      none: '0',
    },
    fontWeight: {
      black: '900',
      extraBold: '800',
      bold: '700',
      semiBold: '600',
      medium: '500',
      regular: '400',
      light: '300',
      extraLight: '200',
      thin: '100',
    },
    colors: {
      black: '#000000',
      white: '#FFFFFF',
      gray: '#8E8E8E',
      red: '#FF0000',
      content: {},

      contentFocus: {},

      card: {},
    },
    screens: {
      sm: `${ConstantStyle.MIN_WIDTH_MOBILE + 1}px`,
    },
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
      lineHeight: {
        tight: `${1.0}`,
        normal: `${60 / 46}`,
      },
      zIndex: {
        background: '10',
        content: '1000',
        frame: '1500',
        din: '600000',
      },
    },
  };
}

export default ConstantStyle;
