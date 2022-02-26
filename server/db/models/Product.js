const Sequelize = require("sequelize");
const { STRING, ENUM, TEXT, DECIMAL, INTEGER, UUID, UUIDV4, BOOLEAN, ARRAY } =
  Sequelize;
const db = require("../db");
const imgs = [
  "https://poshleaf-images.s3.amazonaws.com/the-sill_monstera-adansonii_variant_small_grant_black_768x.jpeg",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_pilea-peperomioides_gallery_small_03_1024x.jpeg",
  "https://poshleaf-images.s3.amazonaws.com/the-sill_white-orchid_small_bryant_black_720x.jpg.webp",
];

const Product = db.define("product", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  slug: {
    type: STRING,
    unique: true,
  },
  description: {
    type: TEXT,
  },
  type: {
    type: ENUM(["INDOOR", "SUCCULENT", "HERB"]),
  },
  price: {
    type: DECIMAL(20, 2),
    allowNull: false,
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  size: {
    type: ENUM(["X-SMALL", "SMALL", "MEDIUM", "LARGE"]),
  },
  isPetFriendly: {
    type: BOOLEAN,
    defaultValue: false,
  },
  light: {
    type: ENUM(["LOW", "INDIRECT", "DIRECT"]),
  },
  difficulty: {
    type: ENUM(["EASY", "MODERATE", "EXPERT"]),
  },
  imageUrl: {
    type: ARRAY(Sequelize.TEXT),
    validate: {
      isUrl: true,
    },
    defaultValue: [],
  },
  imageUrl: {
    type: ARRAY(Sequelize.TEXT),
    validate: {
      isUrl: true,
    },
    defaultValue: imgs,
  },
  isNew: {
    type: BOOLEAN,
    defaultValue: false,
  },
  isStaffFavorite: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Product;
