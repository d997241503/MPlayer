export function playUnit(num) {
  if (typeof num === 'number' || typeof num === 'string') {
    if (num >= 10000 || num <= -10000) {
      return (num/10000).toFixed(1) + '万';
    } else {
      return num;
    }
  } else {
    return null
  }
}