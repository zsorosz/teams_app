
let shift = document.querySelectorAll('.shifts');
let partTimeShift = document.querySelectorAll('.part-time_shifts');

let cell = document.querySelectorAll('td');
let editForm = document.querySelector('.edit-form');

cell.forEach((cell)=>{
    cell.addEventListener('click', (event)=>{
        editForm.classList.remove('is-open');
        editForm.classList.add('is-open');
    });
})


shift.forEach(element => {
    if(element.innerHTML === "1"){
        element.className = "early";
        element.innerHTML = "8";
    } else if (element.innerHTML === "2"){
        element.className = "late";
        element.innerHTML = "8";
    } else if (element.innerHTML === "3"){
        element.className = "special";
        element.innerHTML = "8";
    } else if (element.innerHTML === "5"){
        element.className = "teamleadShift";
        element.innerHTML = "8";
    } else if (element.innerHTML === "0"){
        element.className = "off";
    }
});
partTimeShift.forEach(element => {
    console.log(element.innerHTML);
    if(element.innerHTML === "1"){
        element.className = "early";
        element.innerHTML = "6";
    } else if (element.innerHTML === "2"){
        element.className = "late";
        element.innerHTML = "6";
    } else if (element.innerHTML === "3"){
        element.className = "special";
        element.innerHTML = "6";
    } else if (element.innerHTML === "5"){
        element.className = "teamleadShift";
        element.innerHTML = "8";
    } else if (element.innerHTML === "0"){
        element.className = "off";
    }
});


