import express from 'express';
import homeController from '../controllers/homeController';
import adminController from '../controllers/adminController';
import cartegoryController from '../controllers/cartegoryController'

let router=express.Router();

let initWebRoutes=(app)=>{
    router.get('/',homeController.getHomePage);
    router.get('/cartegory/list',cartegoryController.getCartegoryList);
    router.get('/cartegory/create',cartegoryController.getCreateCartegoryPage);
    router.post('/create-new-cartegory',cartegoryController.createNewCartegory);
    router.get('/cartegory/edit/:id',cartegoryController.getEditCartegoryPage);
    router.post('/cartegory/update',cartegoryController.updateCartegory);
    router.post('/cartegory/delete',cartegoryController.deleteCartegory);

    return app.use('/',router);
}

module.exports=initWebRoutes;