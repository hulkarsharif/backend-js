import { Router } from "express";

import { postController } from "../controller/post.controller.js";

const postsRouter = new Router();

postsRouter.get("/", postController.getAllPosts);
postsRouter.get("/:postId", postController.getPostById);
postsRouter.post("/", postController.createPost);
postsRouter.put("/:postId", postController.updatePostById);
postsRouter.delete("/:postId", postController.deletePostById);

export { postsRouter };
