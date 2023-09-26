const express = require('express');
const postRoutes = require('./routes/post.routes');
const authorRoutes = require('./routes/author.routes');
const tagRoutes = require('./routes/tag.routes');

const app = express();
app.use(express.json());
const PORT = 3000;


app.use('/posts', postRoutes);
app.use('/authors', authorRoutes);
app.use('/tags', tagRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


2. Service Layer (e.g., post.service.js)
const fs = require('fs').promises;
const path = require('path');

const POSTS_FILE = path.join(__dirname, '../data/posts.json');

async function getAllPosts() {
    const data = await fs.readFile(POSTS_FILE, 'utf8');
    return JSON.parse(data).posts;
}

// Add methods for create, update, delete...

module.exports = {
    getAllPosts,
    // ... other methods
};


3. Controller Layer (e.g., post.controller.js)
const postService = require('../services/post.service');

async function getAllPosts(req, res) {
    try {
        const posts = await postService.getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Add controllers for create, update, delete...

module.exports = {
    getAllPosts,
    // ... other controllers
};



4. Routes Layer (e.g., post.routes.js)

const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.get('/', postController.getAllPosts);
// Define routes for create, update, delete...

module.exports = router;

5. UUID Generation (e.g., when creating a new post)

const { v4: uuidv4 } = require('uuid');

const newPostId = uuidv4();









Next steps: 

1. Create a Post (post.service.js)

const { v4: uuidv4 } = require('uuid');

async function createPost(postData) {
    const posts = await getAllPosts();
    const newPost = {
        id: uuidv4(),
        ...postData
    };
    posts[newPost.id] = newPost;
    await fs.writeFile(POSTS_FILE, JSON.stringify({ posts }));
    return newPost;
}


2. Read a Specific Post by UUID (post.service.js)

async function getPostById(postId) {
    const posts = await getAllPosts();
    return posts[postId];
}

3. Update a Post (post.service.js)


async function updatePost(postId, updatedData) {
    const posts = await getAllPosts();
    if (!posts[postId]) {
        throw new Error('Post not found');
    }
    posts[postId] = { ...posts[postId], ...updatedData };
    await fs.writeFile(POSTS_FILE, JSON.stringify({ posts }));
    return posts[postId];
}

4. Delete a Post (post.service.js)


async function deletePost(postId) {
    const posts = await getAllPosts();
    if (!posts[postId]) {
        throw new Error('Post not found');
    }
    delete posts[postId];
    await fs.writeFile(POSTS_FILE, JSON.stringify({ posts }));
}


Controller Layer (post.controller.js)


// Create a Post
async function createPost(req, res) {
    try {
        const post = await postService.createPost(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Read a Specific Post by UUID
async function getPostById(req, res) {
    try {
        const post = await postService.getPostById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Update a Post
async function updatePost(req, res) {
    try {
        const post = await postService.updatePost(req.params.id, req.body);
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Delete a Post
async function deletePost(req, res) {
    try {
        await postService.deletePost(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

Routes Layer (post.routes.js)

router.post('/', postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
















