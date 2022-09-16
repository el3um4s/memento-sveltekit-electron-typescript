import { generateContextBridge } from "@el3um4s/ipc-for-electron";

import systemInfo from "./IPC/systemInfo";
import updaterInfo from "./IPC/updaterInfo";
import fileSystem from "./IPC/fileSystem";

generateContextBridge([systemInfo, updaterInfo, fileSystem], "api");

console.log("ciao mondo");
