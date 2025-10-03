class ConstantStyle {
  static MIN_WIDTH_MOBILE = 620;
  static MIN_WIDTH_TABLET = 1280;
  static MIN_WIDTH_DESKTOP = 1920;

  static CONTENT_MOBILE_COLUMN_GAP = 10;
  static CONTENT_TABLET_COLUMN_GAP = 24;
  static CONTENT_DESKTOP_COLUMN_GAP = 24;

  static CONTENT_MOBILE_PADDING = 14;
  static CONTENT_TABLET_PADDING = 72;
  static CONTENT_DESKTOP_PADDING = 72;

  static MEDIA_BREAK_POINTS = [
    ConstantStyle.MIN_WIDTH_MOBILE,
    ConstantStyle.MIN_WIDTH_TABLET,
    ConstantStyle.MIN_WIDTH_DESKTOP,
    ConstantStyle.MIN_WIDTH_DESKTOP + 1,
  ];

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
      lg: `${ConstantStyle.MIN_WIDTH_TABLET + 1}px`,
      xl: `${ConstantStyle.MIN_WIDTH_DESKTOP + 1}px`,
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
        content: '1000',
        header: '2000',
        explorer: '4000',
        layer: '6000',
        popup: '7000',
        loading: '400000',
        splash: '500000',
        din: '600000',
        helper: '1000000',
      },
    },
  };
}

export default ConstantStyle;
