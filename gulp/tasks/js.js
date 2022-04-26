import webpack from "webpack-stream";
import HtmlWebpackPlugin from "html-webpack-plugin";
// import * as nodePath from 'path';
// const rootFolder = nodePath.basename(nodePath.resolve());

export const js = () => {
  return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
    // .pipe(
    //   webpack({
    //     mode: app.isBuild ? 'production' : 'development',
    //     output: {
    //       filename: 'app.min.js',
    //     },
    //   })
    // )
    // .pipe(app.gulp.dest(app.path.build.js))
    .pipe(
      webpack({
        mode: app.isBuild ? 'production' : 'development',
        output: {
          filename: 'js/app.min.js',
        },
        plugins: [
          new HtmlWebpackPlugin({
            inject: 'body',
            template: 'build/index.html',
          })
        ],
      })
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browsersync.stream());
};
