## Proposal:

1) **Title:** The title of your project.

Secure Note Generator

2) **Description:** A brief description of your project (the **WHAT!**)

This application has a front end that allows registered users to write a handful of secure notes. These notes are encrypted then stored in a database.
The application generates a secure link that can be sent to someone and used to open and read the note. After a certain amount of user specified time or 
an amount of user specified reads, the note is deleted from the database.

3) **Context:** The context of your project.  This should include the problem that your project is solving (the **WHY!**) and the intended users of your project (the **WHO!**).

This is a great tool, with endless possibilites. This tool is for anyone who wants to share a stand alone message with someone/some people that are privacy
oriented and are looking for a way to send short paragraph and want the benefits of a storing a note so that it can be accessed over a time period or a number of times.
This idea is to give users more confidence in their online privacy, who do not like current market offerings and are looking for a simple, no hassle all in one product.

4) **Features**: A list of features that your project will have (the **HOW!**).  This should include the CRUD operations that your project will implement.

The project will have a user register / login service which allows for creating user accounts and authenticating who the user is. The project will provide a dashboard
service that allows a user to see their current notes, see and update the time remaining/reads left on the note, and delete one or all notes. This project will also 
have a write note service which specialises in allowing a user to write a note, and recieve a uniquely generated link to said note to share to others.

5) **User Interface**: A description of the user interface of your project.  This should include a wireframe of your project.

link.com/ - A simple homepage, with a navbar at the top, boasting a login and register button. The main body will be a simple explaination of the project and it's
abilities, and a footer, with simple quicklinks and copyright. Based on users authentication at this page, the top nav bar will render lniks to the dashboard page and write note page.

link.com/login-register - A simple page that will feature a navbar at the top, that has a link back to the homepage. The main body of the page will be 2 side by side forms,
clearly labelled, one to login and one to register. Both forms will have 3 input fields and a submit button, the 3 fiels being username, password and an optional PIN. Once
a user is authenticated, they get redirected to the dashboard. Finally there is the same simple footer, with simple quicklinks and copyright.

link.com/user-id/dashboard - This page has a navbar, with links to the homepage and the write note page, as well as a logout button in place of the prior login/register button.
The main body of the page is a single column that features up to 5 notes that the user has created. These notes each display the time left on the note, the current reads left, 
and the link that was generated for the note. If there are no notes yet created, there will be a prompt to write their first note. Finally there is the same simple footer, with simple quicklinks and copyright.

link.com/user-id/writenote - This page will have a navbar with links to the homepage and the dashboard as well as a logout button in place of the prior login/register button.
The main body of this page features a simple text entry for the note, with 1 accompanying dropdown menu, of which featuring a timer for the notes lifespan with the maximum being 
a week, and a smaller digit entry that allows a number up to 99, or a checkbox beside it for an infinite number of reads that conditionally disables the digit entry box. And finally
would be a submit button, which once pressed, replaces all of the aforementioned inputs with a success message and their generated note link, or an error message. Finally there is the same simple footer, 
with simple quicklinks and copyright.

link.com/note/note-id - This page will have a navbar with links to the homepage and register/login. The main body content will be just the note. There will also be
the same simple footer, with simple quicklinks and copyright.

- Home page
![Homepage Wireframe](https://github.com/digital-futures-academy-se-2404-a/challenge-6-full-stack-capstone-project-eTiggs/blob/main/docs/images/HomepageWireframe.png)

- Login / Register page
![Register / Login Wireframe](https://github.com/digital-futures-academy-se-2404-a/challenge-6-full-stack-capstone-project-eTiggs/blob/main/docs/images/RegiLoginWireframe.png)

- Dashboard page
![Dashboard Wireframe](https://github.com/digital-futures-academy-se-2404-a/challenge-6-full-stack-capstone-project-eTiggs/blob/main/docs/images/DashboardWireframe.png)

- Write Note Page
![WriteNote Wireframe](https://github.com/digital-futures-academy-se-2404-a/challenge-6-full-stack-capstone-project-eTiggs/blob/main/docs/images/WriteNoteWireframe.png)

- Read Note Page
![ReadNote Wireframe](https://github.com/digital-futures-academy-se-2404-a/challenge-6-full-stack-capstone-project-eTiggs/blob/main/docs/images/ReadNoteWireframe.png)


6) **Architecture**: A description of the architecture of your project.  This should include a diagram of the architecture of your project.

//! TODO: FIND OUT WHAT ARCHITECTURE OF THE PROJECT MEANS AND CREATE

7) **RESTful Routing**: A list of the RESTful routes that your project will have, including the HTTP method, any headers and payloads expected in the request and the response that will be sent.

Routes:
- Endpoint: /auth/register
- HTTP Method: POST
- Headers: Content-Type: application/json
- Payload: {
  "username": "string",
  "password": "string",
  "pin": "string (optional)"
}
- Response: Success: 201 Created, Error: 400 Bad Request
- 
-
- Endpoint: /auth/login
- HTTP Method: POST
- Headers: Content-Type: application/json
- Payload: {
  "username": "string",
  "password": "string",
  "pin": "string (optional)"
}
- Response: Success: 200 OK {
  "token": "JWT token string"
  }, Error: 400 Bad Request
-
-
- Endpoint: /user-id/writenote
- HTTP Method: POST
- Headers: Content-Type: application/json, JWT auth token
- Payload: {
  "content": "string (the note content)",
  "expiresAt": "ISO 8601 date string (e.g., 2024-07-01T12:00:00Z)",
  "maxAccessCount": "integer"
}
- Response: Success: 200 OK {
  "link": "http://link.com/note/<note-id>"
  }, Error: 400 Bad Request
-
-
- Endpoint: /notes/note-id
- HTTP Method: GET
- Headers: N/A
- Payload: N/A
- Response: Success: 200 OK {
  "content": "string (the decrypted note content)"
}, Error: 404 Not Found or 400 Bad Request


- Endpoint: /notes/note-id
- HTTP Method: DELETE
- Headers: JWT auth token
- Payload: N/A
- Response: Success: 200 OK, Error: 404 Not Found or 400 Bad Request
-
-
- Endpoint: /user-id/dashboard
- HTTP Method: GET
- Headers: JWT auth token
- Payload: N/A
- Response: Success: 200 OK {
  "notes" : [
    {
      "_id": "string",
      "content": "string",
      "createdAt": "ISO 8601 date string",
      "expiresAt": "ISO 8601 date string",
      "accessCount": "integer",
      "maxAccessCount": "integer"
    },{
  ...
    }
  ]
}, Error: 400 Bad Request
-
-
8) **Technologies**: A list of the technologies that you will use in your project, including external dependencies and testing tools.

Tech Stack:
React.js/Bootstrap
Node.js/Express
MongoDB

Dependencies:
bcrypt - for hashing passwords
jsonwebtoken - for authentication
crypto - for AES-256 encryption

Testing:
chai
mocha
react testing library
jest

9) **Deployment**: A description of how you will deploy your project, including the cloud service(s) that you will use and any environment variables needed.

- Front-end: Vercel
- Back-end: Render
- Database: Mongodb Atlas
- Environment Variables: mongodb connection string
