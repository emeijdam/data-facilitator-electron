// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge } from "electron";

  window.onload = function() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const {ipcRenderer} = require('electron');

    window.addEventListener('openfiledialog', (e) => {
        e.preventDefault()
        ipcRenderer.send('show-open-file', { })
      })

      window.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        ipcRenderer.send('show-context-menu', { x: e.clientX, y: e.clientY })
      })

      ipcRenderer.on('context-menu-command', (e, command, my) => {
        ipcRenderer.sendSync('mouse', { x: my.x, y: my.y })
      })

      contextBridge.exposeInMainWorld('electronD', {
        openDialog: (method, config) => ipcRenderer.invoke('dialog', method, config),
        createZip: (filepath, contents) => ipcRenderer.invoke('createZip', filepath, contents)
      });

      contextBridge.exposeInMainWorld('electronAPI', {
        loadPreferences: () => ipcRenderer.invoke('load-prefs'),
        setTitle: (title) => ipcRenderer.send('set-title', title),
        getMarkdownFile: (filepath) => ipcRenderer.invoke('get-md-file', filepath)
      })

  };