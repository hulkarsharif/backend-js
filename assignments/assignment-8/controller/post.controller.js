import { postService } from "../services/post.service.js";
import { sanitizedObj } from "../utils/sanitizeObj.js";
import { POST_FIELDS } from "../const/allowedFields.js";

class PostController {
    getAllPosts = async (req, res) => {
        try {
            const allposts = await postService.getAllPosts();
            res.status(200).json({ data: allposts });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    };

    getPostById = async (req, res) => {
        try {
            const postId = req.params.postId;
            const data = await postService.getPostById(postId);
            res.status(404).json({ post: data });
        } catch (error) {
            throw error;
        }
    };
    createPost = async (req, res) => {
        try {
            const data = sanitizedObj(POST_FIELDS, req.body);
            const newPost = await postService.createPost(data);
            res.status(201).json({ data: newPost });
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    };
    updatePostById = async (req, res) => {
        try {
            const data = sanitizedObj(POST_FIELDS, req.body);
            const postId = req.params.postId;
            const updatedPost = await postService.updatePostById(postId, data);
            res.status(200).json({ updatedPost: updatedPost });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    };

    deletePostById = async (req, res) => {
        try {
            const postId = req.params.postId;
            const deletePost = await postService.deletePostById(postId);
            res.status(204).send();
        } catch (err) {
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    };
}

export const postController = new PostController();
