const Shop = require("../models/shop-model");
const { validationResult } = require("express-validator");
const _ = require("lodash");

const shopsCltr = {};
shopsCltr.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { body } = req;
    const ownerId = req.user && req.user.id
    body.ownerId = ownerId
    body.approvalStatus = "pending";
    const shop = new Shop(body);
    const response = await shop.save();
    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

shopsCltr.getShopsByOwner = async (req, res) => {
  try {
    const ownerId = req.user && req.user.id; // Get ownerId from authenticated user
    const shops = await Shop.find({ ownerId }); // Find shops by ownerId
    res.json(shops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: "Internal Server Error" });
  }
};
shopsCltr.update = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    const { body } = req;

    const ownerId = req.user && req.user.id;
    const shop = await Shop.findOneAndUpdate({ _id: id, ownerId }, body, {
      new: true,
    });
    if (!shop) {
      return res
        .status(404)
        .json({ errors: "Shop not found or you are not the owner" });
    }
    res.status(200).json(shop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errors: "Internal server error" });
  }
};

shopsCltr.updateStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const id = req.params.id;
    const body = _.pick(req.body, ["approvalStatus"]);
    const shop = await Shop.findOneAndUpdate({ _id: id }, body, { new: true });
    res.status(200).json(shop);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: "Internal server error" });
  }
};

shopsCltr.destroy = async (req, res) => {
  try {
    const id = req.params.id;
    const ownerId = req.user && req.user.id;

    const shop = await Shop.findOneAndDelete({ _id: id, ownerId });

    if (!shop) {
      return res
        .status(404)
        .json({ errors: "Shop not found or you are not the owner" });
    }
    res.json(shop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: "Internal Server Error" });
  }
};

module.exports = shopsCltr;
