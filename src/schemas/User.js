const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
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
        ref: 'Favorite'
    }]
});

const favoriteSchema = new mongoose.Schema({
    list: [{
        type: String,
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// to create a new method for the signup
userSchema.statics.signup = async function(email, password) {
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
    
    // Fixed the check to correctly throw an error if the password is NOT strong
    if (!validator.isStrongPassword(password, {
        minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
        throw new Error("Make sure to use at least 8 characters, one upper case, one lower case, a number, a symbol");
    }
    const salt = await bcrypt.genSalt(10);
    
    const hash = await bcrypt.hash(password, salt);
    
    const user = await this.create({ email, password: hash });
    
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

module.exports = mongoose.model("User", userSchema);
module.exports = mongoose.model("Favorite", favoriteSchema);
