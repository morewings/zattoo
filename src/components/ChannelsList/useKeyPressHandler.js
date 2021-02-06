import {nextRow, prevRow} from 'utils/operations';
import {
  useActiveChannel,
  useCheckIsFavorite,
  useChannelPointer,
  useSetVisibleChannels,
  useModifyActiveChannel,
  useFavoriteChannelActions,
} from 'features/channels';

const isEven = number => number % 2 === 0;

const ROW = 2;

export const useKeyPressHandler = () => {
  const activeChannel = useActiveChannel();
  const {getIndex} = useChannelPointer();
  const activeChannelIndex = getIndex(activeChannel);
  const {setActiveChannelByIndex} = useModifyActiveChannel();
  const {addFavorite, deleteFavorite} = useFavoriteChannelActions();
  const isFavorite = useCheckIsFavorite(activeChannel);

  const {adjustVisibleDown, adjustVisibleUp} = useSetVisibleChannels(ROW);
  const handleChannelsKeyPress = key => {
    switch (key) {
      case 'ArrowUp': {
        const nextChannelIndex = prevRow(ROW, activeChannelIndex);
        setActiveChannelByIndex(nextChannelIndex);
        adjustVisibleUp(nextChannelIndex);
        break;
      }
      case 'ArrowDown': {
        const nextChannelIndex = nextRow(ROW, activeChannelIndex);
        setActiveChannelByIndex(nextChannelIndex);
        adjustVisibleDown(nextChannelIndex);
        break;
      }
      case 'ArrowRight': {
        const nextChannelIndex = activeChannelIndex + 1;
        setActiveChannelByIndex(nextChannelIndex);
        adjustVisibleDown(nextChannelIndex);
        break;
      }
      case 'ArrowLeft': {
        const nextChannelIndex = activeChannelIndex - 1;
        if (!isEven(activeChannelIndex)) {
          setActiveChannelByIndex(nextChannelIndex);
          adjustVisibleUp(nextChannelIndex);
        } else {
          console.log('switch to favorites');
        }
        break;
      }
      case 'Enter': {
        if (isFavorite) {
          deleteFavorite(activeChannel);
        } else {
          addFavorite(activeChannel);
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
