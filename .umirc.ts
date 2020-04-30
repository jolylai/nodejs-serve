import { defineConfig } from "dumi";

export default defineConfig({
  title: "Service",
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
  // define: {
  //   HOST: process.env
  // }
  // styles: ["https://cdn.bootcss.com/bulma/0.8.2/css/bulma.min.css"]
  // more config: https://d.umijs.org/config
});
