module.exports = {
  extends: "airbnb",
  rules: {
    "linebreak-style": "off",
    "react/jsx-filename-extension": "off",
    "react/prop-types": 0,
    "react/no-array-index-key": "off",
    "import/prefer-default-export": "off",
    quotes: ["warn", "backtick"],
  },
  env: {
    browser: true,
  },
  parser: "babel-eslint",
};
