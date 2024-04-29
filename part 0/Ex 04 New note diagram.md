sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: status code 302 / URL redirect
    deactivate server

    Note left of server: the server asks the browser to perform a new HTTP GET request to the address defined in the header's Location - the address notes.
    Note left of server: The code on the server responsible for the POST request
    Note left of server: Data is sent as the body of the POST request. 
    Note left of server: The server can access the data by accessing the req.body field of the request object req.
    Note left of server: The server creates a new note object, and adds it to an array called notes.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "konnichiwa", "date": "2024-04-27T18:33:42.736Z" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes


# I type in 'abc' in the box and click Save. The Form Data dropdown in the Payload tab: note: abc
# this is the RESPONSE tab of the data.json.
# [
#    {
#        "content": "konnichiwa",
#        "date": "2024-04-27T18:33:42.736Z"
#    },
#   ...
#   ...
#   {
#        "content": "<h1>HGS</h1>",
#        "date": "2024-04-28T09:27:59.947Z"
#    },
#    {
#        "content": "abc",
#        "date": "2024-04-28T09:29:59.574Z"
#    }
# ]