import { app } from "electron";
import { ipcMain } from "electron";
import { autoUpdater } from "electron-updater";
import Main from "./mainWindow";
import globals from "./globals";

import systemInfo from "@el3um4s/ipc-for-electron-system-info";

import updaterInfo from "./IPC/updaterInfo";
import fileSystem from "./IPC/fileSystem";

import path from "path";
import { pathToFileURL } from "node:url";

const developerOptions = {
  isInProduction: true, // true if is in production
  serveSvelteDev: false, // true when you want to watch svelte
  buildSvelteDev: false, // true when you want to build svelte
  watchSvelteBuild: false, // true when you want to watch build svelte
};

/*
  testing svelte side: isInProduction: false, serveSvelteDev: true, buildSvelteDev:false, watchSvelteBuild: false
  testing only electron side: isInProduction: true, serveSvelteDev: false, buildSvelteDev:false, watchSvelteBuild: false
  testing both side: isInProduction: true, serveSvelteDev: false, buildSvelteDev:true, watchSvelteBuild: true
*/

const mainURLPATH = pathToFileURL(path.join(__dirname, "www", "index.html"));

globals.set.mainURL(mainURLPATH.href);
globals.set.preloadjs(path.join(__dirname, "preload.js"));

app.commandLine.appendSwitch("disable-gpu");
app.commandLine.appendArgument("disable-gpu");
app.commandLine.appendSwitch("enable-experimental-web-platform-features");

const windowSettings = {
  title: "MEMENTO - SvelteKit, Electron, TypeScript",
  width: 854,
  height: 854,
};

let main = new Main(windowSettings, developerOptions);

main.onEvent.on("window-created", async () => {
  systemInfo.initIpcMain(ipcMain, main.window);
  updaterInfo.initIpcMain(ipcMain, main.window);
  fileSystem.initIpcMain(ipcMain, main.window);
  updaterInfo.initAutoUpdater(autoUpdater, main.window);
});
