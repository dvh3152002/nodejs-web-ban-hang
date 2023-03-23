import db from "../models";

// let cartegoryRecusive=(data,id,text)=>{
//     for(let i=0;i<data.length;i++){
//         if(data[i].parent_id===id){
//             console.log('--',data[i].name);
//             data[i].name=`${text}${data[j].name}`;
//             cartegoryRecusive(data,data[i].id,'--');
//         }
//     }
//     return data;
// }

let createNewCartegory=async(data)=>{
    await db.Cartegory.create({
        name:data.name,
        parent_id:data.parent_id
    })
}

let getAllCartegory=async()=>{
    try {
        let data=db.Cartegory.findAll({})
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

module.exports={createNewCartegory,getAllCartegory,getEditCartegory,updateCartegory,deleteCartegory}