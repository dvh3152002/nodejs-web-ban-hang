import settingService from '../services/settingService';

let getSettingList=async(req,res)=>{
    try {
        let data=await settingService.getAllSetting();
        res.render('manage/setting-manage/SettingList',{data});
    } catch (error) {
        console.log(error);
    }
}

let getCreateSettingPage=async(req,res)=>{
    try {
        res.render('manage/setting-manage/CreateSetting');
    } catch (error) {
        console.log(error);
    }
}

let createNewSetting=async(req,res)=>{
    try {
        await settingService.createNewSetting(req.body);
        res.redirect('/setting/list');
    } catch (error) {
        console.log(error);
    }
}

let getEditSettingPage=async(req,res)=>{
    try {
        let setting=await settingService.getEditSetting(req.params.id);
        res.render('manage/setting-manage/EditSetting',{setting});
    } catch (error) {
        console.log(error);
    }
}

let updateSetting=async(req,res)=>{
    try {
        await settingService.updateSetting(req.params.id,req.body);
        res.redirect('/setting/list');
    } catch (error) {
        console.log(error);
    }
}

let deleteSetting=async(req,res)=>{
    try {
        await settingService.deleteSetting(req.body.id);
        res.redirect('/setting/list');
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getSettingList,getCreateSettingPage,createNewSetting,getEditSettingPage,updateSetting,deleteSetting
}