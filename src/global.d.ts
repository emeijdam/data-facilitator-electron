// huh

export interface IElectronAPI {
  loadPreferences: () => Promise<void>,
}

export interface IelectronD {
  openDialog: (object, object) => Promise<boolean, string[]>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI,
    electronD: IelectronD
    }
}