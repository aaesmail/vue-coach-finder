let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      login: true,
    });
  },

  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      login: false,
    });
  },

  async auth(context, payload) {
    const url = payload.login
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsjWm2RmSmFTW08yI_dtkh8I2L2cYV4qU'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAsjWm2RmSmFTW08yI_dtkh8I2L2cYV4qU';

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate!'
      );
      throw error;
    }

    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },

  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    if (!token || !userId || !tokenExpiration) return;

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 1) {
      context.dispatch('logout');
      return;
    }

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: token,
      userId: userId,
    });
  },

  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null,
    });
  },

  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};
