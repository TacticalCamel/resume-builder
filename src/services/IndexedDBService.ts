export default class IndexedDBService<TEntity extends { id: number }> {
    private readonly databaseName: string;
    private readonly storeName: string;
    private readonly version: number;

    constructor(databaseName: string, storeName: string, version: number = 1) {
        this.databaseName = databaseName;
        this.storeName = storeName;
        this.version = version;
    }

    private openDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request: IDBOpenDBRequest = indexedDB.open(this.databaseName, this.version);

            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;

                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName,  { keyPath: 'id', autoIncrement: true });
                }
            };

            request.onsuccess = (event: Event) => {
                resolve((event.target as IDBOpenDBRequest).result);
            };

            request.onerror = (event: Event) => {
                reject((event.target as IDBOpenDBRequest).error);
            };
        });
    }

    async create(entity: TEntity): Promise<number> {
        const db: IDBDatabase = await this.openDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.add(entity);

            request.onsuccess = (event: Event) => {
                resolve((event.target as IDBRequest).result);
            };

            request.onerror = (event: Event) => {
                reject((event.target as IDBRequest).error);
            };
        });
    }

    async readOne(id: number): Promise<TEntity> {
        const db: IDBDatabase = await this.openDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(id);

            request.onsuccess = (event: Event) => {
                resolve((event.target as IDBRequest).result);
            };

            request.onerror = (event: Event) => {
                reject((event.target as IDBRequest).error);
            };
        });
    }

    async readAll(): Promise<TEntity[]> {
        const db: IDBDatabase = await this.openDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getAll();

            request.onsuccess = (event: Event) => {
                resolve((event.target as IDBRequest).result);
            };

            request.onerror = (event: Event) => {
                reject((event.target as IDBRequest).error);
            };
        });
    }

    async update(id: number, entity: TEntity): Promise<void> {
        const db: IDBDatabase = await this.openDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put({ ...entity, id });

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event: Event) => {
                reject((event.target as IDBRequest).error);
            };
        });
    }

    async remove(id: number): Promise<void> {
        const db: IDBDatabase = await this.openDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(id);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event: Event) => {
                reject((event.target as IDBRequest).error);
            };
        });
    }
}