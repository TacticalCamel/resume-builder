export default interface INavigationService {
    get path(): string
    get parameters(): object
    navigateTo(path: string, parameters?: object): void
}