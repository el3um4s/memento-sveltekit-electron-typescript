import { IPC, SendChannels } from "@el3um4s/ipc-for-electron";
import { BrowserWindow } from "electron";

const nameAPI = "systemInfo";

// to Main
const validSendChannel: SendChannels = {
  requestSystemInfo: requestSystemInfo,
};

// from Main
const validReceiveChannel: string[] = ["getSystemInfo"];

const systemInfo = new IPC({
  nameAPI,
  validSendChannel,
  validReceiveChannel,
});

export default systemInfo;

// Enter here the functions for ElectronJS

function requestSystemInfo(
  mainWindow: BrowserWindow,
  event: Electron.IpcMainEvent,
  message: any
) {
  const versionChrome = process.versions.chrome;
  const versionNode = process.versions.node;
  const versionElectron = process.versions.electron;
  const result = {
    chrome: versionChrome,
    node: versionNode,
    electron: versionElectron,
  };
  mainWindow.webContents.send("getSystemInfo", result);
}
