import { LocalStorageService, LocalStorageServiceKeyTypes } from "./types";
class LocalStorageServiceImpl implements LocalStorageService {
  setItem(key: LocalStorageServiceKeyTypes, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: LocalStorageServiceKeyTypes) {
    return localStorage.getItem(key);
  }

  removeItem(key: LocalStorageServiceKeyTypes) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}

export default new LocalStorageServiceImpl();
