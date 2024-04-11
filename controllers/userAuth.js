const jwt = require('jsonwebtoken');
const { User, Favorite } = require("../schemas/User");

const createToken = (id) => {
	return jwt.sign({ _id: id }, process.env.SECRET, {
		expiresIn: '1h'
	})
}

const loginUser = async (req, res) => {
	try {
			const { identifier, password } = req.body; // Use a single field for either username or email

			const userVerification = await User.login(identifier, password); // Verify user's identifier and password
			if (!userVerification) {
					throw new Error('Authentication failed');
			}
			
			// Populate favorites for the verified user
			const userWithFavorites = await User.findById(userVerification._id).populate('favorites');
			if (!userWithFavorites) {
					throw new Error('User not found');
			}

			const token = createToken(userWithFavorites._id);
			
			// Mapping through favorites to get tournament IDs if needed
			const favoriteTournamentIds = userWithFavorites.favorites.map(fav => fav._id.toString());
			const favCount = userWithFavorites.favorites.length;
							
			res.status(200).json({ username: userWithFavorites.username, email: userWithFavorites.email, token, favCount, favorites: favoriteTournamentIds, message: "logged in" })
	} catch (error) {
			res.status(400).json({ error: error.message })
	}
}

const signupUser = async (req, res) => {
	
	try {
		const { username, email, password, favCount, favorites } = req.body;
		const user = await User.signup(username, email, password);
		const token = createToken(user._id)
			
		console.log(` ${email} signed up`)
		res.status(200).json({username, email, token, favCount: 0, favorites: [], message: "signed up"})
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = { loginUser, signupUser };