let getLoginPage=(req,res)=>{
    res.render('login');
}

let postLoginAdmin=(req,res)=>{
    console.log(req.body);
}

module.exports={getLoginPage,postLoginAdmin}