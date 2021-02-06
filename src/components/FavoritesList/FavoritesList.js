import React, {useRef} from 'react';
import {
  useVisibleFavorites,
  useActiveFavorite,
  useActivePanel,
  useModifyActivePanel,
  useModifyActiveChannel,
  useFavoritePointer,
} from 'features/channels';
import {Channel} from 'components/Channel';
import {useKeyPressHandler} from './useKeyPressHandler';
import classes from './FavoritesList.module.css';

export const FavoritesList = () => {
  const favorites = useVisibleFavorites();
  const activeChannel = useActiveFavorite();
  const activePanel = useActivePanel();
  const {getIndex} = useFavoritePointer();
  const {handleChannelsKeyPress} = useKeyPressHandler();
  const {setActiveFavoriteByIndex} = useModifyActiveChannel();
  const setActivePanel = useModifyActivePanel();
  const ref = useRef();
  const handleMouseEnter = () => {
    ref.current.focus();
    setActivePanel('favoritesList');
  };

  const handleMouseLeave = () => {
    ref.current.blur();
    setActivePanel('');
  };

  const handleKeyPress = e => {
    handleChannelsKeyPress(e.key);
  };

  return (
    <div
      onFocus={() => {}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={ref}
      tabIndex={0}
      role="button"
      onKeyDown={handleKeyPress}
      className={classes.favoritesList}>
      {favorites.map(({id}) => (
        <Channel
          onSelect={setActiveFavoriteByIndex}
          rowLength={1}
          id={id}
          index={getIndex(id)}
          key={id}
          isActive={activePanel === 'favoritesList' && activeChannel === id}
        />
      ))}
    </div>
  );
};
