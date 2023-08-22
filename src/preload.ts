// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

  window.onload = function() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const {ipcRenderer} = require('electron');

      window.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        ipcRenderer.send('show-context-menu', { x: e.clientX, y: e.clientY })
      })

      ipcRenderer.on('context-menu-command', (e, command, my) => {
        ipcRenderer.sendSync('mouse', { x: my.x, y: my.y })
      })
  };