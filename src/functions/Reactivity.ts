import { isProxy, isReactive, isRef, toRaw } from "vue";

// reactive proxies contain functions, which sometimes cause problems at serialization, so the object must be recursively converted
// https://github.com/vuejs/core/issues/5303#issuecomment-1543596383
export function deepToRaw<T extends Record<string, any>>(sourceObj: T): T {
    const objectIterator = (input: any): any => {
        if (Array.isArray(input)) {
            return input.map((item) => objectIterator(item));
        }

        if (isRef(input) || isReactive(input) || isProxy(input)) {
            return objectIterator(toRaw(input));
        }

        if (input && typeof input === 'object') {
            // special treatment for array buffers
            if(input.byteLength){
                return input;
            }

            return Object.keys(input).reduce((acc, key) => {
                acc[key as keyof typeof acc] = objectIterator(input[key]);
                return acc;
            }, {} as T);
        }

        return input;
    };

    return objectIterator(sourceObj);
}