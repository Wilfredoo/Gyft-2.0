# Gyft

Gyft is a full-stack web application designed to help users create and share gift wish lists with their friends. Users can add gifts they'd like to receive, view friends' wish lists, and invite others to join the platform.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Backend](#backend)
- [Frontend](#frontend)
- [Contributing](#contributing)

## Features

- **User Authentication**: Users can sign up using phone numbers or WhatsApp.
- **Wish Lists**: Users can create and manage their own gift wish lists.
- **Friend Integration**: View friends' wish lists and invite others to join the platform.

## Tech Stack

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - TypeScript
  - 
  
  
  
  
  
  
  
  
  
  
 for Authentication (optional)
  
- **Frontend**:
  - React (with hooks)
  - TypeScript
  - CSS Modules / Styled Components

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/Wilfredoo/Gyft-2.0.git
cd Gyft-2.0
```

### 2. Install Dependencies

Both frontend and backend have their own `package.json` files, so you’ll need to install dependencies for both parts:

#### Backend Setup

1. Navigate to the backend folder:

    ```bash
    cd gyft-backend
    ```

2. Install the backend dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `gyft-backend` folder to store environment variables:

    ```bash
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/gyft?retryWrites=true&w=majority
    PORT=5000
    ```

4. Start the backend:

    ```bash
    npx ts-node src/server.ts
    ```

#### Frontend Setup

1. Navigate to the frontend folder:

    ```bash
    cd ../gyft-frontend
    ```

2. Install the frontend dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm start
    ```

## Backend

The backend for Gyft is built using **Node.js**, **Express**, and **MongoDB**. It handles user authentication, data storage, and API endpoints for managing wish lists.

### Key Endpoints

- `POST /gifts`: Create a new gift.
- `GET /gifts`: Retrieve the list of gifts for the authenticated user.
- `GET /friends/:friendId/wishlists`: View a friend's wish list.

### Mongoose Models

- **User**: Stores user information such as phone number and authentication details.
- **Gift**: Represents each gift a user wants to receive, including the title, description, and occasion.

## Frontend

The frontend of Gyft is built using **React** and **TypeScript**. It communicates with the backend via API calls to display user wish lists and friends' wish lists.

### Key Features

- **User Interface**: Users can log in, view, and manage their wish lists.
- **Friends Integration**: Users can view their friends' wish lists and invite others to join.

### Running the Frontend

To run the frontend, simply navigate to the `gyft-frontend` folder and use `npm start` to start the development server.

```bash
cd gyft-frontend
npm start
```

---