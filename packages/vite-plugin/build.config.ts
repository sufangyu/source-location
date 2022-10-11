import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["src/index"],
  externals: [],
  clean: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
  declaration: true,
});
