import { Ref, ref } from "vue";
import INavigationService from "@/services/interfaces/INavigationService";

export default class NavigationService implements INavigationService {
    private readonly currentPath: Ref<string> = ref<string>(window.location.pathname);
    private readonly currentParameters: Ref<object> = ref<object>({});

    get path() {
        return this.currentPath.value;
    }

    get parameters() {
        return this.currentParameters.value;
    }

    navigateTo(path: string, parameters: object = {}): void {
        window.history.pushState({}, '', path);

        this.currentPath.value = window.location.pathname;
        this.currentParameters.value = parameters;
    }
}