// index.js
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import cors from 'cors';

// mock data
const kids = Array.from({ length: 50 }).map((_, index) => ({
  kidId: index + 1,
  name: getRandomName(),
  birthDate: getRandomDate(new Date(2000, 0, 1), new Date(2010, 0, 1)).toISOString()
}));

function getRandomName() {
    const names = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank", "Grace", "Hannah", "Ian", "Jasmine"];
    return names[Math.floor(Math.random() * names.length)];
}

function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const screenshots = Array.from({ length: 500 }).map((_, index) => {
  const kid = kids[Math.floor(Math.random() * kids.length)]; 

  return {
    id: index + 1,
    kidId: kid.kidId,
    kidName: kid.name,
    thumbnailUrl: `https://picsum.photos/200/200`,
    createdAt: getRandomDate(new Date(2020, 0, 1), new Date(2023, 11, 31)).toISOString()
  };
});

// GraphQL Schema
const schema = buildSchema(`
  type Screenshot {
    id: ID!
    kidId: Int!
    kidName: String!
    thumbnailUrl: String!
    createdAt: String!
  }

  type PaginatedScreenshots {
    totalCount: Int!
    screenshots: [Screenshot!]!
  }

  type Query {
    getScreenshot(id: ID!): Screenshot
    getScreenshots(page: Int!, limit: Int!): PaginatedScreenshots
  }

  type Mutation {
    addScreenshot(kidId: Int!, thumbnailUrl: String!, createdAt: String!): Screenshot
  }
`);


// Resolvers
const root = {
  getScreenshot: ({ id }) => {
    return screenshots.find(screenshot => screenshot.id === id);
  },
  getScreenshots: ({ page, limit }) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      totalCount: screenshots.length,  
      screenshots: screenshots.slice(start, end)
    };
  },
  addScreenshot: ({ kidId, thumbnailUrl, createdAt }) => {
    const newScreenshot = {
      id: screenshots.length + 1, 
      kidId,
      thumbnailUrl,
      createdAt
    };
    screenshots.push(newScreenshot);
    return newScreenshot;
  },
};


// App Express
const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, 
}));

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000/graphql');
});
