import ISerializer from "@/services/interfaces/ISerializer";

export default class TypedJsonSerializer implements ISerializer{
    private readonly types: Record<string, any>

    constructor(types: Record<string, any>) {
        this.types = types;
    }

    serialize<T>(data: T): string {
        const json = JSON.stringify(data, (_: string, value: any): any => {
            if (typeof value === 'object' && value !== null) {
                value['__type'] = value.constructor.name;
            }

            return value;
        }, 2);

        function removeTypeKey(obj: any): any {
            if (typeof obj === 'object' && obj !== null) {
                delete obj['__type'];

                for (const key in obj) {
                    removeTypeKey(obj[key]);
                }
            }

            return obj;
        }

        removeTypeKey(data);

        return json;
    }

    deserialize<T>(data: string): T {
        return JSON.parse(data, (_: string, value: any): any => {
            if (typeof value === 'object' && value !== null && value['__type']) {
                const key: string = value['__type'];
                const type = this.types[key];

                if (type) {
                    const object = Object.assign(new type(), value);
                    delete object['__type'];
                    return object;
                }
            }

            return value;
        });
    }
}