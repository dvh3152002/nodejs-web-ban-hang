var fs = require('fs');

let recurse=(data,id,text)=>{
    data.map(item=>{
        if(item.parent_id===id){
            item.name=`${text} ${item.name}`;
            recurse(data,item.id,`--${text}`);
        }
    })
}

let getBase64=(data)=>{
    let img = fs.readFileSync(data.path);
    let encode_img = img.toString('base64');
    fs.unlink(data.path, function (err) {
        if (err) console.log(err);
        console.log('File deleted!');
    });
    return encode_img;
}

module.exports= {recurse,getBase64};