import { Ref, ref } from "vue";

export default class NavigationService {
    readonly currentPath: Ref<string> = ref<string>(window.location.pathname);
    readonly parameters: Ref<object> = ref<object>({});

    navigateTo(path: string, parameters: object = {}): void {
        window.history.pushState({}, '', path);

        this.currentPath.value = window.location.pathname;
        this.parameters.value = parameters;
    }
}