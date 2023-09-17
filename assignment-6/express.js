import express from "express";
import { cars } from "./data";

const app = express();
app.use(express.json());

const PORT = 4000;

app.get("/cars", (res) => {
    const allCars = Object.values(cars);
    res.status(200).json({ data: allCars });
});

app.get("/cars/:carId", (req, res) => {
    const carId = req.params.carId;
    if (!validate(carId) || !cars[carId]) {
        return res.status(400).json({ message: "Not a valid car ID" });
    }
    res.status(200).json({ data: cars[carId] });
});

app.post("/cars", (req, res) => {
    const data = req.body;
    const id = uuid();
    const car = {
        id,
        ...data
    };
    cars[id] = car;
    res.status(201).json({ data: car });
});

app.get("/cars/:carId", (req, res) => {
    const carId = req.params.carId;
    if (!validate(carId) || !cars[carId]) {
        return res.status(400).json({ message: "Not a valid car ID" });
    }
    res.status(200).json({ data: cars[carId] });
});

app.put("/cars/:carId", (req, res) => {
    const carId = req.params.carId;
    const updatedData = req.body;
    if (!validate(carId) || !cars[carId]) {
        return res.status(400).json({ message: "Not a valid cars ID" });
    }
    cars[carId] = { ...cars[carId], ...updatedData };
    res.status(200).json({ data: cars[carId] });
});

app.delete("/cars/:carId", (req, res) => {
    const carId = req.params.carId;
    if (!validate(carId) || !cars[carId]) {
        return res.status(400).json({ message: "Not a valid customer ID" });
    }
    delete cars[carId];
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
