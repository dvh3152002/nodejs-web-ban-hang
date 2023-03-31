const onChangeSingleImage=()=>{
    const [file] = formFile.files
    if (file) {
        img.src = URL.createObjectURL(file)
    }
}

const onChangeMultipleImage=(event)=> {
    let box = document.getElementById('image-details-before');
    box.style.display = 'none';
    let total_file=document.getElementById("formFileMultiple").files.length;
    for(let i=0;i<total_file;i++){
        $('#image-details').append(`<img class="product-img mx-lg-2" src="${URL.createObjectURL(event.target.files[i])}">`);
    }
}