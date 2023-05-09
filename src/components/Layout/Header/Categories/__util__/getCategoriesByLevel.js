export default function getCategoriesByLevel(categories, level) {
  return categories.filter(cat => cat.level === level);
}
