import React, {useEffect} from 'react';
import rawData from 'data/channels.json';
import {useLoadChannels} from 'features/channels';
import {ChannelsList} from 'components/ChannelsList';
import {FavoritesList} from 'components/FavoritesList';
import classes from './Dashboard.module.css';

export const Dashboard = () => {
  const loadChannels = useLoadChannels();

  useEffect(() => {
    loadChannels(rawData.channels);
  }, [loadChannels]);

  return (
    <div className={classes.dashboard}>
      <div className={classes.favorites}>
        <h2 className={classes.header}>My favorite channels</h2>
        <FavoritesList />
      </div>
      <div className={classes.allChannels}>
        <h2 className={classes.header}>All channels</h2>
        <ChannelsList />
      </div>
    </div>
  );
};
