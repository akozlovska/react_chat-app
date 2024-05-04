# React Chat App

This is a React-based web application designed to facilitate real-time communication through text-based chat. It enables user to perform standard CRUD operations with rooms, direct chats with other users and messages in the chats, offering a seamless chatting experience with features tailored for smooth user interaction and engagement.

## Features

- **Fallback UI and Error Handling**: Implements React Suspense and React Error Boundary to enable lazy loading, provide fallback UI for a loading state, gracefully handle errors, ensuring a stable and uninterrupted chat experience for users.
- **Routing**: Utilizes React Router DOM for smooth navigation between pages.
- **UI Theming**: Offers a customizable UI with Theme UI, allowing users to personalize their chat environment according to their preferences.
- **Animations**: Enhances user experience with engaging animations powered by Framer Motion, adding a touch of dynamism to the interface.
- **Data Fetching**: Efficiently fetches and caches chat messages and user data using Axios and Tanstack Query, ensuring optimal performance and responsiveness.
- **Form Handling**: Implements Formik for streamlined form handling, enabling smooth user interactions when sending messages or performing other actions.
- **Form Validation**: Utilizes Yup for creating schemas ensuring reliable input values validation.
- **Real-time Communication**: Integrates WebSocket API for real-time chat functionality, enabling instant message delivery and updates for all users in the chat room.

## Getting Started

To run this application locally, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Add the .env file with REACT_APP_API_URL variable to point to your backend server ([backend server repository](https://github.com/akozlovska/node_chat/tree/develop)).
4. Run the application using `npm start`.
