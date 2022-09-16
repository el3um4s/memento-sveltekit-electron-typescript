interface Globals {
  mainURL: string;
  preloadjs: string;
}

interface BrowserViewBounds {
  x: number;
  y: number;
  widthDelta: number;
  heightDelta: number;
}

const globals: Globals = {
  mainURL: "index.html",
  preloadjs: "preload.js",
};

const get = {
  mainUrl: (): string => globals.mainURL,
  preloadjs: (): string => globals.preloadjs,
};

const set = {
  mainURL: (v: string): string => {
    globals.mainURL = v;
    return v;
  },
  preloadjs: (v: string): string => {
    globals.preloadjs = v;
    return v;
  },
};

export default { get, set };
