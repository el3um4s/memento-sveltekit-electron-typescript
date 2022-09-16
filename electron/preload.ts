import { generateContextBridge } from "@el3um4s/ipc-for-electron";
import systemInfo from "@el3um4s/ipc-for-electron-system-info";

import updaterInfo from "./IPC/updaterInfo";
import fileSystem from "./IPC/fileSystem";

generateContextBridge([systemInfo, updaterInfo, fileSystem], "ipc");
