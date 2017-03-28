module.exports = (ctx) => ({
  plugins: [
    require('postcss-import')({
      path: 'src/client'
    }),
    require('postcss-url')(),
    require('postcss-cssnext')(),
    ctx.env !== 'development' ? require('cssnano')({ autoprefixer: false }) : null
  ]
})
