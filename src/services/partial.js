var fs = require('fs');

let recurse=(data,id,text)=>{
    data.map(item=>{
        if(item.parent_id===id){
            item.name=`${text} ${item.name}`;
            recurse(data,item.id,`--${text}`);
        }
    })
}

let deleteImg=(img_path)=>{
    fs.unlink(img_path, function (err) {
        if (err) console.log(err);
        console.log('File deleted!');
    });
}

module.exports= {recurse,deleteImg};