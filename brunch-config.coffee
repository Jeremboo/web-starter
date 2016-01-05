exports.config =
  # See https://github.com/brunch/brunch/blob/master/docs/config.md
  files:
    javascripts:
      joinTo: 'app.js'
    stylesheets:
      joinTo: 'app.css'
    templates:
      joinTo: 'app.js'

  npm:
    enabled: true

  plugins:
    postcss:
      processors: [
          require('autoprefixer')(['last 8 versions'])
      ]
