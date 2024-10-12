const fs = require('fs');
const path = require('path');

function routeLoader(app) {
    const baseDir = path.join(__dirname, '..', 'apis');

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
                                // Mount the router on the correct base path
                                const routeBasePath = `${basePath}/${file.replace('routes', '')}`;
                                app.use(routeBasePath, route);
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

    loadRoutesFromDir(baseDir); // Start from the apis folder
}

module.exports = routeLoader;
