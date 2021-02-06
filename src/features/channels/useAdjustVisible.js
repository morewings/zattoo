import {nextRow, prevRow} from 'utils/operations';
import {useVisibleChannelsRange, useVisibleFavoritesRange} from './selectors';
import {useActions} from './actionCreators';

const MARGIN = 2;

const adjustVisibleDown = ({row, start, end, callback}) => activeChannel => {
  const isInVisibleRange = activeChannel + row * MARGIN <= end;
  if (!isInVisibleRange) {
    const isValid = nextRow(row, end);
    const nextStart = isValid ? nextRow(row, start) : start;
    const nextEnd = isValid ? nextRow(row, end) : end;
    callback([nextStart, nextEnd]);
  }
};

const adjustVisibleUp = ({row, start, end, callback}) => activeChannel => {
  const isInVisibleRange = activeChannel - row * MARGIN >= start;
  if (!isInVisibleRange) {
    const isValid = prevRow(row, start) >= 0;
    const nextStart = isValid ? prevRow(row, start) : start;
    const nextEnd = isValid ? prevRow(row, end) : end;
    callback([nextStart, nextEnd]);
  }
};

export const useSetVisibleChannels = row => {
  const [start, end] = useVisibleChannelsRange();
  const {setVisibleChannels} = useActions();
  return {
    adjustVisibleDown: adjustVisibleDown({
      row,
      start,
      end,
      callback: setVisibleChannels,
    }),
    adjustVisibleUp: adjustVisibleUp({
      row,
      start,
      end,
      callback: setVisibleChannels,
    }),
  };
};

export const useSetVisibleFavorites = row => {
  const [start, end] = useVisibleFavoritesRange();
  const {setVisibleFavorites} = useActions();
  return {
    adjustVisibleDown: adjustVisibleDown({
      row,
      start,
      end,
      callback: setVisibleFavorites,
    }),
    adjustVisibleUp: adjustVisibleUp({
      row,
      start,
      end,
      callback: setVisibleFavorites,
    }),
  };
};
