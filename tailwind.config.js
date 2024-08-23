// /** @type {import('tailwindcss').Config} */
// import type {Config} from "tailwindcss";

const config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite/**/*.js"
    ],
    theme: {
        extend: {
            colors: {
                background: "rgba(var(--background))",
                // navBar: "rgba(var(--nav-bar))",
                navBar: '#697565',
            }
        },
    },
    plugins: [
        require('flowbite/plugin')
    ],

};

export default config;


// export default {
//     content: [
//         "./index.html",
//         "./src/**/*.{js,ts,jsx,tsx}",
//         "./node_modules/flowbite/**/*.js"
//     ],
//     theme: {
//         extend: {
//             colors: {
//                 background: '#000000',
//                 navBar: '#697565',
//             }
//         },
//     },
//     plugins: [
//         require('flowbite/plugin')
//     ],
// }
//
