import { Component } from "vue";
import { LayoutItem } from "@/models/bindings/LayoutItem";

export interface LayoutGroup {
    icon: Component
    title: string
    items: LayoutItem[]
}