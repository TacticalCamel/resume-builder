export default interface IValueStore<TEntity> {
    get value(): TEntity
    set value(value: TEntity)
}