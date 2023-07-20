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

<p>3. Set up environment variables:</p>
Create a .env file in the root directory and add the following environment variables:


```
PORT=8000
DB="mongodb+srv://your-mongodb-connection-string" 
SECRET="your-session-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

<p>4. Project Directory</p>

```
cd ExpanseTracker-Backend
```

<p>5. Start the server:</p>

```
npm start
```

<h2>API Endpoints:</h2>

<h3>Auth Routes</h3>

<pre><b>Register a new user</b>
URL: /auth/register
Method: POST
Request Body:</pre>
<pre>
{
  "email": "user@example.com",
  "password": "your-password"
}
</pre>

<pre><b>Login with existing user</b>
URL: /auth/login
Method: POST
Request Body:</pre>
<pre>
{
  "email": "user@example.com",
  "password": "your-password"
}
</pre>

<pre><b>Logout</b>
URL: /auth/logout
Method: POST</pre>

<h3>Budget Routes</h3>

<pre><b>Add a new budget</b>
URL: /budget/add
Method: POST
Request Body:</pre>
<pre>
{
  "name": "Monthly Expenses",
  "amount": 1000
}
</pre>

<pre><b>Update an existing budget</b>
URL: /budget/update
Method: POST
Request Body:</pre>
<pre>
{
  "id": "budget-id",
  "amount": 1200
}
</pre>

<pre><b>Delete a budget</b>
URL: /budget/delete
Method: POST
Request Body:</pre>
<pre>
{
  "budgetId": "budget-id"
}
</pre>

<pre><b>View all budgets</b>
URL: /budget/viewall
Method: GET</pre>

<pre><b>View a specific budget</b>
URL: /budget/view
Method: POST
Request Body:</pre>
<pre>
{
  "id": "budget-id"
}
</pre>

<h3>Expense Routes</h3>

<pre><b>Add a new expense</b>
URL: /expense/add
Method: POST
Request Body:</pre>
<pre>
{
  "description": "Grocery Shopping",
  "amount": 50,
  "budgetId": "budget-id"
}
</pre>

<pre><b>Update an existing expense</b>
URL: /expense/update
Method: POST
Request Body:</pre>
<pre>
{
  "expenseId": "expense-id",
  "description": "Grocery Shopping",
  "amount": 60,
  "date": "2023-07-20",
  "categoryId": "category-id"
}
</pre>

<pre><b>Delete an expense</b>
URL: /expense/delete
Method: POST
Request Body:</pre>
<pre>
{
  "expenseId": "expense-id"
}
</pre>

<pre><b>View all expenses</b>
URL: /expense/viewall
Method: POST
Request Body:</pre>
<pre>
{
  "paginate": {
    "value": true,
    "limit": 10,
    "currentPage": 1
  },
  "sortingCriteria": "date",
  "filter": "true",
  "filterCriteria": {
    "date-range": "2023-07-01-2023-07-20",
    "category": "Groceries",
    "amount-range": "0-100"
  }
}
</pre>

<pre><b>View a specific expense</b>
URL: /expense/view
Method: POST
Request Body:</pre>
<pre>
{
  "expenseId": "expense-id"
}
</pre>
<h2>User Password Encryption:</h2>
<p>
This application ensures the security of user passwords by encrypting them before storing in the database. Passwords are not stored in plain text; instead, they are hashed using a strong cryptographic hashing algorithm. This approach ensures that even if the database is compromised, user passwords remain secure and cannot be easily retrieved.
</p>
<h2>Authentication</h2>
<p>
The app uses Passport.js for user authentication and supports both local email-password authentication and Google Sign-In using OAuth2. 
To enable Google Sign-In, provide the Google Client ID and Google Client Secret in the .env file.
</p>

<h2>Session Management</h2>
<p>The app uses Redis for session storage to enhance performance and scalability. Redis must be installed and running on the local machine.</p>

<h2>Models</h2>
<p>The models folder contains the User, Budget, and Expense models used to interact with the database.</p>


<h2>Controllers</h2>
<p>The controllers folder contains the controllers for adding, updating, viewing, and deleting budgets and expenses. These controllers are used in the respective routes for handling different API requests.</p>

<h2>Database</h2>
<p>The app connects to a MongoDB database. Make sure to provide the MongoDB connection string in the .env file.</p>
