const storeTemplate = require('./storeTemplate');

const perfumeTemplate = {
    name: 'perfume',
    columns: ['brand', 'name', 'prodYear', 'obtained', 'value', 'size', 'smell']
};

const videoGamesTemplate = {
    name: 'video games',
    columns: ['title', 'publisher', 'release', 'console', 'value']
};

const moviesTemplate = {
    name: 'movies',
    columns: ['title', 'director', 'genre', 'releaseYear']
};

Promise.all([
    storeTemplate(perfumeTemplate),
    storeTemplate(videoGamesTemplate),
    storeTemplate(moviesTemplate)
]).then(() => {
    console.log('All templates stored successfully');
}).catch((err) => {
    console.error('An error occurred:', err);
});