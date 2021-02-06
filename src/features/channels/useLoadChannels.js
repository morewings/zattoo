import {useDispatch} from 'react-redux';
import {LOAD_CHANNELS} from 'features/channels/actionTypes';
import {filterChannels} from 'utils/filterChannels';

export const useLoadChannels = () => {
  const dispatch = useDispatch();
  return channels => {
    dispatch({
      type: LOAD_CHANNELS,
      payload: filterChannels(channels),
    });
  };
};
