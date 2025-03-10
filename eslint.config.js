// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        ignores: ["dist/*"],
        rules: {
            semi: "error",
            "prefer-const": "error"
        }
    }
]);