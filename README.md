### Installation instructions

Install node(for reference:https://nodejs.org/en/)

```sh
$ cd front-end-execise
$ npm install
$ npm start
```

visit http://localhost:8080/

### Architecture details

Header.js- component will store Header content.<br/>
TodoList.js - component creating child components.<br/>
TodoDetail.js - component responsible for checked/unchecked properties information.<br/>
Main.js- component initiates TodoList component.<br/>

### Implemented Fetaures

1. On page load, the checklist of items should be displayed.
1. When the user selects a checkbox, the item should appear crossed out, as shown in the design.
1. When the user selects a checkbox, holds down the `SHIFT` key and selects a checkbox further down the list, every item in between should also be selected.
1. The un/check all button should either check or uncheck all items.
1. As the viewport changes (i.e. mobile->tablet->desktop sizes), we should see some responsive considerations (we don't have anything specific in mind, so we'll leave this up to you!).

## Implemented  Nice to have Features

- you can maintain the state of checked items when we reload the page
- you can develop this component in a way that it (or pieces of it) could be reused elsewhere in our project

