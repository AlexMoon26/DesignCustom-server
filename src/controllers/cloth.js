import Cloth from "../models/Cloth.js";

export const getAllCloth = async (req, res) => {
  try {
    const clothes = await Cloth.find({});
    res.status(200).json({ clothes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const editCloth = async (req, res) => {
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
    const clothId = req.params.id;
    const cloth = await Cloth.findByIdAndUpdate(clothId, {
      name: name,
      cost: cost,
      pictures: pictures,
      count: count,
      description: description,
      sizes: sizes,
      colors: colors,
      category: category,
    });

    if (cloth) {
      return res.status(200).json({ message: "Товар изменен" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
