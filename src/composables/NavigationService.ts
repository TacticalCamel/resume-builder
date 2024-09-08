import { ref, Ref } from "vue";

let instance: INavigationService | undefined;

export function useNavigationService(): INavigationService {
    if(instance) {
        return instance;
    }

    instance = new NavigationService();

    return instance;
}

export interface INavigationService {
    get path(): string
    get parameters(): object
    navigateTo(path: string, parameters?: object): void
}

class NavigationService implements INavigationService {
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