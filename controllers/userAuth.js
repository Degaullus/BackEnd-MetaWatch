const jwt = require('jsonwebtoken');
const { User, Favorite } = require("../schemas/User");

const createToken = (id) => {
	return jwt.sign({ _id: id }, process.env.SECRET, {
		expiresIn: '1h'
	})
}

const loginUser = async (req, res) => {
	try {
		console.log('Received signup data: ', req.body)
			const { username, email, password } = req.body; // Updated to receive username and email separately

			const identifier = username || email; // Determine which identifier to use
			const userVerification = await User.login(identifier, password);

			if (!userVerification) {
					throw new Error('Authentication failed');
			}

			const userWithFavorites = await User.findById(userVerification._id).populate('favorites');
			if (!userWithFavorites) {
					throw new Error('User not found');
			}

			const token = createToken(userWithFavorites._id);
			const favoriteTournamentIds = userWithFavorites.favorites.map(fav => fav._id.toString());
			const favCount = userWithFavorites.favorites.length;

			res.status(200).json({
					username: userWithFavorites.username,
					email: userWithFavorites.email,
					token,
					favCount,
					favorites: favoriteTournamentIds,
					message: "logged in successfully"
			});
	} catch (error) {
			res.status(400).json({ error: error.message, message: "Failed to log in" });
	}
};


const signupUser = async (req, res) => {
	
	try {
		console.log(req.body)
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