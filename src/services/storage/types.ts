export interface LocalStorageService {
  setItem: (key: LocalStorageServiceKeyTypes, value: string) => void;
  getItem: (key: LocalStorageServiceKeyTypes) => string | null;
  removeItem: (key: LocalStorageServiceKeyTypes) => void;
  clear: () => void;
}

export type LocalStorageServiceKeyTypes = "AUTH_TOKEN_STATE" | "user";
