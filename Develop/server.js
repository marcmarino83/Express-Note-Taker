const express = require('express');
const path = require('path');
const routes = require('./routes/index'); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Develop/public')));

// Use the routes
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

