import express from 'express';
import homeController from '../controllers/homeController';
import adminController from '../controllers/adminController';
import cartegoryController from '../controllers/cartegoryController';
import menuController from '../controllers/menuController';

let router=express.Router();

let initWebRoutes=(app)=>{
    router.get('/',homeController.getLoginPage);
    router.get('/cartegory/list',cartegoryController.getCartegoryList);
    router.get('/cartegory/create',cartegoryController.getCreateCartegoryPage);
    router.post('/create-new-cartegory',cartegoryController.createNewCartegory);
    router.get('/cartegory/edit/:id',cartegoryController.getEditCartegoryPage);
    router.post('/cartegory/update',cartegoryController.updateCartegory);
    router.post('/cartegory/delete',cartegoryController.deleteCartegory);

    router.get('/menu/list',menuController.getMenuList);
    router.get('/menu/create',menuController.getCreateMenuPage);
    router.post('/create-new-menu',menuController.createNewMenu);
    router.get('/menu/edit/:id',menuController.getEditMenuPage);
    router.post('/menu/update',menuController.updateMenu);
    router.post('/menu/delete',menuController.deleteMenu);

    return app.use('/',router);
}

module.exports=initWebRoutes;