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
      outlay,
      sizes,
      colors,
      category,
    } = req.body;
    const clothId = req.params.id;
    const cloth = await Cloth.findByIdAndUpdate(clothId, {
      name: name,
      cost: cost,
      outlay: outlay,
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
      outlay,
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
      sizes,
      cost,
      outlay,
      count,
      colors,
      category,
      description,
    });

    if (cloth) {
      res.status(201).json(req.body);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteClothes = async (req, res) => {
  try {
    const { ids } = req.body;

    if (ids.length > 0) {
      const deleteResult = await Cloth.deleteMany({
        _id: { $in: ids.map((id) => id) },
      });
      console.log(`Удалено ${deleteResult.deletedCount} товара(-ов)`);
      res
        .status(200)
        .json({ message: `Удалено ${deleteResult.deletedCount} товара(-ов)` });
    } else {
      res.status(401).json({ message: "Нечего удалять" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
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
      await user.save();
      res.status(200).json(`Товар "${cloth.name}" убран из избранного`);
    } else {
      user.likedClothes.push(cloth._id);
      await user.save();
      res.status(200).json(`Товар "${cloth.name}" добавлен в избранное`);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
