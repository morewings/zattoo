import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useTheme} from 'css-vars-hook';
import {transformNumber} from 'utils/transformNumber';
import {
  useChannelLogo,
  useChannelName,
  useFavoriteChannelActions,
} from 'features/channels';
import star from 'images/star.svg';
import starOutline from 'images/star_outline.svg';
import {useCheckIsFavorite} from 'features/channels/selectors';
import classes from './Channel.module.css';

export const Channel = ({nr, id, rowLength, onSelect, isActive}) => {
  const logoUrl = useChannelLogo(id);
  const name = useChannelName(id);
  const {addFavorite, deleteFavorite} = useFavoriteChannelActions();
  const isFavorite = useCheckIsFavorite(id);

  const handleChannelClick = () => {
    onSelect(id);
  };

  const handleChannelStarClick = () => {
    if (isFavorite) {
      deleteFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  const {setRef, style, setVariable} = useTheme({
    borderColor: 'transparent',
    rowLength,
  });

  useEffect(() => {
    if (isActive) {
      setVariable('borderColor', 'white');
    }
  }, [isActive, setVariable]);
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      tabIndex={0}
      role="button"
      onClick={handleChannelClick}
      ref={setRef}
      style={style}
      className={classes.channel}>
      <div className={classes.number}>{transformNumber(nr)}</div>
      <div className={classes.logo}>
        <img src={logoUrl} alt={name} />
      </div>
      <div className={classes.name}>{name}</div>
      <button
        type="button"
        className={classes.star}
        onClick={handleChannelStarClick}>
        <img src={isFavorite ? star : starOutline} alt="" />
      </button>
    </div>
  );
};

Channel.propTypes = {
  nr: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  rowLength: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
};
