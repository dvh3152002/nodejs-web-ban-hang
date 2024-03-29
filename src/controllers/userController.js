import userService from '../services/userService';

let getLoginPage=(req,res)=>{
    res.render('login');
}

let handleLogin=async(req,res)=>{
    try {
        let data=await userService.handleLogin(req.body);
        if(!data){
            req.session.isError=true;
            res.redirect('login');
        }else{  
            req.session.isAuthenticated=true;
            req.session.isError=false;
            req.session.authUser=data;
            res.cookie("user_id", data.id);
            res.redirect('/cartegoryList');
        }
    } catch (error) {
        console.log(error);
    }
}


let postLogout=(req,res)=>{
    req.session.isAuthenticated=false;
    req.session.authUser=null;
    res.clearCookie("user_id");
    res.redirect('/login')
}

let getRegisterPage=(req,res)=>{
    res.render('register');
}

let postRegister=async(req,res)=>{
    try {
        let isError=await userService.createNewUser(req.body);
        if(!isError){
            req.session.isError=true;
            res.redirect('/register');
        }else{
            res.redirect('/login');
        }
    } catch (error) {
        console.log(error);
    }
}

let getCreateUserPage=async(req,res)=>{
    try {
        let data=await userService.getAllRole();
        res.render('manage/user/CreateUser',{data});
    } catch (error) {
        console.log(error);
    }
}

let getUserList=async(req,res)=>{
    try {
        let data=await userService.getAllUser();
        res.render('manage/user/UserList',{data});
    } catch (error) {
        console.log(error);
    }
}

let createNewUser=async(req,res)=>{
    try {
        await userService.createNewUser(req.body);
        res.redirect('/userList');
    } catch (error) {
        console.log(error);
    }
}

let getEditUserPage=async(req,res)=>{
    try {
        let role=await userService.getAllRole();
        let user=await userService.getEditUser(req.params.id);
        res.render('manage/user/EditUser',{user,role});
    } catch (error) {
        console.log(error);
    }
}

let updateUser=async(req,res)=>{
    try {
        await userService.updateUser(req.params.id,req.body);
        res.redirect('/userList');
    } catch (error) {
        console.log(error);
    }
}

let deleteUser=async(req,res)=>{
    try {
        await userService.deleteUser(req.body.id);
        res.redirect('/userList');
    } catch (error) {
        console.log(error);
    }
}

module.exports={getLoginPage,handleLogin,getCreateUserPage,postRegister,getUserList,createNewUser,getEditUserPage,
    updateUser,deleteUser,getRegisterPage,postLogout}