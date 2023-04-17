import sliderService from '../services/sliderService';
import menuService from '../services/menuService';
import cartegoryService from '../services/cartegoryService';

const getHomePage=async(req,res)=>{
    let sliders=await sliderService.getAllSlider();
    let menus=await menuService.getAllMenu();
    let cartegory=await cartegoryService.getAllCartegory();

    res.render("shop/home",{sliders,menus,cartegory});
}

const getCartShopPage=async(req,res)=>{
    let menus=await menuService.getAllMenu();

    res.render("shop/cartShopPage",{menus});
}

module.exports={getHomePage,getCartShopPage}