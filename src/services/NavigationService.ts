import { Ref, ref } from "vue";

export default class NavigationService {
    currentPath: Ref<string> = ref<string>(window.location.pathname);

    navigateTo(path: string): void {
        window.history.pushState({}, '', path);
        this.currentPath.value = window.location.pathname;
    }
}