import { app, BrowserWindow } from "electron";
import path from "path";
import serve from "electron-serve";
import { exec } from "child_process";

const developerOptions = {
  isInProduction: false,    // true if is in production
  serveSvelteDev: false,    // true when you want to watch svelte 
  buildSvelteDiv: false,     // true when you want to build svelte
  watchSvelteBuild: false,   // true when you want to watch build svelte 
};

if (! developerOptions.isInProduction){
  developerOptions.isInProduction = process.env.NODE_ENV === "production" || !/[\\/]electron/.exec(process.execPath); // !process.execPath.match(/[\\/]electron/);
}
let loadURL:any = null;

if (!developerOptions.isInProduction && developerOptions.serveSvelteDev) {
  console.log("npm run svelte:dev");
  exec("npm run svelte:dev");
  console.log("electron-reload svelte dev");
  require("electron-reload")(path.join(__dirname, "..", "svelte"));
} 

if (!developerOptions.isInProduction && developerOptions.buildSvelteDiv) {
  console.log("npm run svelte:build");
  exec("npm run svelte:build");
}

if (!developerOptions.isInProduction && developerOptions.watchSvelteBuild) {
  console.log("electron-reload www");
  require("electron-reload")(path.join(__dirname, "www"));
}


if (developerOptions.isInProduction || !developerOptions.serveSvelteDev) {
  console.log("serve dist/www");
  loadURL = serve({ directory: "dist/www" });
}

let mainWindow = null;

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 854,
    height: 480,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
    },
  });

  if (developerOptions.serveSvelteDev) {
    mainWindow.loadURL("http://localhost:3000/");
  } else if (loadURL) {
    await loadURL(mainWindow);
  }
};

app.on("ready", async () => {
  app.name = "Svelte Template";
  await createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
