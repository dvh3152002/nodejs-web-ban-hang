import cartegoryService from '../services/cartegoryService';

let getCreateCartegoryPage=async(req,res)=>{
    try {
        let data=await cartegoryService.getCartegoryList();
        res.render('manage/cartegory/CreateCartegory',{data});
    } catch (error) {
        console.log(error);
    }
}

let getCartegoryList=async(req,res)=>{
    try {
        let data=await cartegoryService.getAllCartegory();
        res.render('manage/cartegory/CartegoryList',{data});
    } catch (error) {
        console.log(error);
    }
}

let createNewCartegory=async(req,res)=>{
    try {
        await cartegoryService.createNewCartegory(req.body);
        res.redirect('/cartegoryList');
    } catch (error) {
        console.log(error);
    }
}

let getEditCartegoryPage=async(req,res)=>{
    try {
        let data=await cartegoryService.getCartegoryList();
        let cartegory=await cartegoryService.getEditCartegory(req.params.id);
        res.render('manage/cartegory/EditCartegory',{cartegory:cartegory,data:data});
    } catch (error) {
        console.log(error);
    }
}

let updateCartegory=async(req,res)=>{
    try {
        await cartegoryService.updateCartegory(req.params.id,req.body);
        res.redirect('/cartegoryList');
    } catch (error) {
        console.log(error);
    }
}

let deleteCartegory=async(req,res)=>{
    try {
        await cartegoryService.deleteCartegory(req.body.id);
        res.redirect('/cartegoryList');
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getCreateCartegoryPage,getCartegoryList,createNewCartegory,getEditCartegoryPage,
    updateCartegory,deleteCartegory
}