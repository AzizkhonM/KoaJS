export default function fruitRoutes(router) {
    let fruitController = require('../controllers/fruitController');

    router.get('/fruit', fruitController.list_all_fruits);
    router.post('/fruit', fruitController.create_a_fruit);

    router.get('/fruit/:id', fruitController.read_a_fruit);
    router.put('/fruit/:id', fruitController.update_a_fruit);
    router.delete('/fruit/:id', fruitController.delete_a_fruit);
};