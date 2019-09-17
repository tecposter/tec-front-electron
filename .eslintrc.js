module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest": true
  },
  "extends": "airbnb-base",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ]
  },
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["lib"]
      }
    }
  }
};

// ESLint: Unable to resolve path to module 
// https://github.com/kriasoft/react-starter-kit/issues/1180
