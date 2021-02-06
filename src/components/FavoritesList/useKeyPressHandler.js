import {nextRow, prevRow} from 'utils/operations';
import {
  useActiveFavorite,
  useCheckIsFavorite,
  useActiveChannelActions,
  useSetVisibleFavorites,
  useFavoritePointer,
  useFavoriteChannelActions,
} from 'features/channels';

const ROW = 1;

export const useKeyPressHandler = () => {
  const activeFavorite = useActiveFavorite();
  const {getIndex} = useFavoritePointer();
  const activeFavoriteIndex = getIndex(activeFavorite);
  const {setFavorite} = useActiveChannelActions();
  const {addFavorite, deleteFavorite} = useFavoriteChannelActions();
  const isFavorite = useCheckIsFavorite(activeFavorite);

  const {adjustVisibleDown, adjustVisibleUp} = useSetVisibleFavorites(ROW);
  const handleChannelsKeyPress = key => {
    switch (key) {
      case 'ArrowUp': {
        const nextChannelIndex = prevRow(ROW, activeFavoriteIndex);
        setFavorite(nextChannelIndex);
        adjustVisibleUp(nextChannelIndex);
        break;
      }
      case 'ArrowDown': {
        const nextChannelIndex = nextRow(ROW, activeFavoriteIndex);
        setFavorite(nextChannelIndex);
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
