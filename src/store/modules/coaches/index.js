import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  state() {
    return {
      lastFetch: null,
      coaches: [],
    };
  },

  namespaced: true,

  mutations,
  actions,
  getters,
};
