export default function(categories, category) {
  return categories.some(cat => cat.parentId === category.id);
}
