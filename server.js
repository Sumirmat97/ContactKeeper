const express = require('express');
const connnectDB = require('./config/db');

const app = express();

// Connect to DB
connnectDB();

//Init middleware
app.use(express.json({extended :false}));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));