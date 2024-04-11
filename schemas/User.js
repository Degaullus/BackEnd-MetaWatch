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

    if (password.length < 6) { // Example: only check for a minimum length of 6 characters
        throw new Error("Password must be at least 6 characters long");
    }

    const salt = await bcrypt.genSalt(10);
    
    const hash = await bcrypt.hash(password, salt);
    
    const user = await this.create({username,  email, password: hash });
    
    return user;
}

userSchema.statics.login = async function(identifier, password) {
    if (!identifier || !password) {
        throw new Error("All fields must be filled");
    }

    // Attempt to find the user by email or username
    const user = await this.findOne({ 
        $or: [{ email: identifier }, { username: identifier }] 
    });

    if (!user) {
        throw new Error("Username/email is incorrect or it doesn't exist");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error("Incorrect password");
    }

    return user;
}


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
