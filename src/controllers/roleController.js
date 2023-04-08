import roleService from '../services/roleService';

let getRoleList=async(req,res)=>{
    try {
        let data=await roleService.getAllRole();
        res.render('manage/role/RoleList',{data});
    } catch (error) {
        console.log(error);
    }
}

let getCreateRolePage=async(req,res)=>{
    try {
        // let data=await roleService.getRoleList()
        let data=[];
        res.render('manage/role/CreateRole',{data});
    } catch (error) {
        console.log(error);
    }
}

let createNewRole=async(req,res)=>{
    try {
        await roleService.createNewRole(req.body);
        res.redirect('/role/list');
    } catch (error) {
        console.log(error);
    }
}

let getEditRolePage=async(req,res)=>{
    try {
        let data=await roleService.getRoleList();
        let role=await roleService.getEditRole(req.params.id);
        res.render('manage/role/EditRole',{role:role,data:data});
    } catch (error) {
        console.log(error);
    }
}

let updateRole=async(req,res)=>{
    try {
        await roleService.updateRole(req.params.id,req.body);
        res.redirect('/role/list');
    } catch (error) {
        console.log(error);
    }
}

let deleteRole=async(req,res)=>{
    try {
        await roleService.deleteRole(req.body.id);
        res.redirect('/role/list');
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getRoleList,getCreateRolePage,createNewRole,getEditRolePage,updateRole,deleteRole
}