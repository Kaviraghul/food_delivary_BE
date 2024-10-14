import foodModel from "../models/foodModel.js";
import fs from 'fs';

// add food item;
const addFood = async (req, res) => {

    console.log(req.body);
    console.log(req.file);

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })

    try {
        await food.save();
        res.json({success:true, message: "Food added"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error"})
    }
}

// all food list

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data: foods});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

// remove food items

const removeFood = async (req, res) => {

    console.log("Request Body:", req.body.id); // Use req.body to log the incoming data

    try {
        const food = await foodModel.findById(req.zbody.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) console.log(err);
        });
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error occurred" });
    }
};


export {addFood, listFood, removeFood}