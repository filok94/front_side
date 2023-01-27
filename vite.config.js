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
		postcss: {
			plugins: [ postcssNested,
				postcssCustomMedia ]
		},
	},
});
