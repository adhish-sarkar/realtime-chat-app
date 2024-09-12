import e from "express";
import { mongo,mongoose } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        trim: true
    },
    firstName: {
        type: String,
        // required: [true, 'Please enter your first name'],
        trim: true
    },
    lastName: {
        type: String,
        // required: [true, 'Please enter your last name'],
        trim: true
    },
    image: {
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpk.ign.com%2Favatar-generations&psig=AOvVaw0KzlRttuzsTm9SfV2LR4XU&ust=1726152665274000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNDZpfeRu4gDFQAAAAAdAAAAABAE'
    },
    color: {
        type: String,
        default: '#000000'
    },
    profileSetup: {
        type: Boolean,
        default: false
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


const User = mongoose.model('User', userSchema);


export default User;