import {nextRow, prevRow} from 'utils/operations';
import {
  useActiveChannel,
  useCheckIsFavorite,
  useChannelPointer,
  useSetVisibleChannels,
  useSetActive,
} from 'features/channels';
import {useActions} from 'features/channels/actionCreators';

const isEven = number => number % 2 === 0;

const ROW = 2;

export const useKeyPressHandler = () => {
  const activeChannel = useActiveChannel();
  const {getIndex} = useChannelPointer();
  const activeChannelIndex = getIndex(activeChannel);
  const {setChannel} = useSetActive();
  const {addFavorite, deleteFavorite} = useActions();
  const isFavorite = useCheckIsFavorite(activeChannel);

  const {adjustVisibleDown, adjustVisibleUp} = useSetVisibleChannels(ROW);
  const handleChannelsKeyPress = key => {
    switch (key) {
      case 'ArrowUp': {
        const nextChannelIndex = prevRow(ROW, activeChannelIndex);
        setChannel(nextChannelIndex);
        adjustVisibleUp(nextChannelIndex);
        break;
      }
      case 'ArrowDown': {
        const nextChannelIndex = nextRow(ROW, activeChannelIndex);
        setChannel(nextChannelIndex);
        adjustVisibleDown(nextChannelIndex);
        break;
      }
      case 'ArrowRight': {
        const nextChannelIndex = activeChannelIndex + 1;
        setChannel(nextChannelIndex);
        adjustVisibleDown(nextChannelIndex);
        break;
      }
      case 'ArrowLeft': {
        const nextChannelIndex = activeChannelIndex - 1;
        if (!isEven(activeChannelIndex)) {
          setChannel(nextChannelIndex);
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
