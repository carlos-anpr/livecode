import { SavedDesign } from '../types/editor';

export const designsDB = {
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('DesignsDB', 1);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('designs')) {
          db.createObjectStore('designs', {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async saveDesign(design: Omit<SavedDesign, 'id'>): Promise<number> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = (db as IDBDatabase).transaction(
        ['designs'],
        'readwrite'
      );
      const store = transaction.objectStore('designs');
      const request = store.add({
        ...design,
        favorite: false,
        updated_at: new Date().toISOString(),
      });

      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(request.error);
    });
  },

  async updateDesign(id: string, design: Partial<SavedDesign>): Promise<void> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = (db as IDBDatabase).transaction(
        ['designs'],
        'readwrite'
      );
      const store = transaction.objectStore('designs');

      // Primero obtenemos el diseño existente
      const getRequest = store.get(id);

      getRequest.onsuccess = () => {
        const existingDesign = getRequest.result;
        if (!existingDesign) {
          reject(new Error('Design not found'));
          return;
        }

        // Actualizamos con los nuevos valores
        const updatedDesign = {
          ...existingDesign,
          ...design,
          updated_at: new Date().toISOString(),
        };

        const updateRequest = store.put(updatedDesign);
        updateRequest.onsuccess = () => resolve();
        updateRequest.onerror = () => reject(updateRequest.error);
      };

      getRequest.onerror = () => reject(getRequest.error);
    });
  },

  async deleteDesign(id: string) {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = (db as IDBDatabase).transaction(
        ['designs'],
        'readwrite'
      );
      const store = transaction.objectStore('designs');
      const request = store.delete(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async getAllDesigns(): Promise<SavedDesign[]> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = (db as IDBDatabase).transaction(
        ['designs'],
        'readonly'
      );
      const store = transaction.objectStore('designs');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result as SavedDesign[]);
      request.onerror = () => reject(request.error);
    });
  },

  async getDesignById(id: string): Promise<SavedDesign | null> {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = (db as IDBDatabase).transaction(
        ['designs'],
        'readonly'
      );
      const store = transaction.objectStore('designs');
      const request = store.get(id);

      request.onsuccess = () => {
        // Si no existe el diseño, request.result será undefined
        resolve(request.result || null);
      };
      request.onerror = () => reject(request.error);
    });
  },
};
