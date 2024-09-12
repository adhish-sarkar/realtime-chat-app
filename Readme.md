# Chat App

Welcome to the Chat App! This application allows users to communicate with each other in real-time through chat messages.

## Features

- User registration and authentication
- Real-time chat functionality
- User profiles with avatars
- Emoji support
- Message history

## Installation

1. Clone the repository: `git clone https://github.com/adhish-sarkar/realtime-chat-app.git`

## Client Installation

1. Go to client directory: `cd client`
2. Now install dipendency using: `npm install`
3. Add the .env file for client
4. Now run the client app using: `npm run dev`

## Server Installation

1. Go to the server directory: `cd server`
2. Now install dipendency using: `npm install`
3. Install nodemon as devdipendency: `npm install nodemon --save-dev`
4. Add .env file for server
5. Now run the server: `npm start`

## Usage

1. Register a new account or log in with your existing credentials.
2. Start a new chat or join an existing one.
3. Type your message in the input field and press Enter to send.
4. Enjoy real-time communication with other users!

## Technologies Used

- Node.js
- Express.js
- Socket.io
- MongoDB
- React
- CSS
- TailwindCss
- ShadeCn

## Server env file

```
PORT=8747
JWT_SECRET=your-jwt-secret-key
ORIGIN="http://localhost:5173"
DATABASE_URL="mongodb://localhost:27017/your-mongo-database-name"

```

## Client env file

```
VITE_SERVER="http://localhost:8747"

```
## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
