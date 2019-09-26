let keys = [];

document.addEventListener('keyup',keyup,false);

function keyup(e) {
    if (!e) e= event;
    if (keys.length >= 50)
        keys = [];
    if (e.key !== 'Enter')
        keys.push(e.key);
    else
        checkKeys();
}

function checkKeys () {
    if (keys.toString() === 'g,i,t,h,u,b') {
        window.location.href = 'https://www.github.com/KysonnDelaCerna';
    }
    else if (keys.toString() === 'c,l,i,c,k,e,r') {
        if (document.title !== 'Clicker')
            window.location.href = '/clicker';
    }
    else if (keys.toString() === 'h,o,m,e') {
        if (document.title !== 'Kysonn Dela Cerna')
            window.location.href = '/';
    }
    else if (keys.toString() === 'g,i,b,b,y') {
        if (document.title == 'Kysonn Dela Cerna') {
            let elem = document.getElementById("gibby");
            let audio = new Audio('assets/gibby.mp3');
            audio.play(); 
            let pos = -50;
            let id = setInterval(frame, 4);
            function frame() {
                if (pos == 150) {
                    clearInterval(id);
                    elem.style.marginTop = '-50%';
                } else {
                    pos++;
                    elem.style.marginTop = pos + '%';
                }
            }
            console.log("GIBBY");
        }
    }

    keys = [];
}