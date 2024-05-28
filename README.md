# Tinder-like Application

## Project Overview

This project implements a simplified version of a Tinder-like application using Node.js, Express.js, and MongoDB. The focus is on designing the database structure and implementing a query to retrieve a paginated list of users for interactions.

## Database Schema

The database includes three main collections:

- `User`: Stores user information including age, gender, and location.
- `Interaction`: Stores interactions between users (like, superlike, dislike).
- `Block`: Stores block information indicating which user has blocked another user.

## Query Implementation

The `getPaginatedUsers` function retrieves a paginated list of users based on the following criteria:

- Filters users by age range, gender, and distance from the current user.
- Excludes users that the current user has already interacted with.
- Excludes users that the current user has blocked or who have blocked the current user.
- Sorts users so that those who have superliked the current user appear first.
- Implements pagination with 20 users per page.

## Performance Considerations

The implementation is optimized to handle:

- Approximately 30,000 overall users.
- About 3 million interactions between users.
- Support for around 10,000 simultaneous active users, with each user making a request every 2 seconds.

## Usage

### Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up MongoDB and update the connection string in `src/app.js`.
4. Run the application using `node index.js`.

### API Endpoint

To retrieve a paginated list of users, send a GET request to:
