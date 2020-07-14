const clamp = (value: number, upper: number, lower: number) => {
  if (upper < lower) {
    return value;
  }
  if (value >= upper) {
    return upper;
  }
  return value <= lower ? lower : value;
};

export default clamp;
