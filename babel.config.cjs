const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  presets: [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        runtime: "classic", // <- это ключевой момент
      },
    ],
  ],
  plugins: [isDevelopment && require.resolve("react-refresh/babel")].filter(
    Boolean
  ),
};
