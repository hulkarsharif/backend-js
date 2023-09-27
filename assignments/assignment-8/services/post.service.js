import { v4 as uuid } from "uuid";
import { promises as fs } from "fs";
// import { threadId } from "worker_threads";

class PostService {
    async readAndParseFile() {
        try {
            const data = await fs.readFile("./data/posts.json", "utf-8");
            const parsedData = JSON.parse(data);
            return parsedData.posts;
        } catch (err) {
            return err;
        }
    }
    async writeFile(data) {
        try {
            const result = await fs.writeFile(
                "./data/posts.json",
                JSON.stringify({ posts: data })
            );
            return result;
        } catch (error) {
            return error;
        }
    }

    async getAllPosts() {
        return await this.readAndParseFile();
    }
    async getPostById(postId) {
        try {
            const posts = await this.readAndParseFile();
            return posts[postId];
        } catch (error) {
            throw error;
        }
    }
    async createPost(data) {
        try {
            const postObj = await this.readAndParseFile();
            const id = uuid();
            const newPost = {
                id,
                ...data
            };
            postObj[id] = newPost;
            await this.writeFile({ postObj });

            return newPost;
        } catch (error) {
            throw error;
        }
    }
    async updatePostById(postId, data) {
        try {
            const postObj = await this.readAndParseFile();
            if (postObj.hasOwnProperty(postId)) {
                const updatedPost = {
                    ...postObj[postId],
                    ...data
                };
                postObj[postId] = updatedPost;
                await this.writeFile(postObj);
                return updatedPost;
            }
        } catch (error) {
            throw error;
        }
    }
    async deletePostById(postId) {
        try {
            const postObj = await this.readAndParseFile();
            if (postObj.hasOwnProperty(postId)) {
                delete postObj[postId];
                await this.writeFile(postObj);
                return "Post was deleted";
            }
        } catch (error) {
            throw error;
        }
    }
}

export const postService = new PostService();
