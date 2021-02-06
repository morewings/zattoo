import {find, flow, slice, some, map, findIndex, getOr} from 'lodash/fp';
import {useSelector} from 'react-redux';
import {selectQuality} from 'utils/selectQuality';

export const useChannelsList = () => useSelector(state => state.channels.list);

export const useFavorites = () =>
  useSelector(state => state.channels.favorites);

export const useChannelLogo = channelId => {
  const channels = useSelector(state => state.channels.list);
  return flow(
    find(({id}) => id === channelId),
    ({qualities}) => selectQuality(qualities, 'logo_black_84'),
    url => `https://images.zattic.com/logos/${url.slice(23)}`
  )(channels);
};

export const useChannelName = channelId => {
  const channels = useSelector(state => state.channels.list);
  return flow(
    find(({id}) => id === channelId),
    ({qualities}) => selectQuality(qualities, 'title')
  )(channels);
};

export const useVisibleChannels = () => {
  const visibleChannels = useSelector(state => state.channels.visibleChannels);
  const channels = useChannelsList();
  return slice(...visibleChannels, channels);
};

export const useVisibleFavorites = () => {
  const favorites = useSelector(state => state.channels.favorites);
  const visibleFavorites = useSelector(
    state => state.channels.visibleFavorites
  );
  const channels = useChannelsList();
  return flow(
    slice(...visibleFavorites),
    map(channelId => {
      const channel = find(({id}) => id === channelId, channels);
      return {
        id: channel.id,
        index: channel.index,
      };
    })
  )(favorites);
};

export const useActiveChannel = () =>
  useSelector(state => state.channels.activeChannel);

export const useChannelPointer = () => {
  const channels = useChannelsList();
  const getIndex = channelId => findIndex(({id}) => id === channelId, channels);
  const getId = index => getOr(undefined, [index, 'id'], channels);
  return {getIndex, getId};
};

export const useFavoritePointer = () => {
  const favorites = useSelector(state => state.channels.favorites);
  const getIndex = channelId => findIndex(id => id === channelId, favorites);
  const getId = index => favorites[index];
  return {getIndex, getId};
};

export const useActivePanel = () =>
  useSelector(state => state.channels.activePanel);

export const useVisibleChannelsRange = () =>
  useSelector(state => state.channels.visibleChannels);

export const useVisibleFavoritesRange = () =>
  useSelector(state => state.channels.visibleFavorites);

export const useGetChannelId = index =>
  useSelector(state => state.channels.list[index].id);

export const useCheckIsFavorite = channel => {
  const favorites = useSelector(state => state.channels.favorites);
  return some(favorite => favorite === channel, favorites);
};

export const useActiveFavorite = () =>
  useSelector(state => state.channels.activeFavorite);
