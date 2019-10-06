
let shiftDay = document.querySelectorAll('.shifts');
console.log(shiftDay)


shiftDay.forEach(element => {
    console.log(element.innerHTML);
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
