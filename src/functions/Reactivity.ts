import { isProxy, isReactive, isRef, toRaw } from "vue";

/**
 * Convert a reactive proxy to a raw object recursively. This can help in avoiding problems with functions at serialization.
 * @param sourceObj The object to convert.
 * @copyright https://github.com/vuejs/core/issues/5303#issuecomment-1543596383
 */
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