const fonts = {
  family: {
    bold: 'FiraSans-Bold', // 700
    semiBold: 'FiraSans-SemiBold', // 600
    medium: 'FiraSans-Medium', // 500
    regular: 'FiraSans-Regular', // 400
    light: 'FiraSans-Light', // 300
    monoRegular: 'FiraMono-Regular', // 400
    monoMedium: 'FiraMono-Medium', // 500
    monoBold: 'FiraMono-Bold', // 700
  },
  weights: {
    bold: '700',
    semiBold: '600',
    medium: '500',
    regular: '400',
    light: '300',
  },
  sizes: {
    b4: 72,
    b3: 62,
    b2: 54,
    b1: 48,
    h1: 42,
    h2: 36,
    h3: 32,
    h4: 28,
    h5: 24,
    h6: 21,
    p: 18,
  },
};

// Get font family and matching font weight style object
export const getFontFamilyStyles = type => {
  const styles = { fontFamily: fonts.family[type] };

  switch (type) {
    case 'monoRegular':
      styles.fontWeight = fonts.weights.regular;
      break;
    case 'monoMedium':
      styles.fontWeight = fonts.weights.medium;
      break;
    case 'monoBold':
      styles.fontWeight = fonts.weights.bold;
      break;
    default:
      styles.fontWeight = fonts.weights[type];
      break;
  }

  return styles;
};

export default fonts;
