const { User } = require("../schemas/User");

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
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message || "An unknown error occurred",
        });
    }
};

module.exports = { addFavorite, remFavorite };