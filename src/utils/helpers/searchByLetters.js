export const searchByLetters = (item, itemText) => {
  return Object.values(item).join('').toLowerCase().includes(itemText.toLowerCase());
};
