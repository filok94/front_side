import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import postcssNested from "postcss-nested";

export default defineConfig({
	plugins: [
		vue({
			reactivityTransform: true,
		})
	],

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "./src/assets/vars";
                         		 @import "./src/assets/mixins";`,
			},
		},
		postcss: {
			plugins: [ postcssNested ]
		},
	},
});
