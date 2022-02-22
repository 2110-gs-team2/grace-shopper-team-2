const Sequelize = require("sequelize");
const { STRING, ENUM, TEXT, DECIMAL, INTEGER, UUID, UUIDV4, BOOLEAN, ARRAY } =
  Sequelize;
const db = require("../db");
const imgs = [
  "https://bloomscape.com/wp-content/uploads/2020/12/bloomscape_dracaena-gold-lemon-lime_stone-resize-e1625252440907.jpg?ver=372948",
  "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_dracaena-gold-lemon-lime_detail.jpg?ver=279520",
  "https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_dracaena-gold-lemon-lime_detail.jpg?ver=279520",
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
