module.exports = {
  "plugins": [
    "mocha",
    "react"
  ],
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "mocha": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "settings": {
    "react": {
      "createClass": "createReactClass", // Regex for Component Factory to use,
      // default to "createReactClass"
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "detect", // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
      "flowVersion": "0.53" // Flow version
    },
    "propWrapperFunctions": [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      "forbidExtraProps",
      { "property": "freeze", "object": "Object" },
      { "property": "myFavoriteWrapper" }
    ],
    "linkComponents": [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      { "name": "Link", "linkAttribute": "to" }
    ]
  },
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "parser": "babel-eslint",
  "rules": {
    "semi": [
      "error",
      "always"
    ],
    "no-var": [
      "error",
    ],
    "prefer-const": ["error", {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }],
    "curly": ["error"],
    "eqeqeq": ["error"],
    "no-multi-spaces": ["error"],
    "no-lone-blocks": ["error"],
    "no-self-compare": ["error"],
    "no-unused-expressions": ["error"],
    "no-useless-call": ["error"],
    "no-use-before-define": ["error"],

    "camelcase": ["error", { properties: "never" }],
    "func-call-spacing": ["error"],
    "no-lonely-if": ["error"],
    "array-bracket-spacing": ["error"],

    "no-console": ["off"],
  }
};