Skills and Technologies: PostgreSQL: For database management. Node.js: Server-side environment. Express: Web framework for building the API. Jest: For testing. Husky: For git hooks to prevent broken code. Git: Version control for managing branches and pull requests. Supertest: For API testing. Project Description: I built the back-end API for Northcoders News, a social news platform similar to Reddit. The API interacted with a PostgreSQL database and allowed users to access, create, update, and delete articles, comments, and topics. The API was built with Express in Node.js, and testing was done using Jest and Supertest. Husky was used to ensure no broken code was committed. Project Overview: This API supported CRUD operations, enabling users to fetch articles, filter them, add comments, and manage content through various endpoints. It was designed to mimic a real-world service like Reddit, focusing on backend functionality for a news aggregation platform.

Setting Up Environment Variables and Connecting to Databases Locally
1. Clone the Repository:
    Type the following in the terminal:
    bash
    Copy code
    git clone https://github.com/Poddyman0/be-nc-news-portfolio-project
    cd be-nc-news-portfolio-project/.env.development

2. Create a PostgreSQL Database:
    Create a PostgreSQL database with a name that matches your data file. You can use a tool like psql or a GUI client. Make sure you have PostgreSQL installed and running.

    Type the following in the terminal:

3. Create .env File:
    In the root directory of your project, create a .env file if it doesn't already exist.

4. Add Environment Variables:
    Inside the .env file, add the following environment variables and code:
        PGDATABASE=nc_news
        DB_FILE_PATH= /be-nc-news/
    
5. Install Dependencies:
    Run the following command to install the required dependencies from the package.json file:
        npm install

6. Database Connection Setup:
    In your project, ensure that the database connection is established properly using the environment variables. Look for the file responsible for establishing the database connection (often found in a db.js, connection.js, or similar file) and modify it to use the PGDATABASE and DB_FILE_PATH environment variables.

7. Create Controllers and Models:
    Set up the necessary controllers and models to interact with your database. Create these files if they don't exist already.

8. Seed the Database:
    If your project requires seeding data into the database, create a seeding script (often named seed.js or similar). Run the script to populate your database with initial data.

9. Set Up Jest Tests (Optional):
    If your project includes Jest tests, ensure that the tests are correctly configured to use the environment variables for database connections.

10. Start the Application:
    Start your application using the appropriate command (often npm start or node index.js).

11. Handling Missing Environment Variables:
    If the PGDATABASE environment variable is missing, your application should handle this case and display an error message to the user, indicating that the database cannot be accessed without the necessary environment variables.
    
    Example error message in your code:
        if (!process.env.PGDATABASE) {
        console.error("Error: PGDATABASE environment variable is missing. Cannot access the database.");
        process.exit(1); // Exit the application with an error code
        }

12. The minimum versions of Node.js, and Postgres needed to run the project:
        Node.js: "^3.0.1",
        Postgress: "^8.7.3"

13. link to hosted version of app: https://be-nc-news-tnfa.onrender.com

14. Project Summary:
    # BE2-NC-Knews

## Northcoders News API

### Background

We will be building the API to use in the Northcoders News Sprint during the Front End block of the course.

