# My web app starter kit with Brunch 2.1

Just a architecture to manage a web project with [brunch.io](http://brunch.io/), [ES6](http://es6-features.org) and [SASS](http://sass-lang.com/).


## Getting Started :

* Install (if you don't have them):
  * [Node.js](http://nodejs.org): `brew install node` on OS X
  * [Brunch](http://brunch.io): `npm install -g brunch`

* Deploy :
  * With brunch :
    * `brunch new -s https://github.com/Jeremboo/web-starter/tree/brunch`
  * Or with git to clone the repository :
    * `git clone https://github.com/Jeremboo/web-starter/tree/brunch`

* Download dependencies and start to use the starter :
  * `npm run deploy` or `npm install && npm start`


## Commands :

  * `npm start` for start the development with auto reloading.
  * `npm run build` for have a `public/` production directory.
  * `npm install --save foo` for add front-end dependencies at your project. See [npm with brunch](https://github.com/brunch/brunch/blob/master/docs/config.md#npm-experimental) for more details.

  * [more...](https://github.com/brunch/brunch/blob/master/docs/commands.md)

  ## Details :

  * Write your code in `app/` :
    * Like `index.html`, place static files you want to be copied from `app/assets/` to `public/`. You already have `fonts/`, `ìmgs/` and `views/` directories to help you to arrange.
    * Place javascript and Sass class in `/app/components/`. For example :
      * `app/components/Foo/Foo.js`
      * `app/components/Foo/Foo.scss`
    * Place files of setting (who cannot be a components) in `/app/core/` like Controllers, Managers, properties...
    * Manage your base style in `app/style/` :
      * `base.scss` for have a custom css init.
      * `fonts.scss` for load your fonts.
      * `mixins.scss` for your mixins.
      * `variables.scss` for your variables.
    * If you have other dependencies who cannot be added with npm, you can put them in `app/vendors/`.

  * `public/` dir is fully auto-generated and served by HTTP server thanks to brunch.

  * You can config brunch in `brunch-config.coffee` file. See [documentation](https://github.com/brunch/brunch/blob/master/docs/config.md#npm-experimental).
