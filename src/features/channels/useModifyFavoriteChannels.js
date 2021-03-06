import {useDispatch} from 'react-redux';
import {ADD_FAVORITE, DELETE_FAVORITE} from './actionTypes';
import {useAdjustVisibleFavorites} from './useAdjustVisible';
import {useFavorites} from './selectors';

const ROW = 1;

const VISIBLE_AMOUNT = 8;

export const useModifyFavoriteChannels = () => {
  const dispatch = useDispatch();
  const favorites = useFavorites();
  const {adjustVisibleDown, adjustVisibleUp} = useAdjustVisibleFavorites(
    ROW,
    'favorite'
  );

  const addAction = favorite => {
    dispatch({
      type: ADD_FAVORITE,
      payload: favorite,
    });
  };

  const deleteAction = favorite => {
    dispatch({
      type: DELETE_FAVORITE,
      payload: favorite,
    });
  };

  const addFavorite = favorite => {
    const nextFavoriteIndex = favorites.length - 1;
    adjustVisibleDown(nextFavoriteIndex);
    addAction(favorite);
  };

  const deleteFavorite = favorite => {
    const nextFavoriteIndex =
      favorites.length - VISIBLE_AMOUNT >= 0
        ? favorites.length - VISIBLE_AMOUNT
        : 0;
    adjustVisibleUp(nextFavoriteIndex);
    deleteAction(favorite);
  };

  return {addFavorite, deleteFavorite};
};
