import db from "../models";

const checkLogin=(req,res,next)=>{
    if(req.session.isAuthenticated){
        return res.redirect('/cartegoryList')
    }
    next();
}

const checkPerformission=async(req,res,next)=>{
    if(req.session.isAuthenticated){
        let role_id=req.session.authUser.role_id;
        if(role_id==='R1'){
            next();
        }else{
            let url=req.url.split("/",3);
            let permission=await db.Permission.findOne({
                where:{
                    url_name:url[1]
                }
            })
            if(permission){
                let dataRolePermission=await db.Permission_Role.findOne({
                    where:{
                        role_id:role_id,
                        permission_id:permission.keyMap
                    }
                })
                if(dataRolePermission){
                    next();
                }else{
                    res.send("ban ko du quyen truy cap")
                }
            }else{
                res.send("ban ko du quyen truy cap")
            }
        }
    }else{
        res.redirect('/login');
    }
}

module.exports={checkLogin,checkPerformission};