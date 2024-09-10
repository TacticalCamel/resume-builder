import { Ref } from "vue";
import { liveQuery } from "dexie";
import { from, useObservable } from "@vueuse/rxjs";

export type ReactiveQuery<T> = Readonly<Ref<T | undefined>>

export function useReactiveQuery<T>(query: () => T | Promise<T>, observer: ((value: T) => void) | undefined = undefined): ReactiveQuery<T> {
    const observable = from(liveQuery(query));

    if(observer) {
        observable.subscribe(observer);
    }

    return useObservable(observable);
}