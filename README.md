# Resume Builder

## Overview

This repository is a web application with the goal of creating web-based resumes.
It focuses on providing an easy-to-use interface that requires no programming knowledge from the end-user, while also offering high levels of customizability.

## Demo

> TODO

## Installation

Latest version is [hosted on Firebase](https://cv-template-9f6e4.firebaseapp.com).

Run locally:

1. Have [Node.js 20](https://nodejs.org/en) installed
2. Install dependencies with `npm install`
3. Run with `npm run dev`

## Features

- Customizable layout with drag-and-drop elements
- Configurable colors and fonts
- Import, export or print the contents of the editor
- Fully offline, no server-side data storage

## Motivation

I obviously needed a resume and I thought it'd be cool to create one from scratch. From the very start I've preferred HTML and CSS over the dumpster fire MS Word is.
It started as a static HTML markup with some styles, which was fine for my single use case, but not for anything or anyone else.

So the idea of making it an actual application was born. It's a seemingly endless pursuit for more customizability, making it more complex with every step,
hence the insane amount of refactoring that was done as my end goal evolved.

## Tools used

Packages used in this project and their purpose. The project has minimal dependencies, as my focus is on understanding the code in depth as much as possible.

- **[Vue.js](https://vuejs.org) :: JavaScript framework.** A component-based approach was necessary for an app of this scale. I chose Vue due to its excellent documentation and intuitive features that work with reactive data.
- **[Vue draggable](https://github.com/SortableJS/vue.draggable.next) :: Drag-and-drop functionality.** Based on Sortable JS, it's simple and proved to be reliable, so it made sense to include it instead of trying to implement something similar by myself.
- **[Dexie.js](https://github.com/dexie/Dexie.js) :: Indexed DB wrapper.** Simplifies working with indexedDB with querying and promises instead of callbacks. Used together with @vueuse/rxjs to make queries reactive.
- **[msgpackr](https://github.com/kriszyp/msgpackr) :: Binary serializer.** Faster and smaller size compared to JSON. Can also handle binary data, like fonts.

## Application architecture

This is a monolithic application that follows a layered architecture, which is perfect for its current level of complexity.

- **Data access** - Completely client-side, using a combination of localStorage and indexedDB. I could use Firebase for storing it server-side, but none of the current features of the app require it.
- **Business logic** - Services are encapsulated in [composables](https://vuejs.org/guide/reusability/composables.html#what-is-a-composable) that components can import and use. 
- **Views** - Components use Vue's [composition API](https://vuejs.org/guide/introduction.html#api-styles) due to better logic reuse and more flexibility. Dependence on stateful logic is limited to composables.

## Development status

- [x] Prototype <br/>
- [x] Minimum viable product <br/>
- [ ] Feature complete <br/>
- [ ] Refinement and maintenance <br/>