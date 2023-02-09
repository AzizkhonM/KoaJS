export default function routes(router) {
    let carController = require('../controllers/carController');

    router.get('/car', carController.list_all_cars);
    router.post('/car', carController.create_a_car);

    router.get('/car/:id', carController.read_a_car);
    router.put('/car/:id', carController.update_a_car);
    router.delete('/car/:id', carController.delete_a_car);
};