import {setSetting} from '../../shared/actions/settings'
import debounce from 'lodash/debounce';

export function windowStateKeeper(store) {
  let window, windowState;

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
    ['resize', 'move', 'close'].forEach(event => {
      win.on(event, debounce(saveState, 500));
    });
  }

  setBounds();
  return({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    isMaximized: windowState.isMaximized,
    track,
  });
}