Our database will be PSQL, and you will interact with it using [Knex](https://knexjs.org).

### NOTE:

For this sprint ensure you have the eslint extension installed in VS-Code as it will help to enforce best practices when you are writing your code.

### Step 1 - Seeding

Data has been provided for both testing and development environments so you will need to write a seed function to seed your database. You should think about how you will write your seed file to use either test data or dev data depending on the environment that you're running in.


1. You should have separate tables for topics, articles, users and comments, and you will need to think carefully about the order in which you seed your data.

- Each topic should have:

  - `slug` field which is a unique string that acts as the table's primary key
  - `description` field which is a string giving a brief description of a given topic

- Each user should have:

  - `username` which is the primary key & unique
  - `avatar_url`
  - `name`

- Each article should have:
  - `article_id` which is the primary key
  - `title`
  - `body`
  - `votes` defaults to 0
  - `topic` field which references the slug in the topics table
  - `username` field that references a user's primary key.
  - `created_at` defaults to the current date

* Each comment should have:
  - `comment_id` which is the primary key
  - `username` field that references a user's primary key
  - `article_id` field that references an article's primary key
  - `votes` defaults to 0
  - `created_at` defaults to the current date
  - `body`

- NOTE: psql expects Date types to be in a date format - not a timestamp! However, you can easily turn a timestamp into a date using js...


### Step 2 - Building and Testing

1.  Build your Express app
2.  Mount an API Router onto your app
3.  Define the routes described below
4.  Define controller functions for each of your routes.
5.  Use proper project configuration from the offset, being sure to treat development and test differently.
6.  Test each route **as you go**, checking both successful requests and the variety of errors you could expect to encounter.

**HINT** You will need to take advantage of knex migrations in order to efficiently test your application.

### Routes

Your server should have the following end-points:

```http
GET /api/topics
```

- responds with an array of topic objects - each object should have a `slug` and `description` property.

```http
GET /api/topics/:topic/articles
```

- responds with an array of article objects for a given topic
- each article should have:
  - `author` which is the `username` from the users table,
  - `title`
  - `article_id`
  - `votes`
  - `comment_count` which is the accumulated count of all the comments with this article_id. You should make use of knex queries in order to achieve this.
  - `created_at`
  - `topic`

Queries

- This route should accept the following queries:
  - `limit`, which limits the number of responses (defaults to 10)
  - `sort_by`, which sorts the articles by any valid column (defaults to date)
  - `p`, stands for page which specifies the page at which to start (calculated using limit)
  - `sort_ascending`, when "true" returns the results sorted in ascending order (defaults to descending)


## IMPORTANT:
* Both `comments` and `articles` data in the test-data are given ordered in descending order of time : this will be useful to you when it comes to writing your tests!


```http
POST /api/topics/:topic/articles
```

- accepts an object containing a `title` , `body` and a `username` property
- responds with the posted article

```http
GET /api/articles
```

- responds with an array of article objects
- each article should have:
  - `author` which is the `username` from the users table,
  - `title`
  - `article_id`
  - `body`
  - `votes`
  - `comment_count` which is the accumulated count of all the comments with this article_id. You should make use of knex queries in order to achieve this.
  - `created_at`
  - `topic`

Queries

- This route should accept the following queries:
  - `limit`, which limits the number of responses (defaults to 10)
  - `sort_by`, which sorts the articles by any valid column (defaults to date)
  - `p`, stands for page which specifies the page at which to start (calculated using limit)
  - `sort_ascending`, when "true" returns the results sorted in ascending order (defaults to descending)


```http
PATCH /api/articles/:article_id
```

- accepts an object in the form `{ inc_votes: newVote }`
  - `newVote` will indicate how much the `votes` property in the database should be updated by
    E.g `{ inc_votes : 1 }` would increment the current article's vote property by 1
    `{ inc_votes : -100 }` would decrement the current article's vote property by 100

```http
POST /api/articles/:article_id/comments
```

- accepts an object with a `username` and `body`
- responds with the posted comment

```http
PATCH /api/articles/:article_id/comments/:comment_id
```

- accepts an object in the form `{ inc_votes: newVote }`
  - `newVote` will indicate how much the `votes` property in the database should be updated by
    E.g `{ inc_votes : 1 }` would increment the current article's vote property by 1
    `{ inc_votes : -1 }` would decrement the current article's vote property by 1

```http
DELETE /api/articles/:article_id/comments/:comment_id
```

- should delete the given comment by `comment_id`
- should respond with an empty object

```http
GET /api/users
```

- should respond with an array of user objects
- each user object should have
  - `username`
  - `avatar_url`
  - `name`

```http
GET /api
```

- Serves JSON describing all the available endpoints on your API

### Step 3 - Hosting

Make sure your application and your database is hosted using heroku

link to hosted version of app: https://be-nc-news-tnfa.onrender.com

### Step 4 - Preparing for your review and portfolio

Finally, you should write a README for this project (and remove this one). The README should be broken down like this: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2

It should also include the link where your herokuapp is hosted.
        
