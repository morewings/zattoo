import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {
  useChannelsList,
  useChannelPointer,
  useFavorites,
  useFavoritePointer,
} from './selectors';
import {SET_ACTIVE_CHANNEL, SET_ACTIVE_FAVORITE} from './actionTypes';

export const useModifyActiveChannel = () => {
  const dispatch = useDispatch();
  const {getId: getChannelId} = useChannelPointer();
  const {getId: getFavoriteId} = useFavoritePointer();
  const channelLength = useChannelsList().length;
  const favoritesLength = useFavorites().length;
  const setActiveChannel = useCallback(
    channelId => {
      dispatch({
        type: SET_ACTIVE_CHANNEL,
        payload: channelId,
      });
    },
    [dispatch]
  );

  const setActiveFavorite = activeFavorite => {
    dispatch({
      type: SET_ACTIVE_FAVORITE,
      payload: activeFavorite,
    });
  };

  const setActiveChannelByIndex = channelIndex => {
    const isValid = channelIndex >= 0 && channelIndex < channelLength;
    const channelId = getChannelId(channelIndex);
    if (isValid) {
      setActiveChannel(channelId);
    }
  };

  const setFavorite = favoriteIndex => {
    const isValid = favoriteIndex >= 0 && favoriteIndex < favoritesLength;
    const channelId = getFavoriteId(favoriteIndex);
    if (isValid) {
      setActiveFavorite(channelId);
    }
  };

  return {
    setActiveChannelByIndex,
    setFavorite,
  };
};
