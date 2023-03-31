import db from "../models";
import partial from "./partial";

let getCartegoryList=async()=>{
    try {
        let data=await db.Cartegory.findAll({
            raw:true
        });
        partial.recurse(data,0,'');
        return data;
    } catch (error) {
        console.log(error)
    }
}

let createNewProduct=async(data,dataImage)=>{
    try {
        //Tạo product
        let product=await db.Product.create({
            name:data.name,
            price:data.price,
            feature_image:dataImage.feature_image[0].filename,
            feature_image_path:dataImage.feature_image[0].path,
            content:data.content,
            cartegory_id:data.cartegory_id,
            user_id:'1'
            });

            //Tạo Product_Image
            let image_details=dataImage.image_details;
            let dataProductImg=[];
            if(image_details && image_details.length>0){
                image_details.map(item=>{
                    let object={
                        product_id:product.id,
                        image:item.filename,
                        image_path:item.path
                    }
                    dataProductImg.push(object);
                });
            }
            if(dataProductImg && dataProductImg.length>0){
                await db.Product_Image.bulkCreate(dataProductImg);
            }

        //Tạo Tag
        let dataTags=data.tags;
        for(let i=0;i<dataTags.length;i++){
            let tag=await db.Tag.findOrCreate({
                where:{
                    name:dataTags[i]
                },
                defaults:{
                    name:dataTags[i]
                },
                raw:true
            })
            if(tag && tag[0]){
                await db.Product_Tag.create({
                    product_id:product.id,
                    tag_id:tag[0].id
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}

let getAllProduct=async()=>{
    try {
        let data=await db.Product.findAll({
            raw:true,
            include: [
                { model: db.Cartegory,as:"cartegoryData", attributes: ['id', 'name'] },
            ],
            nest:true
        })
        return data;
    } catch (error) {
        console.log(error)
    }
}

let getEditProduct=async(id)=>{
    try {
        let dataProduct = await db.Product.findAll({
            where: { id: id },
            include: [
                { model: db.Product_Image, attributes: ['image'],as:"productImageData"},
                { model: db.Product_Tag, attributes: ['tag_id'],
                include: [
                    { model: db.Tag, attributes: ['name'],as:"tagData",raw:true}
                ],
                as:"productTagData",raw:true }
            ],
            raw: false,
            nest:true
        });
        return dataProduct;
    } catch (error) {
        console.log(error);
    }
}

let updateProduct=async(id,data,dataImage)=>{
    try {
        let product=await db.Product.findOne({
            where: { id: id },
            raw: false
        })
        if(product){
            await  db.Product_Tag.destroy({
                where:{
                    product_id:product.id
                }
            });
            product.name=data.name;
            product.price=data.price;
            product.content=data.content;
            product.cartegory_id=data.cartegory_id;
            product.user_id='2';
            if(dataImage){
                if(dataImage.feature_image){
                    partial.deleteImg(product.feature_image_path);
                    product.feature_image=dataImage.feature_image[0].filename;
                    product.feature_image_path=dataImage.feature_image[0].path;
                }
                if(dataImage.image_details){
                    let dataProductImg=await db.Product_Image.findAll({
                        where:{product_id:product.id},
                        raw:false
                    });
                    dataProductImg.map(item=>{
                        partial.deleteImg(item.image_path)
                    })
                    await  db.Product_Image.destroy({
                        where:{
                            product_id:product.id
                        }
                    });
                    let image_details=dataImage.image_details;
                    let dataProductImgNew=[];
                    if(image_details && image_details.length>0){
                        image_details.map(item=>{
                            let object={
                                product_id:product.id,
                                image:item.filename,
                                image_path:item.path
                            }
                            dataProductImgNew.push(object);
                        });
                    }
                    if(dataProductImgNew && dataProductImgNew.length>0){
                        await db.Product_Image.bulkCreate(dataProductImgNew);
                    }
                }
            }

            let dataTags=data.tags;
            for(let i=0;i<dataTags.length;i++){
                let tag=await db.Tag.findOrCreate({
                    where:{
                        name:dataTags[i]
                    },
                    defaults:{
                        name:dataTags[i]
                    },
                    raw:true
                })
                if(tag && tag[0]){
                    await db.Product_Tag.create({
                        product_id:product.id,
                        tag_id:tag[0].id
                    })
                }
            }

            await product.save();
        }
    } catch (error) {
        console.log(error);
    }
}

let deleteProduct=async(id)=>{
    try {
        let dataProduct=await db.Product.findOne({
            where:{id:id},
            raw:false
        });
        if(dataProduct){
            let dataProductImg=await db.Product_Image.findAll({
                where:{product_id:dataProduct.id},
                raw:false
            });
            let dataProductTag=await db.Product_Tag.findAll({
                where:{product_id:dataProduct.id},
                raw:false
            });

            if(dataProductImg && dataProductImg.length>0){
                dataProductImg.map(item=>{
                    partial.deleteImg(item.image_path)
                })
                await  db.Product_Image.destroy({
                    where:{
                        product_id:dataProduct.id
                    }
                });
            }
            if(dataProductTag && dataProductTag.length>0){
                await  db.Product_Tag.destroy({
                    where:{
                        product_id:dataProduct.id
                    }
                });
            }
            partial.deleteImg(dataProduct.feature_image_path);
            await dataProduct.destroy();
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports={createNewProduct,getAllProduct,getEditProduct,updateProduct,deleteProduct,
    getCartegoryList
}