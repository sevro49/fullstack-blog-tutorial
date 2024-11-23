const express = require('express');
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', blogController.getBlogs); // get all blogs
router.post('/add', authMiddleware, blogController.addBlog); // add a blog
router.delete('/delete/:blogId', authMiddleware, blogController.deleteBlog) // delete a blog

module.exports = router;