let keys = [];

document.addEventListener("keyup",keyup,false);

function keyup(e) {
    if (!e) e= event;
    if (keys.length >= 50)
        keys = [];
    if (e.key !== "Enter")
        keys.push(e.key);
    else
        checkKeys();
}

function checkKeys () {
    if (keys.toString() === "g,i,t,h,u,b") {
        window.location.href = "http://www.github.com/KysonnDelaCerna";
    }
    else if (keys.toString() === "c,l,i,c,k,e,r") {
        window.location.href = "/clicker";
    }

    keys = [];
}