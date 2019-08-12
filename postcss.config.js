// module.exports = {
//     plugins: {
//         'overrideBrowserslist': {
//             browsers: ['Android >= 4.0', 'iOS >= 7']
//         },
//         'postcss-pxtorem': {
//             rootValue: 37.5,
//             propList: ['*']
//         }
//     }
// };

const { sep } = require('path');

module.exports = ({ file }) => {
    let rootValue = file.dirname.indexOf(`node_modules${sep}vant`) !== -1
        ? 37.5
        : 75;

    return {
        plugins: {
            autoprefixer: {},
            'postcss-pxtorem': {
                rootValue,
                propList: ['*']
            }
        }
    };
};
