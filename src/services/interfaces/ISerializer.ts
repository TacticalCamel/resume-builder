export default interface ISerializer {
    serialize<T>(data: T): string;
    deserialize<T>(data: string): T;
}