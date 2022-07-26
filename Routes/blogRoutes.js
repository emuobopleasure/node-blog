const express = require('express')
const blogController = require('../Controllers/blogController')

const router = express.Router()


// blog routes
router.get('/blogs/create', blogController.blog_create_get)

router.get('/blogs', blogController.blog_index)

router.post('/blogs', blogController.blog_create_post)

router.get('/blogs/:id', blogController.blog_details)

router.delete('/blogs/:id', blogController.blog_delete)

module.exports = router