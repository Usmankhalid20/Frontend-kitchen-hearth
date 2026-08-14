/**
 * Curated high-resolution food photography from Unsplash & Pexels
 */

export const FOOD_IMAGES = {
  chicken: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
  pasta: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80',
  salmon: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
  taco: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
  pancake: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
  dessert: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
  curry: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80',
  steak: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=800',
  ramen: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg?auto=compress&cs=tinysrgb&w=800',
  smoothie: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=800',
  gourmet: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
  sushi: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=800',
  toast: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=800',
  rice: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=800',
  soup: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?auto=compress&cs=tinysrgb&w=800',
};

const FALLBACK_LIST = Object.values(FOOD_IMAGES);

/**
 * Returns a high-quality Pexels or Unsplash image URL for a given recipe
 */
export const getRecipeImage = (recipe) => {
  if (recipe && recipe.image && typeof recipe.image === 'string' && recipe.image.startsWith('http')) {
    return recipe.image;
  }

  const title = (recipe?.title || '').toLowerCase();
  const description = (recipe?.description || '').toLowerCase();
  const combinedText = `${title} ${description}`;

  // Keyword matching
  if (combinedText.includes('chicken') || combinedText.includes('tikka') || combinedText.includes('poultry')) return FOOD_IMAGES.chicken;
  if (combinedText.includes('pasta') || combinedText.includes('penne') || combinedText.includes('spaghetti') || combinedText.includes('noodle')) return FOOD_IMAGES.pasta;
  if (combinedText.includes('salmon') || combinedText.includes('fish') || combinedText.includes('seafood') || combinedText.includes('tuna')) return FOOD_IMAGES.salmon;
  if (combinedText.includes('salad') || combinedText.includes('veggie') || combinedText.includes('greens') || combinedText.includes('bowl')) return FOOD_IMAGES.salad;
  if (combinedText.includes('pizza') || combinedText.includes('flatbread')) return FOOD_IMAGES.pizza;
  if (combinedText.includes('taco') || combinedText.includes('burrito') || combinedText.includes('mexican')) return FOOD_IMAGES.taco;
  if (combinedText.includes('burger') || combinedText.includes('sandwich')) return FOOD_IMAGES.burger;
  if (combinedText.includes('pancake') || combinedText.includes('waffle') || combinedText.includes('breakfast')) return FOOD_IMAGES.pancake;
  if (combinedText.includes('cake') || combinedText.includes('chocolate') || combinedText.includes('dessert') || combinedText.includes('sweet')) return FOOD_IMAGES.dessert;
  if (combinedText.includes('curry') || combinedText.includes('masala') || combinedText.includes('stew')) return FOOD_IMAGES.curry;
  if (combinedText.includes('steak') || combinedText.includes('beef') || combinedText.includes('meat')) return FOOD_IMAGES.steak;
  if (combinedText.includes('ramen') || combinedText.includes('pho')) return FOOD_IMAGES.ramen;
  if (combinedText.includes('smoothie') || combinedText.includes('shake') || combinedText.includes('juice')) return FOOD_IMAGES.smoothie;
  if (combinedText.includes('sushi') || combinedText.includes('roll')) return FOOD_IMAGES.sushi;
  if (combinedText.includes('toast') || combinedText.includes('avocado')) return FOOD_IMAGES.toast;
  if (combinedText.includes('rice') || combinedText.includes('biryani')) return FOOD_IMAGES.rice;
  if (combinedText.includes('soup') || combinedText.includes('broth')) return FOOD_IMAGES.soup;

  // Deterministic fallback based on title hash or id
  const str = recipe?._id || recipe?.id || recipe?.title || 'recipe';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % FALLBACK_LIST.length;
  return FALLBACK_LIST[index];
};
