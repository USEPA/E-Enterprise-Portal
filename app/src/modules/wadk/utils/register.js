import commonModule from '../store/common/index';

export default (name, store) => {
  store.registerModule(name, commonModule);
};
