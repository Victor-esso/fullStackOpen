0.5: Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    Note right of browser: The browser reads the document rendering the content and fetching necessary files(e.g *.css , *.js , *images) from the server.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the .css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the .js file
    deactivate server

    Note right of browser: The browser begins running the JavaScript code and fetches the notes from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "Buy a new car", "date": "2024-11-21" }, ... ]
    deactivate server

    Note right of browser: The browser converts the json and executes the callback function that renders the notes on the page
````

0.6: New note in Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user enters a new note and submits (clicks save)

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of server: The server validates and insert the new note to the database
    server-->>browser: { "content": "A new note", "date": "2024-11-21" }
    deactivate server

    Note right of browser: The browser appends the new note to the existing note list.
```