export default interface BuildingBlock {
    group: string
    name: string
    clone: (original: BuildingBlock) => any
}

export function checkGroupMatch(targetSortable: any, sourceSortable: any, element: HTMLElement) {
    const elementGroup: string | undefined = element.dataset.group;
    const sourceGroup: string | undefined = sourceSortable.options.group.name;
    const targetGroup: string | undefined = targetSortable.options.group.name;

    return elementGroup === targetGroup || sourceGroup === targetGroup;
}