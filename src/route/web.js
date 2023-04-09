import express from 'express';
import multer from 'multer';
import path from 'path';
import userController from '../controllers/userController';
import cartegoryController from '../controllers/cartegoryController';
import menuController from '../controllers/menuController';
import productController from '../controllers/productController';
import sliderController from '../controllers/sliderController';
import settingController from '../controllers/settingController';
import roleController from '../controllers/roleController';
import authorization from '../middleware/authorization'

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

let initWebRoutes=(app)=>{
    router.get('/register',userController.getRegisterPage);
    router.post('/register',userController.postRegister);
    router.get('/login',userController.getLoginPage);
    router.post('/login',userController.handleLogin);
    router.post('/logout',userController.postLogout)
    router.get('/user/list',authorization.checkLogin,userController.getUserList);
    router.get('/user/create',authorization.checkLogin,userController.getCreateUserPage);
    router.post('/create-new-user',authorization.checkLogin,userController.createNewUser);
    router.get('/user/edit/:id',authorization.checkLogin,userController.getEditUserPage);
    router.post('/user/update/:id',authorization.checkLogin,userController.updateUser);
    router.post('/user/delete',authorization.checkLogin,userController.deleteUser);

    router.get('/cartegory/list',authorization.checkLogin,cartegoryController.getCartegoryList);
    router.get('/cartegory/create',authorization.checkLogin,cartegoryController.getCreateCartegoryPage);
    router.post('/create-new-cartegory',authorization.checkLogin,cartegoryController.createNewCartegory);
    router.get('/cartegory/edit/:id',authorization.checkLogin,cartegoryController.getEditCartegoryPage);
    router.post('/cartegory/update/:id',authorization.checkLogin,cartegoryController.updateCartegory);
    router.post('/cartegory/delete',authorization.checkLogin,cartegoryController.deleteCartegory);

    router.get('/menu/list',authorization.checkLogin,menuController.getMenuList);
    router.get('/menu/create',authorization.checkLogin,menuController.getCreateMenuPage);
    router.post('/create-new-menu',menuController.createNewMenu);
    router.get('/menu/edit/:id',authorization.checkLogin,menuController.getEditMenuPage);
    router.post('/menu/update/:id',menuController.updateMenu);
    router.post('/menu/delete',menuController.deleteMenu);

    router.get('/product/list',authorization.checkLogin,productController.getProductList);
    router.get('/product/create',authorization.checkLogin,productController.getCreateProductPage);
    router.post('/create-new-product',upload.fields([
        {name:'image_details', maxCount:5},
        {name:"feature_image"}
    ]),
    productController.createNewProduct);
    router.get('/product/edit/:id',authorization.checkLogin,productController.getEditProductPage);
    router.post('/product/update/:id',upload.fields([
        {name:'image_details', maxCount:5},
        {name:"feature_image"}
    ]),productController.updateProduct);
    router.post('/product/delete',productController.deleteProduct);

    router.get('/slider/list',authorization.checkLogin,sliderController.getSliderList);
    router.get('/slider/create',authorization.checkLogin,sliderController.getCreateSliderPage);
    router.post('/slider/delete',sliderController.deleteSlider);
    router.post('/create-new-slider',upload.single('slider_image'),sliderController.createNewSlider);
    router.get('/slider/edit/:id',authorization.checkLogin,sliderController.getEditSliderPage);
    router.post('/slider/update/:id',upload.single('slider_image'),sliderController.updateSlider);

    router.get('/setting/list',authorization.checkLogin,settingController.getSettingList);
    router.get('/setting/create',authorization.checkLogin,settingController.getCreateSettingPage);
    router.post('/setting/delete',settingController.deleteSetting);
    router.post('/create-new-setting',settingController.createNewSetting);
    router.get('/setting/edit/:id',authorization.checkLogin,settingController.getEditSettingPage);
    router.post('/setting/update/:id',settingController.updateSetting);

    router.get('/role/list',authorization.checkLogin,roleController.getRoleList);
    router.get('/role/create',roleController.getCreateRolePage);
    router.post('/create-new-role',roleController.createNewRole);
    router.get('/role/edit/:id',roleController.getEditRolePage);
    router.post('/role/update/:id',roleController.updateRole);
    router.post('/role/delete',roleController.deleteRole);

    return app.use('/',router);
}

module.exports=initWebRoutes;