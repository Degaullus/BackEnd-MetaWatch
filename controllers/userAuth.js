const jwt = require('jsonwebtoken');
const { User, Favorite } = require("../schemas/User");

const createToken = (id) => {
	return jwt.sign({ _id: id }, process.env.SECRET, {
		expiresIn: '1h'
	})
}

const loginUser = async (req, res) => {
	
	try {
		const { username, email, password } = req.body

		const userVerification = await User.login(username, email, password); // Verify user's email and password
		if (!userVerification) {
				throw new Error('Authentication failed');
		}
		const userWithFavorites = await User.findOne({ email }).populate('favorites');

		if (!userWithFavorites) {
			throw new Error('User not found');
	}

	const token = createToken(userWithFavorites._id);

	// Mapping through favorites to get tournament IDs if needed
	const favoriteTournamentIds = userWithFavorites.favorites.map(fav => fav._id.toString());
	
	const favCount = userWithFavorites.favorites.length;
			
		res.status(200).json({username, email, token, favCount, favorites: favoriteTournamentIds, message: "logged in"})
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

const signupUser = async (req, res) => {
	
	try {
		const { email, password, favCount, favorites } = req.body;
		const user = await User.signup(email, password);
		const token = createToken(user._id)
			
		console.log(` ${email} signed up`)
		res.status(200).json({email, token, favCount: 0, favorites: [], message: "signed up"})
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = { loginUser, signupUser };