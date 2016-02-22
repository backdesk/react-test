# react-test
Technical test using React + Reflux

This example presents a table in which rows can be selected for modification. Matching rows are automatically identified and subsequently highlighted for display.

Since I'm already using Babel I decided to use some of the features of ES6. Those that enhance the readability of my code. I have not chosen to use features such as ES6 classes for this reason. I also purposefully avoided ES6 modules since the fallback is ultimately common js.

The stack is as follows:

* Gulp (for build and rebuild)
* React + Reflux
* Babel 
* Browserify

## Running and Building

Everything is already built in the 'dist' folder. The demo should work just from loading the index.html file. 

If you would like to build and test the demo run 'npm install' from the root directory to install the required dependencies.

You'll also need the following installed globally 

* gulp
* mocha 

Once you have all these things you can run 'gulp' to build and watch assets. 

* To run the tests run 'npm test'
* To run linting 'npm lint' 

Note: The linting (ESLint)isn't currently configured with any specifics for react or ES6.

## Troubleshooting 

If you're having build problems ensure that your version of node is up to date with the latest LTS release. You can move between different versions using 'nvm' or by using 'n' to update. Older versions of node have weaker support for ES6 features - although this shouldn't matter since everything should pass through babel.

Windows has heaps of issues with MS Build and node-gyp. It's becoming a big problem and increasingly tough to address.

Please log an issue/question on github if you spot anything else.
