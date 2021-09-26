const BETA_ENABLED_KEY = 'CNT_BETA_ENABLED';

const cachedIsBeta = localStorage.getItem(BETA_ENABLED_KEY);

export let isBeta = cachedIsBeta === 'true';

export const setIsBeta = (val: 'true' | 'false') => {
  localStorage.setItem('CNT_BETA_ENABLED', val);
  isBeta = val === 'true';
};

export const setFlagsFromUrl = () => {
  if (window.location.pathname === '/flags') {
    const urlParams = new URLSearchParams(window.location.search);
    const betaFlag = urlParams.get('beta');

    if (betaFlag === 'true' || betaFlag === 'false') {
      setIsBeta(betaFlag);
    }
  }
};
