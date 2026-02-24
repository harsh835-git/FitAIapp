import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    // Health Profile
    age: { type: Number },
    gender: { type: String, enum: ['male', 'female'] },
    height: { type: Number }, // in cm
    weight: { type: Number }, // in kg
    goal: { 
        type: String, 
        enum: ['Weight Loss', 'Muscle Gain', 'Body Recomposition', 'Maintain', 'Endurance'] 
    },
    activityLevel: { type: String },
    
    // Dynamic Calculations
    bmi: { type: Number },
    maintenanceCalories: { type: Number },
    targetCalories: { type: Number },
    
    // Habit Intelligence
    habitScore: { type: Number, default: 0 },
    streak: { type: Number, default: 0 }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);