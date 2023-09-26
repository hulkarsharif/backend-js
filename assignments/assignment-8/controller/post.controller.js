import { postService } from "../services/post.service.js";
class PostController {
    getAllPosts = async (req, res) => {
        try {
            const posts = await postService.getAllPosts();
            res.status(200).json({ data: posts });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    };
}
export const postController = new PostController();
