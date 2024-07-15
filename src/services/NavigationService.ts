import { ref } from "vue";

// the currently active path
export const currentPath = ref<string>(window.location.pathname);

// navigate to a route
export function navigateTo(path: string, data: any = {}): void {
    currentPath.value = path;
    window.history.pushState(data, '', path);
}