import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { name, email, password, age, gender, height, weight, goal } = req.body;

        // 1. Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 2. Initial BMI & Calorie Calculations
        const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
        
        // Basic Mifflin-St Jeor (Sedentary example)
        let bmr = (10 * weight) + (6.25 * height) - (5 * age);
        gender === 'male' ? bmr += 5 : bmr -= 161;
        
        // 3. Create User
        const newUser = await User.create({
            name, email, password: hashedPassword,
            age, gender, height, weight, goal,
            bmi, maintenanceCalories: Math.round(bmr)
        });

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};