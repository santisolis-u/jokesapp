export const Colors = {
  white: '#ecf0f1',
  purple: '#8e44ad',
  red: '#e74c3c',
  orange: '#f39c12',
  green: '#27ae60',
};

export const JOKE_CARD_COLORS: string[] = [
  Colors.purple,
  Colors.orange,
  Colors.red,
  Colors.green,
];

export const hexToRGB = (hex: string, alpha: number) => {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
};
