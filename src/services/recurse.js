let recurse=(data,id,text)=>{
    data.map(item=>{
        if(item.parent_id===id){
            item.name=`${text} ${item.name}`;
            recurse(data,item.id,`--${text}`);
        }
    })
}

export default recurse;