import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/index"],
  externals: ["fs", "dotenv"],
  clean: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
  declaration: true,
});
