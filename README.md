
# CS571-S24 HW6: BadgerChat

Welcome to BadgerChat! This is your final React assignment that serves as a cumulative assessment of your knowledge and understanding of React. Understanding of React will be crucial for beginning with React Native.

For this assignment, you will complete a web application that allows badgers to chat with other badgers via different chatrooms. This assignment works with a *real* API! Please be mindful about what you post as this is a chat server shared by every student in CS571.

## BadgerChat

The starter code provided to you was generated using [vite](https://vitejs.dev/guide/). Furthermore, [bootstrap](https://www.npmjs.com/package/bootstrap), [react-bootstrap](https://www.npmjs.com/package/react-bootstrap), and [react-router](https://reactrouter.com/en/main) have already been installed. **You should *not* re-run the npm create vite command**. Instead, in this directory, simply run...

```bash
npm install
npm run dev
```

Then, in a browser, open `localhost:5173`. You should *not* open index.html in a browser; React works differently than traditional web programming! When you save your changes, they appear in the browser automatically. I recommend using [Visual Studio Code](https://code.visualstudio.com/) to do your development work.


All data can be retrieved via API calls to `https://cs571.org/api/s24/hw6/`. A brief overview of the API is provided below. Please refer to `API_DOCUMENTATION.md` for details.

All routes are relative to `https://cs571.org/api/s24/hw6/`

| Method | URL | Purpose | Return Codes |
| --- | --- | --- | --- |
| `GET`| `/chatrooms` | Get all chatrooms. | 200, 304 |
| `GET` | `/messages?chatroom=NAME&page=NUM`| Get latest messages for specified chatroom and page. | 200, 400, 404 |
| `POST` | `/messages?chatroom=NAME` | Posts a message to the specified chatroom. | 200, 400, 404, 413 |
| `DELETE` | `/messages?id=ID` | Deletes the given message. | 200, 400, 401, 404 |
| `POST` | `/register` | Registers a user account. | 200, 400, 409, 413  |
| `POST` | `/login` | Logs a user in. | 200, 400, 401 |
| `POST` | `/logout` | Logs the current user out. | 200 |
| `GET` | `/whoami` | Gets details about the currently logged in user. | 200 |


Implemented the following steps:

### 1. Display Chatrooms

In `BadgerApp.jsx`, create the *routes* for each chatroom, e.g. `chatrooms/Buckys Badger Den`. Displays navigation links for each route.

### 2. Display Badger Messages

Fetches the data for the first page of messages and display thems.

Used [react-bootstrap](https://www.npmjs.com/package/react-bootstrap) to make the design responsive.

### 3. Pagination

Added Pagination for better organization of chat rooms.

Not all pages may be populated, then the chatroom displays "There are no messages on  this page yet."


### 4. Registration

Allows a user to create a username, password, and confirm their password. Upon clicking a "Register" button, a `POST` is performed to create the user via the API.

Both the password and confirmation password [are masked](https://react-bootstrap.netlify.app/docs/forms/form-control#readonly-plain-text) and **NOT** shown in plaintext.

### 5. Login

Created a form using **uncontrolled** input components that allows a user to enter their username and password. Upon clicking a "Login" button, a `POST` is performed to authenticate the user via the API.

The password [is masked](https://react-bootstrap.netlify.app/docs/forms/form-control#readonly-plain-text) and **NOT** shown in plaintext.


### 6. Managing Logged In State

Upon receiving a successful `200` response for register or login, the user is automatically navigated back to the home page.

### 7. Logout

When the user navigates to the logout page, they should be logged out of the application. 


### 8. Create Posts

Allow an authenticated user to create posts. 

### Step 9: Delete Posts

A user may delete *their own* posts. 
