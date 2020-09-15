export const jaggedCircle = (r: number) => {
  const radius = r / 2;
  let d = `M ${radius} ${radius}`;
  const inner = radius - 1;
  for (let i = 0; i < 37; i++) {
    const deg1 = (Math.PI / 18) * i;
    const deg2 = (Math.PI / 18) * (i - 0.5);
    const dx = (Math.cos(deg1) * r) / 2;
    const dy = (Math.sin(deg1) * r) / 2;
    const mx = Math.cos(deg2) * inner;
    const my = Math.sin(deg2) * inner;
    d += `L ${radius + mx} ${radius + my} L ${radius + dx} ${radius + dy}`;
  }
  return d;
};
