import express from "express";
import { stories } from "./data.js";
import { validate, v4 as uuid } from "uuid";

const app = express();
app.use(express.json());

const port = 4040;

const newId = uuid();
const subId = uuid();

app.get("/stories", (res) => {
    res.status(200).json({ data: filteredBooks });
});

app.post("/stories", (req, res) => {
    const newStory = req.body;
    stories[newId] = newStory;
    res.status(201).json({ data: newStory });
});
app.get("/stories/:storiesId", (req, res) => {
    const storyId = req.params.storyId;
    if (!validate(storyId) || !stories[storyId]) {
        return res.status(400).json({ message: "Not a valid book ID" });
    }
    res.status(200).json({ data: stories[storyId] });
});

app.put("/stories/:storiesId", (req, res) => {
    const storyId = req.params.storyId;
    const updatedData = req.body;
    if (!validate(storyId) || !stories[storyId]) {
        return res.status(400).json({ message: "Not a valid book ID" });
    }
    stories[storyId] = { ...stories[storyId], ...updatedData };
    res.status(200).json({ data: stories[storyId] });
});

app.get("stories/subtasks", (res) => {
    const allSubTasks = {};

    for (const storyId in stories) {
        const story = stories[storyId];

        const tasksObj = story.tasks;

        for (const taskId in tasksObj) {
            const task = tasksObj[taskId];

            allSubTasks[newId] = task;
        }
    }
    res.status(200).json({ data: allSubTasks });
});

app.post("stories/subtasks", (req, res) => {
    for (const storyId in stories) {
        const story = stories[storyId];
        const tasksObj = story.tasks;
        const newSubTask = req.body;
        tasksObj[subId] = newSubTask;
    }
    res.status(200).json({ data: newSubTask });
});

app.put("/stories/subtasks/:storiesId", (req, res) => {
    for (const storyId in stories) {
        const story = stories[storyId];
        const tasksObj = story.tasks;
        const subtaskId = req.params.subtaskId;
        const updatedData = req.body;
        if (tasksObj[subtaskId]) {
            tasksObj[subtaskId].status = updatedData;
        }

        res.status(200).json({ data: stories[storyId] });
    }
});

app.get("/stories/subtasks/:storiesId", (req, res) => {
    for (const storyId in stories) {
        const story = stories[storyId];
        const tasksObj = story.tasks;
        const subtaskId = req.params.subtaskId;
        const subtasks = tasksObj[subtaskId];

        res.status(200).json({ data: subtasks });
    }
});
app.delete("/stories/subtasks/:subtasksId", (req, res) => {
    for (const storyId in stories) {
        const story = stories[storyId];
        const tasksObj = story.tasks;

        const subtaskId = req.params.subtasksId;
        delete tasksObj[subtaskId];
        res.status(204).send();
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
