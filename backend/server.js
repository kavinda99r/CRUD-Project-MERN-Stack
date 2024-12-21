const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Add this import
const dotenv = require('dotenv');
const itemRoutes = require('./routes/ItemRoutes');

dotenv.config();

const app = express();
app.use(cors());  // Add this line to enable CORS
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
