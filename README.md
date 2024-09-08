# Resume Builder

## Overview

This repository is a web application with the goal of creating web-based resumes. 
It focuses on providing an easy-to-use interface that requires no programming knowledge from the end-user, while also offering high levels of customizability.

## Features

- Customizable layout with drag-and-drop elements
- Configurable colors and fonts
- Import, export or print the contents of the editor
- Fully offline, no server-side data storage

## Tools used

Packages used in this project and their purpose. The project has minimal dependencies, as my focus is on understanding the code in depth as much as possible, instead of abstracting it away.

- **[Vue.js](https://vuejs.org) :: JavaScript framework.** A component-based approach was necessary for an app of this scale. I chose Vue due to its excellent documentation and intuitive features that work with reactive data.
- **[Tailwind CSS](https://tailwindcss.com) :: CSS framework.** Using mostly predefined classes and limiting custom styles to component scopes essentially eliminates CSS bugs. Also allows easy theming, which is used extensively in the app.
- **[Vue draggable](https://github.com/SortableJS/vue.draggable.next) :: Drag-and-drop functionality.** Based on Sortable JS, it's simple and proved to be reliable, so it made sense to include it instead of trying to implement something similar by myself.
- **[Dexie.js](https://github.com/dexie/Dexie.js) :: Indexed DB wrapper.** Greatly simplifies working with indexed DB. Allows querying and based on promises instead of callbacks. Used together with @vueuse/rxjs to make queries reactive.

## Design considerations

Components use Vue's composition API due to better logic reuse and generally more flexibility. 

## Usage

Latest version is hosted on [Firebase](https://cv-template-9f6e4.firebaseapp.com).

Run locally:

1. Have Node.js installed
2. Install dependencies with `npm install`
3. Run with `npm run dev`