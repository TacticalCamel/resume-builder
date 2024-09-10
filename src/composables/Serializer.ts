export function useSerializer(types: Record<string, any> | undefined = undefined): ISerializer {
    if (types) {
        return new TypedJsonSerializer(types);
    }

    return new JsonSerializer();
}

export interface ISerializer {
    serialize<T>(data: T): string;

    deserialize<T>(data: string): T;
}

class JsonSerializer implements ISerializer {
    serialize<T>(data: T): string {
        return JSON.stringify(data);
    }

    deserialize<T>(data: string): T {
        return JSON.parse(data);
    }
}

class TypedJsonSerializer implements ISerializer {
    private static readonly TYPE_KEY: string = '__type';
    private readonly types: Record<string, any>

    constructor(types: Record<string, any>) {
        this.types = types;
    }

    serialize<T>(data: T): string {
        return JSON.stringify(data, (_: string, value: any): any => {
            if (typeof value !== 'object' || !value) {
                return value;
            }

            return {
                [TypedJsonSerializer.TYPE_KEY]: value.constructor.name,
                ...value
            };
        }, 2);
    }

    deserialize<T>(data: string): T {
        return JSON.parse(data, (_: string, value: any): any => {
            if (typeof value !== 'object' || !value) {
                return value;
            }

            const key: string | undefined = value[TypedJsonSerializer.TYPE_KEY];

            if (!key) {
                return value;
            }

            const constructor = this.types[key];

            if (!constructor) {
                return value;
            }

            const object = Object.assign(new constructor(), value);

            delete object[TypedJsonSerializer.TYPE_KEY];

            return object;
        });
    }
}