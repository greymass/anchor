const { screen } = require('electron');

export default async function handleUri(mainWindow, pHandler, url) {
  // Create the prompt in the center of whichever screen is clicked on from.
  const cursor = screen.getCursorScreenPoint();
  const promptBounds = pHandler.getBounds();
  const currentScreen = screen.getDisplayNearestPoint({ x: cursor.x, y: cursor.y });
  const outOfBoundsX =
    promptBounds.x + promptBounds.width > currentScreen.bounds.x + currentScreen.bounds.width;
  const outOfBoundsY =
    promptBounds.y + promptBounds.height > currentScreen.bounds.y + currentScreen.bounds.height;
  const outOfBounds = outOfBoundsX || outOfBoundsY;
  if (outOfBounds) {
    const x = parseInt(
      currentScreen.workArea.x + (currentScreen.workArea.width - promptBounds.width) / 2,
      10
    );
    const y = parseInt(
      currentScreen.workArea.y + (currentScreen.workArea.height - promptBounds.height) / 2,
      10
    );
    pHandler.setBounds({
      x,
      y,
      width: promptBounds.width,
      height: promptBounds.height,
    });
  }

  if (url.startsWith('anchorcreate:')) {
    mainWindow.webContents.send('accountCreate', url);
    mainWindow.setVisibleOnAllWorkspaces(true);
    mainWindow.show();
    mainWindow.focus();
    mainWindow.setVisibleOnAllWorkspaces(false);
  }

  if (url.startsWith('esr:') || url.startsWith('esr-anchor:')) {
    const modified = url.replace('esr-anchor:', 'esr:');
    pHandler.webContents.send('openUri', modified);
    pHandler.setVisibleOnAllWorkspaces(true);
    pHandler.show();
    pHandler.focus();
    pHandler.setVisibleOnAllWorkspaces(false);
  }
}
