import React, {useRef} from 'react';
import {
  useVisibleChannels,
  useActiveChannel,
  useActivePanel,
  useChannelPointer,
  useModifyActivePanel,
  useModifyActiveChannel,
} from 'features/channels';
import {Channel} from 'components/Channel';
import {useKeyPressHandler} from './useKeyPressHandler';
import classes from './ChannelsList.module.css';

export const ChannelsList = () => {
  const visible = useVisibleChannels();
  const activeChannel = useActiveChannel();
  const activePanel = useActivePanel();
  const {handleChannelsKeyPress} = useKeyPressHandler();
  const {setActiveChannelByIndex} = useModifyActiveChannel();
  const setActivePanel = useModifyActivePanel();
  const {getIndex} = useChannelPointer();
  const ref = useRef();
  const handleMouseEnter = () => {
    ref.current.focus();
    setActivePanel('channelsList');
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
      className={classes.channelsList}>
      {visible.map(({id}) => (
        <Channel
          onSelect={setActiveChannelByIndex}
          rowLength={2}
          id={id}
          index={getIndex(id)}
          key={id}
          isActive={activePanel === 'channelsList' && activeChannel === id}
        />
      ))}
    </div>
  );
};
