<h1 align="center" id="title">Expense Tracker App</h1>

<p id="description">This repository contains the backend code for an Expense Tracker application. The server is built using Node.js and Express.js and utilizes MongoDB as the database. The app provides functionality to manage budgets and expenses and requires user authentication to access certain routes. The app also supports session management using Redis for better scalability.</p>

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the repository to your local machine:</p>

```
git clone https://github.com/yadavhrsit/ExpanseTracker-Backend
```

<p>2. Install the dependencies:</p>

```
npm install
```
<p>3. Install and Start Redis:</p>
Make sure to install Redis on your local machine. You can download and install Redis from the official website: https://redis.io/download

After installation, start the Redis server.

<p>4. Set up environment variables:</p>
Create a .env file in the root directory and add the following environment variables:


```
PORT=8000
DB="mongodb+srv://your-mongodb-connection-string" 
SECRET="your-session-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

<p>5. Project Directory</p>

```
cd ExpanseTracker-Backend
```

<p>6. Start the server:</p>

```
npm start
```

<h2>API Endpoints:</h2>
<h3>Auth Routes</h3>
<pre><b>Register a new user</b>
URL: /auth/register
Method: POST
Request Body:
{
  "name": "Your Name",
  "email": "user@example.com",
  "password": "your-password"
}
</pre>
<pre><b>Login with existing user</b>
URL: /auth/login
Method: POST
Request Body:
{
  "email": "user@example.com",
  "password": "your-password"
}
</pre>
<pre><b>Logout</b>
URL: /auth/logout
Method: GET</pre>
<h3>Budget Routes</h3>
<pre><b>Add a new budget</b>
URL: /budget/add
Method: POST
Request Body:
{
  "name": "Monthly Expenses",
  "amount": 1000
}
</pre>
<pre><b>Update an existing budget</b>
URL: /budget/update
Method: PATCH
Request Body:
{
  "id": "budget-id",
  "amount": 1200
}
</pre>
<pre><b>Delete a budget</b>
URL: /budget/delete
Method: DELETE
Request Body:
{
  "budgetId": "budget-id"
}
</pre>
<pre><b>View all budgets</b>
URL: /budget/viewall
Method: GET</pre>
<pre><b>View a specific budget</b>
URL: /budget/view/:budgetId
Method: GET</pre>
<h3>Expense Routes</h3>
<pre><b>Add a new expense</b>
URL: /expense/add
Method: POST
Request Body:
{
  "description": "Grocery Shopping",
  "amount": 50,
  "budgetId": "budget-id"
}
</pre>
<pre><b>Update an existing expense</b>
URL: /expense/update
Method: PATCH
Request Body:
{
  "expenseId": "expense-id",
  "description": "Grocery Shopping",
  "amount": 60,
  "budgetId": "new-budget-id"
}
</pre>
<pre><b>Delete an expense</b>
URL: /expense/delete
Method: DELETE
Request Body:
{
  "expenseId": "expense-id"
}
</pre>
<pre><b>View all expenses</b>
URL: /expense/viewall
Method: GET</pre>
<pre><b>View a specific expense</b>
URL: /expense/view/:expenseId
Method: GET</pre>
<h2>User Password Encryption:</h2>
<p>
This application ensures the security of user passwords by encrypting them before storing in the database. Passwords are not stored in plain text; instead, they are hashed using a strong cryptographic hashing algorithm. This approach ensures that even if the database is compromised, user passwords remain secure and cannot be easily retrieved.
</p>

<h2>Authentication</h2>
<p>
The app uses Passport.js for user authentication and supports both local email-password authentication and Google Sign-In using OAuth2. 
To enable Google Sign-In, provide the Google Client ID and Google Client Secret in the .env file.
</p>

<h2>Rate Limiter</h2>
<p>The server implements rate limiting to protect against abuse and ensure fair usage of the API. The rate limiter has the following configuration:</p>

- `windowMs`: 15 minutes
- `max`: 100 requests per 15 minutes

This means that each IP address is limited to 100 requests within a 15-minute window. If a user exceeds the request limit, they will receive a 429 (Too Many Requests) status code for subsequent requests within the window.
The rate limiter middleware is applied to all API endpoints to prevent excessive requests and enhance the server's security and performance.

<h2>Transactions</h2>
<p>In this application, the management of expenses is performed with a strong emphasis on data integrity and security through the use of transactions. When users interact with their expenses, such as adding or updating them, the application employs a robust transactional approach to maintain consistency and reliability in the database.</p>

<h2>Session Management</h2>
<p>The app uses Redis for session storage to enhance performance and scalability. Redis must be installed and running on the local machine.</p>

<h2>Authorization and Security</h2>
<p>This application utilizes session-based authorization to protect budget and expenses routes. Only logged-in users can access these routes. Unauthorized requests will receive a 401 (Unauthorized) status code.

<h2>Express Validator</h2>
<p>The APIs are integrated with express-validator, which ensures that incoming requests are properly validated. This validation helps prevent potential security vulnerabilities and enhances the reliability of the application.</p>

<h2>Models</h2>
<p>The models folder contains the User, Budget, and Expense models used to interact with the database.</p>

<h2>Controllers</h2>
<p>The controllers folder contains the controllers for adding, updating, viewing, and deleting budgets and expenses. These controllers are used in the respective routes for handling different API requests.</p>

<h2>Database</h2>
<p>The app connects to a MongoDB database. Make sure to provide the MongoDB connection string in the .env file.</p>
