const authController = require('../controllers/auth.controller.js');

module.exports = function(app) {

    app.post("/signup/:role", authController.signup);
    app.post("/login/:role", authController.signin);

}