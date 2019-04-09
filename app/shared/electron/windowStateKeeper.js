import debounce from 'lodash/debounce';
import { setSetting } from '../actions/settings';

export function windowStateKeeper(store, scope) {
  let window;
  let windowState;

  const scopeString = scope || '';

  function setBounds() {
    // Restore from store
    if (store.getState().settings[`${scopeString}setupData`]) {
      windowState = store.getState().settings[`${scopeString}setupData`];
      return;
    }
    // Default
    windowState = {
      x: undefined,
      y: undefined,
      width: 940,
      height: 580,
    };
  }

  function saveState() {
    if (!windowState.isMaximized) {
      windowState = window.getBounds();
    }
    windowState.isMaximized = window.isMaximized();
    store.dispatch(setSetting(`${scopeString}setupData`, windowState));
  }

  function track(win) {
    window = win;
    ['resize', 'move'].forEach(event => {
      win.on(event, debounce(saveState, 500));
    });
    ['close'].forEach(event => {
      win.on(event, saveState);
    });
  }
  setBounds();
  return ({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    isMaximized: windowState.isMaximized,
    track,
  });
}

export default {
  windowStateKeeper
};
