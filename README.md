#### Goals

-   Build a client-side web-framework similar to React/Angular.
-   It needs to be able to fetch data, render content, and handle user events.

#### Model vs. View Classes

-   Model classes will handle data and are used to represent Users, Blog Posts, Images, etc.
-   View classes will handle HTML and events caused by the user (like clicks).

#### Extraction approach

1. Build a User as a 'mega' class with tons of methods
2. Refactor User to use composition
3. Refactor User to be a reusable class that can represent any piece of data, not just a User.

#### Seting up json server to load local json database.

    json-server -w .\db.json

#### Serialize vs. Deserialize

-   Serialize: convert data from an object into some save-able format (JSON).
-   Deserialize: put data on an object using some previously saved data (JSON).

#### Reminder on how 'this' works in JavaScript

    const colors = {
        color: 'red',
        printColor() {
            console.log(this.color);
        }
    }
    // 'this' is equal to whatever's left of our function call
    colors.printColor();    // 'red'

    const printColor = colors.printColor;
    printColor();           // Error, trying to reference undefined.color

#### Options for using Composition with Classes:

1. Accept dependencies as second constructor arguments.
2. Only accept dependencies into constructor and define a static class method to pre-configure User and assign properties afterwards.
3. Only accept properties into constructor and hard-code dependencies as class properties.
