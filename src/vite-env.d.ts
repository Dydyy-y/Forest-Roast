/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  //autres variables d'environnement perso
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
