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
    else if (keys.toString() === 'h,o,m,e') {
        if (document.title !== 'Kysonn Dela Cerna')
            window.location.href = '/';
    }
    else if (keys.toString() === 'g,i,b,b,y') {
        if (document.title == 'Kysonn Dela Cerna') {
            let elem = document.getElementById("gibby");
            let audio = new Audio('assets/sounds/gibby.mp3');
            audio.play(); 
            let pos = -210;
            let id = setInterval(frame, (document.documentElement.clientHeight + 200) / 1280);
            function frame() {
                if (pos == document.documentElement.clientHeight + 200) {
                    clearInterval(id);
                    elem.style.marginTop = '-210px';
                } else {
                    pos += 12;
                    elem.style.marginTop = pos + 'px';
                }
            }
            console.log("GIBBY");
        }
    }

    keys = [];
}