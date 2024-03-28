import Cloth from "../models/Cloth.js";

export const likeCloth = async (req, res) => {
  try {
    const user = req.user;
    const clothId = req.params.id;

    const cloth = await Cloth.findById(clothId);

    const isLiked = user.likedClothes.some((likedCloth) =>
      likedCloth.equals(cloth._id)
    );

    if (isLiked) {
      user.likedClothes.pull(cloth._id);
    } else {
      user.likedClothes.push(cloth._id);
    }

    await user.save();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
