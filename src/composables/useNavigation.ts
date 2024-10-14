import { readonly, ref, Ref, Component } from "vue";

// singleton, use single state globally
const currentPath: Ref<string> = ref<string>(window.location.pathname);
const currentParameters: Ref<object> = ref<object>({});

/**
 * This composable is a minimalistic navigation system that allows to navigate and pass parameters between views.
 */
export function useNavigation() {
    function navigateTo(path: string, parameters: object = {}): void {
        window.history.pushState({}, '', path);

        currentPath.value = window.location.pathname;
        currentParameters.value = parameters;
    }

    function getActiveView(routes: Record<string, Component>): Component | undefined {
        return routes[currentPath.value];
    }

    return {
        path: readonly(currentPath),
        parameters: readonly(currentParameters),
        navigateTo,
        getActiveView
    };
}