require('dotenv').config();
const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const app = express();

// Middleware
app.use(express.json());
+app.use(express.json());
+app.use(express.urlencoded({ extended: false }));
+// —— 新增：表单解析 & 会话支持 ——
+app.use(session({
+  secret: '请换成你自己的强随机串',
+  resave: false,
+  saveUninitialized: false
+}));
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;