import { defineConfig } from "dumi";

export default defineConfig({
  title: "NodeJS Serve",
  mode: "site",
  extraBabelPlugins: [
    [
      "babel-plugin-import",
      {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true
      }
    ]
  ]
  // styles: ["https://cdn.bootcss.com/bulma/0.8.2/css/bulma.min.css"]
  // more config: https://d.umijs.org/config
});
