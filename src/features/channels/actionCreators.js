import {useDispatch} from 'react-redux';
import {filterChannels} from 'utils/filterChannels';
import {
  LOAD_CHANNELS,
  SET_ACTIVE_CHANNEL,
  SET_ACTIVE_PANEL,
  ADD_FAVORITE,
  DELETE_FAVORITE,
  SET_ACTIVE_FAVORITE,
  SET_VISIBLE_CHANNELS,
  SET_VISIBLE_FAVORITES,
} from './actionTypes';

export const useActions = () => {
  const dispatch = useDispatch();
  const loadChannels = channels => {
    dispatch({
      type: LOAD_CHANNELS,
      payload: filterChannels(channels),
    });
  };
  const setActiveChannel = id => {
    dispatch({
      type: SET_ACTIVE_CHANNEL,
      payload: id,
    });
  };
  const setActivePanel = activePanel => {
    dispatch({
      type: SET_ACTIVE_PANEL,
      payload: activePanel,
    });
  };
  const setActiveFavorite = activeFavorite => {
    dispatch({
      type: SET_ACTIVE_FAVORITE,
      payload: activeFavorite,
    });
  };
  const setVisibleChannels = visibleRange => {
    dispatch({
      type: SET_VISIBLE_CHANNELS,
      payload: visibleRange,
    });
  };
  const setVisibleFavorites = visibleRange => {
    dispatch({
      type: SET_VISIBLE_FAVORITES,
      payload: visibleRange,
    });
  };
  const addFavorite = favorite => {
    dispatch({
      type: ADD_FAVORITE,
      payload: favorite,
    });
  };
  const deleteFavorite = favorite => {
    dispatch({
      type: DELETE_FAVORITE,
      payload: favorite,
    });
  };
  return {
    loadChannels,
    setActiveChannel,
    setActivePanel,
    setVisibleChannels,
    addFavorite,
    deleteFavorite,
    setActiveFavorite,
    setVisibleFavorites,
  };
};
