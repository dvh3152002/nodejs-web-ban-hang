import express from 'express';
import homeController from '../controllers/homeController';
import adminController from '../controllers/adminController';
import cartegoryController from '../controllers/cartegoryController'

let router=express.Router();

let initWebRoutes=(app)=>{
    router.get('/',homeController.getHomePage);
    router.get('/system',adminController.getAdminPage);
    router.get('/create-cartegory',cartegoryController.getCreateCartegoryPage);

    return app.use('/',router);
}

module.exports=initWebRoutes;