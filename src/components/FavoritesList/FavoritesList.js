import React, {useRef} from 'react';
import {
  useChannelActions,
  useVisibleFavorites,
  useActiveFavorite,
  useActivePanel,
} from 'features/channels';
import {Channel} from 'components/Channel';
import {useKeyPressHandler} from './useKeyPressHandler';
import classes from './FavoritesList.module.css';

export const FavoritesList = () => {
  const favorites = useVisibleFavorites();
  const activeChannel = useActiveFavorite();
  const activePanel = useActivePanel();
  const {handleChannelsKeyPress} = useKeyPressHandler();
  const {setActivePanel, setActiveFavorite} = useChannelActions();
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
      {favorites.map(({id, index}, i) => (
        <Channel
          onSelect={setActiveFavorite}
          rowLength={1}
          id={id}
          nr={index}
          key={id}
          isActive={activePanel === 'favoritesList' && activeChannel === id}
        />
      ))}
    </div>
  );
};
