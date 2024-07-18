import {Component} from "vue";

export default interface BuildingBlock {
    group: string
    name: string
    clone: () => any
    icon: Component
}

/*
 Check if the dragged element can be moved between the source and target sortable.
 The element can be moved if the target group matches the source group or the group of the element.
*/
export function checkGroupMatch(targetSortable: any, sourceSortable: any, element: HTMLElement): boolean {
    const elementGroup: string | undefined = element.dataset.group;
    const sourceGroup: string | undefined = sourceSortable.options.group.name;
    const targetGroup: string | undefined = targetSortable.options.group.name;

    return elementGroup === targetGroup || sourceGroup === targetGroup;
}