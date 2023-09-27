# Teleo App Project

Teleo is an application where therapists and kids can participate in various activities during remote therapy sessions. Features include drawing, completing worksheets, watching videos, playing games, and more. This repository contains both the frontend and the backend code for the application.

## Features

- **Screenshots**: Teleo offers a feature to save a screenshot of a completed activity. This screenshot can then be viewed in future sessions.
- **Kids Profile**: Contains basic details of the kid including name and birth date.
- **Server**: The backend is implemented using Node with Express, offering a GraphQL API to interact with a PostgreSQL database.
- **Frontend**: The frontend is built using React.

## Setup & Running the App

### Prerequisites

Make sure you have `yarn` installed. If not, install it using:

`npm install -g yarn`

### Installation

Clone the repository and install the dependencies:

`git clone [repository_url] cd Teleo yarn install`

### Running the App

1. **Frontend**: Start the React frontend using:

`yarn dev`

2. **Server**: To get the server up and running, use:

`yarn server`

### Runinig test

`yarn test`

After starting both services, you can access the frontend application in your browser and interact with the backend via GraphQL.

## SQL Queries for PostgreSQL

Given our table structure:

- **kids**: with columns `kidId`, `name`, and `birthDate`
- **screenshots**: with columns `id`, `kidId`, `thumbnailUrl`, and `createdAt`

### 1. Fetching Screenshots with Kid Information

To obtain screenshots and the associated kid's details (for pagination), the SQL query would look like:

sqlCopy code

`SELECT      s.id,      s.kidId,      k.name AS kidName,     s.thumbnailUrl,     s.createdAt FROM      screenshots s JOIN      kids k ON s.kidId = k.kidId LIMIT x OFFSET y;`

Where 'x' is the number of rows per page and 'y' is the offset based on the page number.

### 2. Counting the Total Number of Screenshots

To assist with pagination, we often require the overall number of rows (in this case, screenshots). The total count of screenshots can be fetched using:

sqlCopy code

`SELECT COUNT(*) FROM screenshots;`

### 3. Fetching Specific Kid Information

To retrieve the details of a specific `kid` based on their `kidId`, the SQL query would be:

sqlCopy code

`SELECT * FROM kids WHERE kidId = z;`

Where 'z' is the specific kid's ID.

**Note:** These are fundamental queries and might be adjusted or expanded upon based on specific needs. When interacting with a live database, one must also account for potential SQL injection attacks by using parameterized queries or prepared statements, especially when processing user inputs.
