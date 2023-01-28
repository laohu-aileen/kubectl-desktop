import type { InitialState } from './app';

export default (initialState: InitialState) => {
  const { logged } = initialState;
  return { logged };
};
