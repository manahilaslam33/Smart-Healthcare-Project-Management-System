const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
const charterRoutes = require('./routes/charterRoutes');
app.use('/api/project', charterRoutes);
const planRoutes = require('./routes/planRoutes');
app.use('/api/project', planRoutes);
const requirementRoutes = require('./routes/requirementRoutes');
app.use('/api/requirements', requirementRoutes);
const changeRoutes = require('./routes/changeRoutes');
app.use('/api/changes', changeRoutes);
const activityRoutes = require('./routes/activityRoutes');
app.use('/api/activities', activityRoutes);
const costRoutes = require('./routes/costRoutes');
app.use('/api/cost', costRoutes);
const qualityRoutes = require('./routes/qualityRoutes');
app.use('/api/quality', qualityRoutes);
const reportRoutes = require('./routes/reportRoutes');
app.use('/api/reports', reportRoutes);

// MongoDB Database se connection
mongoose.connect('mongodb://localhost:27017/healthcare_pm')
.then(() => console.log('MongoDB Connected successfully!'))
.catch((err) => console.log('DB Connection Error: ', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});