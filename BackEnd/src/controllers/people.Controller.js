import User from "../models/UserModel.js";

export const getPeople = async (req, res) => {
    try {
        const people = await User.find();
        if (!people) return res.status(404).json({ message: "People no found" });
        res.json(people);
      } catch (error) {
        console.error({
          message: "Something went wrong on getPeople",
          errorMessage: error.message,
        });
        res.status(500).json({
          message: "Something went wrong on getPeople",
          errorMessage: error.message,
        });
      }
};
