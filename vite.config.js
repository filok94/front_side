import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import postcssNested from "postcss-nested";
import postcssCustomMedia from "postcss-custom-media";

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
			plugins: [ postcssNested,
				postcssCustomMedia() ]
		},
	},
});
