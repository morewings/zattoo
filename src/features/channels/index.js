export {reducer as ChannelsReducer} from './reducer';
// export {useActions as useChannelActions} from './actionCreators';
export {
  useChannelsList,
  useChannelLogo,
  useChannelName,
  useVisibleChannels,
  useActiveChannel,
  useActivePanel,
  useVisibleFavorites,
  useActiveFavorite,
  useChannelPointer,
  useCheckIsFavorite,
  useFavoritePointer,
} from './selectors';
export {
  useAdjustVisibleChannels,
  useAdjustVisibleFavorites,
} from './useAdjustVisible';
export {useModifyActiveChannel} from './useModifyActiveChannel';
export {useModifyFavoriteChannels} from './useModifyFavoriteChannels';
export {useLoadChannelsAction} from './useLoadChannelsAction';
export {useModifyActivePanel} from './useModifyActivePanel';
