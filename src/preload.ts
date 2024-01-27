/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */

/**
 * Adds an event listener for the DOMContentLoaded event that replaces text of elements
 * with IDs matching browser names with their corresponding version from
 * process.versions
 */
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) {
      if (typeof text === "string") {
        element.innerText = text;
      }
    }
  };

  for (const type of ["chrome", "node", "electron"]) {
    const version = process.versions[type];
    if (typeof version === "string") {
      replaceText(`${type}-version`, version);
    }
  }
});

import { contextBridge, ipcRenderer } from "electron/renderer";

contextBridge.exposeInMainWorld("electronAPI", {
  openNewWindow: () => ipcRenderer.send("open-new-window"),
});
