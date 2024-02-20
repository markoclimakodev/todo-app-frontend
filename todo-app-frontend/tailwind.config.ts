import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    extend: {
      backgroundImage: {
        'sign-up-bg': "url(/signupbg.png)",
        'login-up-bg': "url(/loginbg.svg)",

      },
    },
  },
  plugins: [],
};
export default config;
