export function parseViewsNumber(views: number) {
  if (views > 1000) {
    return `${Math.floor(views / 100) / 10}K`;
  }
  return views;
}
