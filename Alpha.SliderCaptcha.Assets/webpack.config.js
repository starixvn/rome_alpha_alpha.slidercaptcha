const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { existsSync } = require("fs");

module.exports = ({ mode }) => {
  console.debug(`Webpack is running in ${mode} mode`);
  const devOutputPath = path.resolve(
    __dirname,
    "../Alpha.SliderCaptcha.Demo"
  );

  const isDev = mode === "development";
  const config = {
    mode,
    watch: isDev,
    entry: ["./src/index.ts", "./src/index.scss"],
    output: {
      path: isDev ? devOutputPath : path.resolve(__dirname, "dist"),
      filename: "Scripts/alpha.slider-captcha.js",
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" },
        {
          test: /\.(sa|sc)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env",
                      {
                        // Options
                      },
                    ],
                  ],
                },
              },
            },
            {
              loader: "sass-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "Content/alpha.slider-captcha.css",
      }),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
  };

  if (isDev) {
    config.devtool = "inline-source-map";
    const outputImagesPath = path.resolve(devOutputPath, "images");
    if (!existsSync(outputImagesPath)) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, "images"),
              to: outputImagesPath,
            },
          ],
        })
      );
    }
  }

  return config;
};
