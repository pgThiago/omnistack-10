const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');


const routes = Router();

routes.get('/devs', DevController.index);
routes.get('/search', SearchController.index);

routes.post('/devs', DevController.store);
routes.put('/update/:github_username', DevController.update)
routes.delete('/delete/:id', DevController.destroy);

module.exports = routes;