import { ipcMain } from 'electron';
import { autoUpdater } from "electron-updater";
import Main from "./mainWindow";

import systemInfo from './IPC/systemInfo';
import updaterInfo from './IPC/updaterInfo';

const developerOptions = {
  isInProduction: true,    // true if is in production
  serveSvelteDev: false,    // true when you want to watch svelte 
  buildSvelteDev: false,     // true when you want to build svelte
  watchSvelteBuild: false,   // true when you want to watch build svelte 
};

const windowSettings = {
  title:  "MEMENTO - SvelteKit, Electron, TypeScript",
  width: 854,
  height: 854
}

let main = new Main(windowSettings, developerOptions);

main.onEvent.on("window-created", async () => {
  systemInfo.initIpcMain(ipcMain, main.window);
  updaterInfo.initIpcMain(ipcMain, main.window);

  updaterInfo.initAutoUpdater(autoUpdater, main.window);

});

