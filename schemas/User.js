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
