import express from 'express';
import multer from 'multer';
import path from 'path';
import homeController from '../controllers/homeController';
import adminController from '../controllers/adminController';
import cartegoryController from '../controllers/cartegoryController';
import menuController from '../controllers/menuController';
import productController from '../controllers/productController';
import sliderController from '../controllers/sliderController';

var appRoot = require('app-root-path');

let router=express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/images/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });
let uploadMultipleFiles = multer({ storage: storage, fileFilter: imageFilter }).array('image_details', 3);

let initWebRoutes=(app)=>{
    router.get('/admin',adminController.getLoginPage);
    router.post('/admin',adminController.postLoginAdmin);

    router.get('/cartegory/list',cartegoryController.getCartegoryList);
    router.get('/cartegory/create',cartegoryController.getCreateCartegoryPage);
    router.post('/create-new-cartegory',cartegoryController.createNewCartegory);
    router.get('/cartegory/edit/:id',cartegoryController.getEditCartegoryPage);
    router.post('/cartegory/update/:id',cartegoryController.updateCartegory);
    router.post('/cartegory/delete',cartegoryController.deleteCartegory);

    router.get('/menu/list',menuController.getMenuList);
    router.get('/menu/create',menuController.getCreateMenuPage);
    router.post('/create-new-menu',menuController.createNewMenu);
    router.get('/menu/edit/:id',menuController.getEditMenuPage);
    router.post('/menu/update/:id',menuController.updateMenu);
    router.post('/menu/delete',menuController.deleteMenu);

    router.get('/product/list',productController.getProductList);
    router.get('/product/create',productController.getCreateProductPage);
    router.post('/create-new-product',upload.fields([
        {name:'image_details', maxCount:5},
        {name:"feature_image"}
    ]),
    productController.createNewProduct);
    router.get('/product/edit/:id',productController.getEditProductPage);
    router.post('/product/update/:id',upload.fields([
        {name:'image_details', maxCount:5},
        {name:"feature_image"}
    ]),productController.updateProduct);
    router.post('/product/delete',productController.deleteProduct);

    router.get('/slider/list',sliderController.getSliderList);
    router.get('/slider/create',sliderController.getCreateSliderPage);
    router.post('/slider/delete',sliderController.deleteSlider);
    router.post('/create-new-slider',upload.single('slider_image'),sliderController.createNewSlider);
    router.get('/slider/edit/:id',sliderController.getEditSliderPage);
    router.post('/slider/update/:id',upload.single('slider_image'),sliderController.updateSlider);

    return app.use('/',router);
}

module.exports=initWebRoutes;