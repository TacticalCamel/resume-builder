import { IDBPDatabase, StoreKey, StoreNames, StoreValue } from "idb";
import IAsyncObjectStore from "@/services/interfaces/IAsyncCollectionStore";

export default class AsyncObjectStore<TSchema, TStoreName extends StoreNames<TSchema>> implements IAsyncObjectStore<StoreValue<TSchema, TStoreName>, StoreKey<TSchema, TStoreName>>{
    private readonly db: IDBPDatabase<TSchema>
    private readonly storeName: TStoreName

    constructor(db: IDBPDatabase<TSchema>, storeName: TStoreName) {
        this.db = db;
        this.storeName = storeName;
    }

    async create(entity: StoreValue<TSchema, TStoreName>): Promise<StoreKey<TSchema, TStoreName>> {
        return this.db.add(this.storeName, entity);
    }

    async delete(id: IDBKeyRange | StoreKey<TSchema, TStoreName>): Promise<void> {
        await this.db.delete(this.storeName, id);
    }

    async readAll(): Promise<StoreValue<TSchema, TStoreName>[]> {
        return this.db.getAll(this.storeName);
    }

    async readOne(id: IDBKeyRange | StoreKey<TSchema, TStoreName>): Promise<StoreValue<TSchema, TStoreName> | undefined> {
        return this.db.get(this.storeName, id);
    }

    async update(entity: StoreValue<TSchema, TStoreName>, id: IDBKeyRange | StoreKey<TSchema, TStoreName>): Promise<StoreKey<TSchema, TStoreName>> {
        return this.db.put(this.storeName, entity, id);
    }
}