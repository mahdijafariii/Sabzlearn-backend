# SabzLearn Backend

The SabzLearn backend project! This Node.js application uses Express to power the backend for the [SabzLearn](http://www.sabzlearn.ir) website, providing a robust API for managing various resources.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [API Routes](#api-routes)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and management
- Course and category management
- Commenting system for courses and articles
- Notifications and ticket management
- Contact form handling
- Discount management
- Article and order management
- and ...
## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (Node package manager)
- Set up environment variables by creating a .env file in the project root and adding the following values: ->[PORT , MONGO_URL , JWT_SECRET]


### Installation

- Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/SabzLearn.git
   cd SabzLearn
   npm install 
   npm start
   ```
   The server will run on http://localhost:YOUR_PORT.

The application exposes various API routes for handling different functionalities:

## API Routes


- **Authentication**: `/api/auth`
- **Users**: `/api/user`
- **Categories**: `/api/category`
- **Courses**: `/api/course`
- **Comments**: `/api/comment`
- **Contacts**: `/api/contact`
- **Notifications**: `/api/notification`
- **Discounts**: `/api/off`
- **Articles**: `/api/article`
- **Orders**: `/api/order`
- **Tickets**: `/api/ticket`
- **Menu**: `/api/menu`
