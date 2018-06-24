import * as types from './types';

export function downloadProgress(progress) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.APP_UPDATE_DOWNLOAD_PROGRESS,
      payload: progress
    });
  };
}

export default {
  downloadProgress
};
