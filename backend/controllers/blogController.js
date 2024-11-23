// Desc: Controller to add blog, get all blogs and delete a blog

const Blog = require('../models/Blog');

// List blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find(); // Fetch all blogs from database
    res.status(200).json({ blogs }); // Send success response, with blogs
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs', details: error.message }); // Send error response
  }
}

const addBlog = async (req, res) => {
  const { title, content } = req.body; // Get title and content from request body
  const userId = req.user.id; // Get user id from request object (from authMiddleware)

  try {
    const newBlog = new Blog({ title, content, user: userId }); // Create new blog object
    await newBlog.save(); // Save blog to database

    res.status(201).json({ message: 'Blog added successfully', blog: newBlog }); // Send success response
  } catch (error) {
    res.status(500).json({ error: 'Failed to add blog', details: error.message }); // Send error response
  }
};

// Delete blog by id
const deleteBlog = async (req, res) => {
  const { blogId } = req.params; // Get blog id from request parameters
  console.log('Blog ID from params:', blogId);  // Konsola ID'yi basıyoruz
  try {
    // Find blog by id without using callback
    const blog = await Blog.findById(blogId);  // Find blog by id using async/await

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' }); // Send error response if blog not found
    }

    // Check if the user is authorized to delete the blog
    if (blog.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'You are not authorized to delete this blog' }); // Unauthorized user
    }

    await blog.deleteOne(); // Delete blog from database
    res.status(200).json({ message: 'Blog deleted successfully' }); // Success response
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog', details: error.message }); // Send error response in case of an exception
  }
};

module.exports = { addBlog, getBlogs, deleteBlog };