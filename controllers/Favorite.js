const { User } = require("../schemas/User");

const getFavorite = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate('favorites');

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            message: "User found",
            data: user.favorites,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "An unknown error occurred",
        });
    }
};


const addFavorite = async (req, res) => {
    try {
        const userId = req.user._id;
        const { addedFavorite } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        
        const result = await user.addFavorite(addedFavorite);
        console.log(result);
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message || "An unknown error occurred",
        });
    }
};


const remFavorite = async (req, res) => {
    try {
        const userId = req.user._id;
        const { removedFavorite } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const result = await user.remFavorite(removedFavorite);
        console.log(result);
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message || "An unknown error occurred",
        });
    }
};

module.exports = { addFavorite, remFavorite };