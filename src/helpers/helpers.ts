import { Notification, app, BrowserWindow } from "electron";
import * as path from "path";

export function createMainWindow(): void {
  const isProd: boolean = process.env.NODE_ENV === "production";

  const mainWindow = new BrowserWindow({
    width: 600,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "../../dist/preload.js"),
    },
    autoHideMenuBar: true,
  });

  // open developer console in dev mode
  isProd ? null : mainWindow.webContents.openDevTools();

  // load the index.html of the app.
  mainWindow.loadFile("../index.html");

  // if the main window is closed then quit application
  mainWindow.on("closed", () => app.quit());
}

export function showNotification(): void {
  const NOTIFICATION_TITLE = "Application is ready";
  const NOTIFICATION_BODY = "Notification from the Main process";

  new Notification({
    title: NOTIFICATION_TITLE,
    body: NOTIFICATION_BODY,
  }).show();
}
