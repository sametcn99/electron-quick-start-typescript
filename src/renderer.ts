/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

/**
 * Manages a counter value and displays it in the DOM.
 * Provides buttons to increase and decrease the counter.
 */
let count = 0;
const countSpan = document.getElementById("count") as HTMLSpanElement;
const decreaseBtn = document.getElementById("decreaseBtn") as HTMLButtonElement;
decreaseBtn.addEventListener("click", () => {
  count--;
  countSpan.innerText = count.toString();
  console.log(`decrease button clicked.\nCount: ${count}`);
});

const increaseBtn = document.getElementById("increaseBtn") as HTMLButtonElement;
increaseBtn.addEventListener("click", () => {
  count++;
  countSpan.innerText = count.toString();
  console.log(`increase button clicked.\nCount: ${count}`);
});

// source code button
const sourceCodeBtn = document.getElementById(
  "sourceCodeBtn"
) as HTMLButtonElement;
/**
 * Adds click event listener to sourceCodeBtn that calls
 * window.electronAPI.openNewWindow() to open a new window when clicked
 */
sourceCodeBtn.addEventListener("click", () => {
  const confirm = window.confirm(
    "You are exiting the application. Are you sure you want to continue?"
  );
  if (confirm) {
    // window.electronAPI is coming from preload.js
    // using ipcRenderer and contextBridge
    console.log("confirmed");
  }
});

/**
 * Creates a browser notification with given title and body.
 * Registers a click handler that logs a message to the output element.
 * Documentation: https://www.electronjs.org/docs/latest/tutorial/notifications
 */
const NOTIFICATION_TITLE = "Title";
const NOTIFICATION_BODY =
  "Notification from the Renderer process. Click to log to console.";
const CLICK_MESSAGE = "Notification clicked!";

new window.Notification(NOTIFICATION_TITLE, {
  body: NOTIFICATION_BODY,
}).onclick = () => {
  const outputElement = document.getElementById("output");
  if (outputElement) {
    outputElement.innerText = CLICK_MESSAGE;
  }
};
