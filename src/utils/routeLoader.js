const fs = require('fs');
const path = require('path');

function routeLoader(app) {
    const baseDirApis = path.join(__dirname, '..', 'apis');
    const baseDirViews = path.join(__dirname, '..', 'views');

    // Recursively load routes from all the 'routes' directories
    function loadRoutesFromDir(dir, basePath = '') {
        fs.readdirSync(dir).forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.lstatSync(fullPath);

            if (stat.isDirectory()) {
                if (file === 'routes') {
                    // Load all .js route files in this folder
                    fs.readdirSync(fullPath).forEach(routeFile => {
                        const routePath = path.join(fullPath, routeFile);
                        if (routeFile.endsWith('.js')) {
                            const route = require(routePath);

                            if (typeof route === 'function' || typeof route.use === 'function') {
                                const relativePath = path.relative(__dirname, routePath);
                                const routeBasePath = `/${relativePath.replace(/\\/g, '/').replace('src/', '').replace('.js', '')}`;
                                app.use('/', route);
                            } else {
                                console.error(`The file ${routeFile} does not export a valid router.`);
                            }
                        }
                    });
                } else {
                    // Recursively search in nested directories
                    loadRoutesFromDir(fullPath, `${basePath}/${file}`);
                }
            }
        });
    }

    loadRoutesFromDir(baseDirApis); // Start from the apis folder
    loadRoutesFromDir(baseDirViews); // Start from the views folder
}

module.exports = routeLoader;