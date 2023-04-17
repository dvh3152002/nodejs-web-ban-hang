import db from "../models";

let createNewSlider=async(data,dataImage)=>{
    await db.Slider.create({
        name:data.name,
        description:data.description,
        image:dataImage.filename,
        image_path:dataImage.path
    })
}

let getAllSlider=async()=>{
    try {
        let data=await db.Slider.findAll({})
        return data;
    } catch (error) {
        console.log(error)
    }
}

let getEditSlider=async(id)=>{
    try {
        let data = await db.Slider.findOne({
            where: { id: id },
            raw: true
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

let updateSlider=async(id,data,sliderImage)=>{
    try {
        let slider=await db.Slider.findOne({
            where:{
                id:id
            },
            raw:false
        })
        if(slider){
            slider.name=data.name;
            slider.description=data.description;
            if(sliderImage){
                slider.image=sliderImage.filename;
                slider.image_path=sliderImage.path;
            }
            await slider.save();
        }else{
            slider={}
        }
        return slider;
    } catch (error) {
        console.log(error);
    }
}

let deleteSlider=async(id)=>{
    try {
        let data=await db.Slider.findOne({
            where:{id:id},
            raw:false
        })
        if(data){
            partial.deleteImg(data.image_path);
            await data.destroy();
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports={createNewSlider,getAllSlider,getEditSlider,updateSlider,deleteSlider
}