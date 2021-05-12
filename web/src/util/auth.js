import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import axios  from "axios";
import oktaAuth from './oktaAuth';
import { MFA_FACTORS } from '../constants';

export const INACTIVITY_LIMIT = 300000;
export const EXPIRE_EARLY_SECONDS = 300;

export const getAccessToken = async () => {
  const apiURL = process.env.API_URL
  const oktaToken = oktaAuth.getAccessToken();
  if (!oktaToken) return null
  const tokenResponse = await axios.get(`${apiURL}/me/jwToken?oktaToken=${oktaToken}`)
  return tokenResponse.data.jwt || null
}

export const getIdToken = () => oktaAuth.getIdToken();

// Cookie Methods

const API_COOKIE_NAME = 'gov.cms.eapd.api-token';
const CONSENT_COOKIE_NAME = 'gov.cms.eapd.hasConsented';

const getConfig = () =>{
  let config
  if (
    !process.env.API_URL ||
    process.env.API_URL.match(new RegExp(/localhost/i))
  ) {
    config = {
      sameSite: 'strict',
      path: '/apds/'
    };
  } else if (process.env.API_URL.match('/api')) {
    config = {
      sameSite: 'strict',
      path: '/api/apds/'
    };
  } else {
    config = {
      domain: '.cms.gov',
      secure: true,
      sameSite: 'lax',
      path: '/apds/'
    };
  }
  return config
}
const setCookie = async () => {
  console.log('setting cookie')
  if (navigator.cookieEnabled) {
    const jwt = await getAccessToken();

    console.log('setting cookie to: ', API_COOKIE_NAME,  jwt)
    const config = getConfig()
    console.log(config)
    Cookies.set(API_COOKIE_NAME, JSON.stringify({ accessToken: jwt }));
    console.log(Cookies.get())
    console.log('got cookie of: ', Cookies.get(API_COOKIE_NAME))
  }
};

const removeCookie = () => {
  if (navigator.cookieEnabled) {
    Cookies.remove(API_COOKIE_NAME);
  }
};

export const hasConsented = () => Cookies.get(CONSENT_COOKIE_NAME) || false;

export const setConsented = () => {
  Cookies.set(CONSENT_COOKIE_NAME, true, {
    expires: 3, // 3 days
    path: '/'
  });
};

export const getLocalAccessToken = () =>{
  console.log('getting local access token')
  console.log(Cookies.get(API_COOKIE_NAME))
  const rawCookie = JSON.parse(Cookies.get(API_COOKIE_NAME))
  return rawCookie.accessToken
}

// Log in methods
export const authenticateUser = (username, password) => {
  return oktaAuth.signInWithCredentials({ username, password });
};

export const retrieveExistingTransaction = () => {
  const exists = oktaAuth.tx.exists();
  if (exists) {
    return oktaAuth.tx
      .resume()
      .then(transaction => transaction)
      .catch(() => null);
  }
  return null;
};

export const verifyMFA = async ({ transaction, otp }) =>
  transaction.verify({
    passCode: otp,
    autoPush: true
  });

export const getSessionExpiration = async () =>
  oktaAuth.tokenManager
    .get('accessToken')
    .then(({ expiresAt = 0 }) => {
      return expiresAt;
    })
    .catch(() => 0);

export const setTokens = sessionToken => {
  const stateToken = uuidv4();
  return oktaAuth.token
    .getWithoutPrompt({
      // responseType: ['id_token', 'token'],
      scopes: ['openid', 'email', 'profile'],
      sessionToken,
      state: stateToken
      // prompt: 'none'
    })
    .then(async res => {
      const { tokens = {} } = res;
      const { accessToken = {} } = tokens;
      const { expiresAt = 0 } = accessToken;
      // if (stateToken === responseToken) { // state not currently being returned
      oktaAuth.tokenManager.setTokens(tokens);
      if (expiresAt) setCookie(accessToken);
      return expiresAt;
      // }
      // throw new Error('Authentication failed');
    });
};

export const getAvailableFactors = factors =>
  factors
    .filter(item => item.provider === 'OKTA')
    .map(item => {
      const { factorType, provider } = item;
      const { displayName, active } = MFA_FACTORS[`${factorType}-${provider}`];
      return {
        ...item,
        displayName,
        active
      };
    });

export const getFactor = async mfaSelectedType => {
  const transaction = await retrieveExistingTransaction();
  if (transaction) {
    const check = MFA_FACTORS[mfaSelectedType].findType || (() => false);
    return transaction.factors.find(f => check(f));
  }
  return null;
};

// Token Manager methods

export const setTokenListeners = ({
  expiredCallback = null,
  errorCallback = null,
  renewedCallback = null,
  removedCallback = null
}) => {
  if (expiredCallback) oktaAuth.tokenManager.on('expired', expiredCallback);
  if (errorCallback) oktaAuth.tokenManager.on('error', errorCallback);
  if (renewedCallback) oktaAuth.tokenManager.on('renewed', renewedCallback);
  if (removedCallback) oktaAuth.tokenManager.on('removed', removedCallback);
};

const renewToken = async key =>
  oktaAuth.tokenManager
    .get(key)
    .then(token => {
      if (token) {
        if (oktaAuth.tokenManager.hasExpired(token)) {
          oktaAuth.tokenManager.remove(key);
          return null;
        }
        return oktaAuth.tokenManager
          .renew(key)
          .then(newToken => newToken)
          .catch(() => null);
      }
      return null;
    })
    .catch(() => null);

export const renewTokens = async () =>
  renewToken('idToken')
    .then(async () => {
      return oktaAuth.tokenManager
        .get('accessToken')
        .then(accessToken => {
          if (accessToken) {
            const { expiresAt = 0 } = accessToken;
            if (expiresAt) setCookie(accessToken);
            return expiresAt;
          }
          return 0;
        })
        .catch(() => 0);
    })
    .catch(() => 0);

export const removeTokenListeners = () => {
  oktaAuth.tokenManager.off('expired');
  oktaAuth.tokenManager.off('renewed');
  oktaAuth.tokenManager.off('error');
  oktaAuth.tokenManager.off('removed');
};

// Log out methods
export const logoutAndClearTokens = async () => {
  oktaAuth
    .revokeAccessToken()
    .then(() => {
      oktaAuth
        .closeSession()
        .then(() => {
          removeCookie();
        })
        .catch(() => {});
    })
    .catch(() => {});
};

export const isUserActive = latestActivity => {
  const now = new Date().getTime();
  return now - latestActivity < INACTIVITY_LIMIT;
};
