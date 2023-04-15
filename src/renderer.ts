/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './public/index.css';
// Importing this adds a right-click menu with 'Inspect Element' option
// const { remote } = require('@electron/remote')
// const Menu = remote.require('menu')
// const MenuItem = remote.require('menu-item')

// console.log('👋 This message is being logged by "renderer.js", included via webpack');

// let rightClickPosition: any = null

// const menu = new Menu()
// const menuItem = new MenuItem({
//   label: 'Inspect Element',
//   click: () => {
//     remote.getCurrentWindow().inspectElement(rightClickPosition.x, rightClickPosition.y)
//   }
// })
// menu.append(menuItem)

// window.addEventListener('contextmenu', (e) => {
//   e.preventDefault()
//   rightClickPosition = {x: e.x, y: e.y}
//   menu.popup(remote.getCurrentWindow())
// }, false)

// Add this to the end of the existing file
import './react-init';