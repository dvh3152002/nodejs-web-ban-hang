import db from "../models";
import recurse from "./recurse";

let getCartegoryList=async()=>{
    try {
        let data=await db.Cartegory.findAll({});
        recurse(data,0,'');
        return data;
    } catch (error) {
        console.log(error)
    }
}

let createNewCartegory=async(data)=>{
    await db.Cartegory.create({
        name:data.name,
        parent_id:data.parent_id
    })
}

let getAllCartegory=async()=>{
    try {
        let data=await db.Cartegory.findAll({
            raw:true
        })
        return data;
    } catch (error) {
        console.log(error)
    }
}

let getEditCartegory=async(id)=>{
    try {
        let data = await db.Cartegory.findOne({
            where: { id: id },
            raw: false
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

let updateCartegory=async(data)=>{
    try {
        let cartegory=await db.Cartegory.findOne({
            where:{
                id:data.id
            }
        })
        if(cartegory){
            cartegory.name=data.name;
            cartegory.parent_id=data.parent_id;
            await cartegory.save();
        }else{
            cartegory={}
        }
        return cartegory;
    } catch (error) {
        console.log(error);
    }
}

let deleteCartegory=async(id)=>{
    try {
        let data=await db.Cartegory.findOne({
            where:{id:id},
            raw:false
        })
        if(data){
            await data.destroy();
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports={createNewCartegory,getAllCartegory,getEditCartegory,updateCartegory,deleteCartegory,
    getCartegoryList
}