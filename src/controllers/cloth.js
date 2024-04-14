import Cloth from "../models/Cloth.js";

export const createCloth = async (req, res) => {
  try {
    const {
      name,
      cost,
      pictures,
      count,
      description,
      sizes,
      colors,
      category,
    } = req.body;

    console.log(pictures);
    const cloth = await Cloth.create({
      name,
      pictures,
      sizes: "M",
      cost,
      category,
    });

    if (cloth) {
      res.status(201).json(req.body);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

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
