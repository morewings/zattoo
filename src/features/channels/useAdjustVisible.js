import {useDispatch} from 'react-redux';
import {nextRow, prevRow} from 'utils/operations';
import {useVisibleChannelsRange, useVisibleFavoritesRange} from './selectors';
import {SET_VISIBLE_CHANNELS, SET_VISIBLE_FAVORITES} from './actionTypes';

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

export const useAdjustVisibleChannels = row => {
  const dispatch = useDispatch();
  const [start, end] = useVisibleChannelsRange();
  const setVisibleChannels = visibleRange => {
    dispatch({
      type: SET_VISIBLE_CHANNELS,
      payload: visibleRange,
    });
  };
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

export const useAdjustVisibleFavorites = row => {
  const dispatch = useDispatch();
  const [start, end] = useVisibleFavoritesRange();
  const setVisibleFavorites = visibleRange => {
    dispatch({
      type: SET_VISIBLE_FAVORITES,
      payload: visibleRange,
    });
  };
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
