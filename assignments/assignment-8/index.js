import express from "express";
import { postsRouter } from "./routes/post.routes.js";
import { authorRouter } from "./routes/author.routes.js";
import { tagRouter } from "./routes/tag.routes.js";

const app = express();
app.use(express.json());
const PORT = 3000;

app.use("/posts", postsRouter);
app.use("/authors", authorRouter);
app.use("/tags", tagRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
