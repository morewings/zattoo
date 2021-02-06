import {uniqWith, isEqual, flow, map, filter} from 'lodash/fp';

export const filterChannels = rawData =>
  flow(
    uniqWith(isEqual),
    map(channel => ({
      ...channel,
      qualities: filter(
        ({availability}) => availability === 'available',
        channel.qualities
      ),
    })),
    filter(({qualities}) => qualities.length > 0)
  )(rawData);
