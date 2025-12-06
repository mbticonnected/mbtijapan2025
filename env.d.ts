// Augment the NodeJS namespace to include API_KEY in ProcessEnv without shadowing the global process variable
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
    [key: string]: string | undefined;
  }
}
