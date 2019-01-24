import debounce from 'lodash/debounce';
import { setSetting } from '../../shared/actions/settings';

function windowStateKeeper(store) {
  let window;
  let windowState;

  function setBounds() {
    // Restore from store
    if (store.getState().settings.setupData) {
      windowState = store.getState().settings.setupData;
      return;
    }
    // Default
    windowState = {
      x: undefined,
      y: undefined,
      width: 1000,
      height: 800,
    };
  }

  function saveState() {
    if (!windowState.isMaximized) {
      windowState = window.getBounds();
    }
    windowState.isMaximized = window.isMaximized();
    store.dispatch(setSetting('setupData', windowState));
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

module.exports = { windowStateKeeper };
