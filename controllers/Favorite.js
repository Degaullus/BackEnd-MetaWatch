const { User } = require("../schemas/User");

const addFavorite = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        
        const result = await user.addFavorite(id);
        // console.log(result);
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message || "An unknown error occurred",
        });
    }
};


const remFavorite = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not found or not authenticated' });
        }
        
        console.log("Removing favorite ID:", req.body.removedFavorite); // Check the incoming data

        const userId = req.user._id;
        const { id } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const result = await user.remFavorite(id);
        console.log("Result:", result); // See the output of the operation
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error removing favorite:", error);
        res.status(500).json({
            message: error.message || "An unknown error occurred",
        });
    }
};

module.exports = { addFavorite, remFavorite };