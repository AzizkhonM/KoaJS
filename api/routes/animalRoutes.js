export default function animalRoutes(router) {
    let animalController = require('../controllers/animalController');

    router.get('/animal', animalController.list_all_animals);
    router.post('/animal', animalController.create_an_animal);

    router.get('/animal/:id', animalController.read_an_animal);
    router.put('/animal/:id', animalController.update_an_animal);
    router.delete('/animal/:id', animalController.delete_an_animal);
};