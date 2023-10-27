// huh

export interface IElectronAPI {
  loadPreferences: () => Promise<void>,
  setTitle: (title) => Promise<void>,
  getMarkdownFile: (filepath) => Promise<{filename:string, payload:string}>
}

export interface IelectronD {
  openDialog: (object, object) => Promise<boolean, string[]>,
  createZip: (filepath: string, contents: object[]) => Promise<string>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI,
    electronD: IelectronD
    }
}