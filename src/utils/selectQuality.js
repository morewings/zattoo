import {find, flow, getOr} from 'lodash/fp';

export const selectQuality = (qualities, key) => {
  const uhd = flow(
    find(({level}) => level === 'uhd'),
    getOr('', key)
  )(qualities);

  const hd = flow(
    find(({level}) => level === 'hd'),
    getOr('', key)
  )(qualities);

  const sd = flow(
    find(({level}) => level === 'sd'),
    getOr('', key)
  )(qualities);

  return uhd || hd || sd;
};
