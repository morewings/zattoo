import {filter} from 'lodash/fp';
import {
  LOAD_CHANNELS,
  SET_VISIBLE_CHANNELS,
  SET_ACTIVE_CHANNEL,
  SET_ACTIVE_PANEL,
  ADD_FAVORITE,
  DELETE_FAVORITE,
  SET_ACTIVE_FAVORITE,
  SET_VISIBLE_FAVORITES,
} from './actionTypes';

const initialState = {
  list: [],
  favorites: [],
  visibleChannels: [0, 16],
  visibleFavorites: [0, 8],
  activeChannel: 'itv-1-london',
  activePanel: '',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CHANNELS: {
      return {
        ...state,
        list: action.payload,
      };
    }
    case SET_VISIBLE_CHANNELS: {
      return {
        ...state,
        visibleChannels: action.payload,
      };
    }
    case SET_VISIBLE_FAVORITES: {
      return {
        ...state,
        visibleFavorites: action.payload,
      };
    }
    case SET_ACTIVE_CHANNEL: {
      return {
        ...state,
        activeChannel: action.payload,
      };
    }
    case SET_ACTIVE_PANEL: {
      return {
        ...state,
        activePanel: action.payload,
      };
    }
    case SET_ACTIVE_FAVORITE: {
      return {
        ...state,
        activeFavorite: action.payload,
      };
    }
    case ADD_FAVORITE: {
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    }
    case DELETE_FAVORITE: {
      return {
        ...state,
        favorites: filter(
          favorite => favorite !== action.payload,
          state.favorites
        ),
      };
    }
    default:
      return state;
  }
};
