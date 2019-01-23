import { app, dialog } from 'electron';

const fs = require('fs');

const pad = (v) => ((v < 10) ? `0${v}` : v);

const getDateString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const min = pad(date.getMinutes());
  const sec = pad(date.getSeconds());
  return `${year}${month}${day}-${hour}${min}${sec}`;
};

export function saveFile(event, data, prefix = 'tx') {
  const defaultPath = app.getPath('documents');
  const defaultFilename = `${prefix}-${getDateString()}.json`;
  const fileName = dialog.showSaveDialog({
    title: 'Save File',
    defaultPath: `${defaultPath}/${defaultFilename}`,
    filters: [
      { name: 'JSON Files', extensions: ['json'] }
    ]
  });

  if (!fileName) return;
  fs.writeFileSync(fileName, data);
}

export default {
  saveFile
};
