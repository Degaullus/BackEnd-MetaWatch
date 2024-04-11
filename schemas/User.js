const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const Tournament = require('./Tournament');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9]+$/i.test(v) && v.length >= 3 && v.length <= 30;
            },
            message: props => `${props.value} is not a valid username. Only alphanumeric characters are allowed, and the length must be between 3 and 30 characters.`
        }
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
    if (!username || !email || !password) {
        throw new Error("All fields must be filled");
    }
    
    if (!validator.isEmail(email)) {
        throw new Error("Invalid Email");
    }

    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }

    const emailOrUsernameExists = await this.findOne({ $or: [{ email }, { username }] });
    
    if (emailOrUsernameExists) {
        throw new Error('Email or username already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    const user = await this.create({ username, email, password: hash });
    return user;
}

userSchema.statics.login = async function(identifier, password) {
    if (!identifier || !password) {
        throw new Error("All fields must be filled");
    }

    const user = await this.findOne({ $or: [{ email: identifier }, { username: identifier }] });

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
    this.favorites = this.favorites.filter(fav => !fav.equals(removedFavorite));
    const changesMade = this.isModified('favorites');
    await this.save();
    return changesMade ? { message: "Removed from favorites successfully." } : { message: "Favorite not found." };
};

module.exports = {
    User: mongoose.model("User", userSchema),
    Favorite: mongoose.model("Favorite", favoriteSchema)
};
