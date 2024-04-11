const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const Tournament = require('./Tournament');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TournamentResult'
    }]
});

const favoriteSchema = new mongoose.Schema({
    list: [{
        type: String,
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }
});

// to create a new method for the signup
userSchema.statics.signup = async function(username, email, password) {
    const exists = await this.findOne({ email }); // Fixed method call
    
    if (exists) {
        throw new Error('Email already in use');
    }
    
    if (!email || !password) { // Corrected syntax
        throw new Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) { // Corrected syntax
        throw new Error("Invalid Email");
    }
    
    // if (!validator.isStrongPassword(password, {
    //     minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
    // })) {
    //     throw new Error("Make sure to use at least 8 characters, one upper case, one lower case, a number, a symbol");
    // }

    if (password.length < 6) { // Example: only check for a minimum length of 6 characters
        throw new Error("Password must be at least 6 characters long");
    }

    const salt = await bcrypt.genSalt(10);
    
    const hash = await bcrypt.hash(password, salt);
    
    const user = await this.create({username,  email, password: hash });
    
    return user;
}

userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw new Error("All fields must be filled");
    }
    
    const user = await this.findOne({ email });
    
    if(!user) {
        throw new Error("Email is incorrect or it doesn't exist");
    }
    
    const match = await bcrypt.compare(password, user.password);
    
    if(!match) {
        throw new Error("Incorrect password");
    }
    
    return user;
}

userSchema.methods.addFavorite = async function(addedFavorite) {
    const isAlreadyFavorite = this.favorites.some(fav => fav.equals(addedFavorite));
    if (!isAlreadyFavorite) {
        this.favorites.push(addedFavorite);
        await this.save();
        return { message: "Added to favorites successfully." };
    } else {
        return { message: "Already in favorites, try adding another one." };
    
    }
};

userSchema.methods.remFavorite = async function(removedFavorite) {
    const favoritesBefore = this.favorites.length;
    this.favorites = this.favorites.filter(fav => !fav.equals(removedFavorite));
    if (favoritesBefore === this.favorites.length) {
        return { message: "Favorite not found." };
    } else {
        await this.save();
        return { message: "Removed from favorites successfully." };
    }
};

module.exports = {
    User: mongoose.model("User", userSchema),
    Favorite: mongoose.model("Favorite", favoriteSchema)
};
