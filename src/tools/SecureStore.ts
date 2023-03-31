import * as SecureStore from 'expo-secure-store';
import { SecureStoreOptions } from 'expo-secure-store/src/SecureStore';

export const SecureStorage = {
  async saveAsync(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  },
  async getAsync(key: string): Promise<string | null> {
    const result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    }
    return null;
  },
  async deleteAsync(key: string, options: SecureStoreOptions = {}):Promise<void> {
    await SecureStore.deleteItemAsync(key, options);
  }
};
