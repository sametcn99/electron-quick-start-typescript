/* eslint-disable no-undef */
import { shell, app, BrowserWindow, ipcMain } from "electron";
import { createMainWindow, showNotification } from "./helpers/helpers";

/**
 * Boolean indicating if the app is running in production mode.
 * Set based on the NODE_ENV environment variable.
 */

/**
 * Creates the main browser window for the application.
 * Configures the window size, properties, web preferences etc.
 * Also handles logic for opening dev tools and loading the index.html.
 */

app.whenReady().then(() => {
  createMainWindow();
  showNotification();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("open-new-window", () => {
  const url = "https://github.com/sametcn99/electron-quick-start";
  shell.openExternal(url);
});
