export default function getCategoriesUnderParent(categories, parentID) {
  return categories.filter(cat => cat.parentId === parentID);
}
