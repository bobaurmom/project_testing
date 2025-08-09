const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const bcrypt = require('bcrypt');
const users = []; 

const app = express();
const port = 3000;

app.get('/', (_, res) => {
  res.send('WASSAP WORLD')
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.use(express.json());
app.post('/api/register', async (req, res) => {
    try {
        const { id,username, password, email } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        if (users.find(u => u.username === username)) {
            return res.status(409).send('Username already exists.');
        }
        const newUser = {
            id: users.length + 1,
            username,
            passwordHash: hashedPassword,
            email
        };
        users.push(newUser);
        if (users.find(u => u.username === username)) {
            return res.status(201).send('User created successfully.');
        } else if (users.find(u => u.email === email)) {
            return res.status(409).send('Email already exists.');
        }
    } catch (error) {
        res.status(500).send('Error creating user');
    }
});
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(400).send('Invalid username or password');
        }
        const match = await bcrypt.compare(password, user.passwordHash);
        if (match) {
            // will use JWT for token instead but will use dummy for now
            const token = 'dummy-token';
            res.status(200).json({ message: 'Login successful!', token });
        } else {
            res.status(400).send('Invalid username or password.');
        }
    } catch (error) {
        res.status(500).send('Login error.');
    }
});
