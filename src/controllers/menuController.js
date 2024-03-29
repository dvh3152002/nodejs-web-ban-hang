import menuService from '../services/menuService';

let getMenuList=async(req,res)=>{
    try {
        let data=await menuService.getAllMenu();
        res.render('manage/menu/MenuList',{data});
    } catch (error) {
        console.log(error);
    }
}

let getCreateMenuPage=async(req,res)=>{
    try {
        let data=await menuService.getMenuList();
        res.render('manage/menu/CreateMenu',{data});
    } catch (error) {
        console.log(error);
    }
}

let createNewMenu=async(req,res)=>{
    try {
        await menuService.createNewMenu(req.body);
        res.redirect('/menuList');
    } catch (error) {
        console.log(error);
    }
}

let getEditMenuPage=async(req,res)=>{
    try {
        let data=await menuService.getMenuList();
        let menu=await menuService.getEditMenu(req.params.id);
        res.render('manage/menu/EditMenu',{menu:menu,data:data});
    } catch (error) {
        console.log(error);
    }
}

let updateMenu=async(req,res)=>{
    try {
        await menuService.updateMenu(req.params.id,req.body);
        res.redirect('/menuList');
    } catch (error) {
        console.log(error);
    }
}

let deleteMenu=async(req,res)=>{
    try {
        await menuService.deleteMenu(req.body.id);
        res.redirect('/menuList');
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getMenuList,getCreateMenuPage,createNewMenu,getEditMenuPage,updateMenu,deleteMenu
}