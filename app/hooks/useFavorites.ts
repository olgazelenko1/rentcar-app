import { useCarsStore } from '../store/useCarsStore';

export const useFavorites = () => {
  const favorites = useCarsStore((s) => s.favorites);
  const addFavorite = useCarsStore((s) => s.addFavorite);
  const removeFavorite = useCarsStore((s) => s.removeFavorite);

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
};