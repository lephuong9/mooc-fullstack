sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: a JSON file
    deactivate server


# I type in 'abc123' in the box and click Save. The Payload tab show this: 
# content: "abc123"
# date: "2024-04-28T14:16:26.718Z"
# Preview tab show: message: "note created"