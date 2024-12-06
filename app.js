const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('your_mongodb_connection_string', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(blogRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

