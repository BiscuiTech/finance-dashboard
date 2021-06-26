const mode = process.env.NODE_ENV;
const dev = mode === "development";

module.exports = {
	plugins: {
		autoprefixer: {},
		tailwindcss: {},
		cssnano: {
			dev,
			preset: "default"
		}
	}
};
