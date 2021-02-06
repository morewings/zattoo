import {nextRow, prevRow} from 'utils/operations';
import {
  useActiveFavorite,
  useCheckIsFavorite,
  useModifyActiveChannel,
  useAdjustVisibleFavorites,
  useFavoritePointer,
  useModifyFavoriteChannels,
} from 'features/channels';

const ROW = 1;

export const useKeyPressHandler = () => {
  const activeFavorite = useActiveFavorite();
  const {getIndex} = useFavoritePointer();
  const activeFavoriteIndex = getIndex(activeFavorite);
  const {setActiveFavoriteByIndex} = useModifyActiveChannel();
  const {addFavorite, deleteFavorite} = useModifyFavoriteChannels();
  const isFavorite = useCheckIsFavorite(activeFavorite);

  const {adjustVisibleDown, adjustVisibleUp} = useAdjustVisibleFavorites(ROW);
  const handleChannelsKeyPress = key => {
    switch (key) {
      case 'ArrowUp': {
        const nextChannelIndex = prevRow(ROW, activeFavoriteIndex);
        setActiveFavoriteByIndex(nextChannelIndex);
        adjustVisibleUp(nextChannelIndex);
        break;
      }
      case 'ArrowDown': {
        const nextChannelIndex = nextRow(ROW, activeFavoriteIndex);
        setActiveFavoriteByIndex(nextChannelIndex);
        adjustVisibleDown(nextChannelIndex);
        break;
      }
      case 'ArrowRight': {
        console.log('switch to channels');
        break;
      }
      case 'Enter': {
        if (isFavorite) {
          deleteFavorite(activeFavorite);
          adjustVisibleDown(activeFavoriteIndex);
        } else {
          addFavorite(activeFavorite);
          adjustVisibleUp(activeFavoriteIndex);
        }
        break;
      }
      default:
        break;
    }
    return null;
  };
  return {handleChannelsKeyPress};
};
