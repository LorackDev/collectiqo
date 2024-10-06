const { Router } = require('express');
const glob = require('fast-glob');
const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, '..');

async function RouteLoader(globPattern) {
    let router = Router();
    let files = [];
    try {
        files = await glob(globPattern, { cwd: BASE_DIR });
    } catch (error) {
        console.error(error);
    }

    for (const file of files) {
        if (fs.statSync(file).isFile() && path.extname(file).toLowerCase() === '.js') {
            try {
                const routeModule = require(path.resolve(file));
                router = (routeModule.default || routeModule)(router);
            } catch (e) {
                throw new Error(`Error when loading route file: ${file} [ ${e.toString()} ]`);
            }
        }
    }

    return router;
}

module.exports = RouteLoader;