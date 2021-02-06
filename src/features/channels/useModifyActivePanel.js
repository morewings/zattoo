import {useDispatch} from 'react-redux';
import {SET_ACTIVE_PANEL} from 'features/channels/actionTypes';

export const useModifyActivePanel = () => {
  const dispatch = useDispatch();
  return activePanel => {
    dispatch({
      type: SET_ACTIVE_PANEL,
      payload: activePanel,
    });
  };
};
