const authRoutes = require('./authRoutes');
const blogRoutes = require('./blogRoutes');

module.exports = (app) => {
  app.use("/api/auth", authRoutes);
  app.use("/api/blogs", blogRoutes);
};