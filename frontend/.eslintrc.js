module.exports = {
  extends: ["airbnb", "prettier"],
  rules: {
    "linebreak-style": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": 0,
    "react/no-array-index-key": "off",
    "import/prefer-default-export": "off",
  },
  env: {
    browser: true,
  },
  parser: "babel-eslint",
};
