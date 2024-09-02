export default interface IAsyncObjectStore<TEntity, TKey> {
    create(entity: TEntity): Promise<TKey>
    readOne(id: IDBKeyRange | TKey): Promise<TEntity | undefined>
    readAll(): Promise<TEntity[]>
    update(entity: TEntity, id: IDBKeyRange | TKey): Promise<TKey>
    delete(id: IDBKeyRange | TKey): Promise<void>
}