export default function authRoutes(router) {
    let authController = require('../controllers/authController');

    router.get('/users', authController.list_all_users);
    router.post('/login', authController.login);
    router.post('/register', authController.register);

};