import { v4 as uuid } from "uuid";
import fs from "fs";
import { log } from "console";

class PostService {
    readAndParseFile = async () => {
        try {
            const data = await fs.readFile("./data/posts.json", "utf-8");
            const parseData = JSON.parse(data);
            console.log(parseData);
            return parseData.posts;
        } catch (err) {
            console.log(err);
            return err;
        }
    };
    async getAllPosts() {
        return await this.readAndParseFile();
    }
}
export const postService = new PostService();
