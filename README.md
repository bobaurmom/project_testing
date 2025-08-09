#How to Set Up Environment for Express, Node.js, bcrypt, and Swagger

1.**Install Node.js**
    - Download and install Node.js from https://nodejs.org/
2. **Initialize Project**
    - Open terminal and run:
      npm init -y
3. **install Dependencies**
    - Run the following command to install required packages plz
      npm install express bcrypt swagger-ui-express swagger-jsdoc
4. Create .env File
    - In your project root, create a `.env` file for environment variables (e.g., PORT, JWT_SECRET).
5. Set Up Express Server
    - Create an `index.js` or `app.js` file and set up a basic Express server.
6. integrate bcrypt
    - Use `bcrypt` for password hashing in your authentication logic.
7. Set Up Swagger Documentation
    - Use `swagger-ui-express` and `swagger-jsdoc` to serve API documentation.
8. Run the Server
    - Start your server with:
      node server.js


