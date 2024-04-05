const jwt = require('jsonwebtoken');
const { User, Favorite } = require("../schemas/User");

const createToken = (id) => {
	return jwt.sign({ _id: id }, process.env.SECRET, {
		expiresIn: '1h'
	})
}

const loginUser = async (req, res) => {
	
	try {
		const { email, password, favorites } = req.body
		const user = await User.login(email, password);
		const token = createToken(user._id)
			
		res.status(200).json({email, token, favorites, message: "logged in"})
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

const signupUser = async (req, res) => {
	
	try {
		const { email, password } = req.body;
		const user = await User.signup(email, password);
		const token = createToken(user._id)
			
		console.log(` ${email} signed up`)
		res.status(200).json({email, token})
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = { loginUser, signupUser };