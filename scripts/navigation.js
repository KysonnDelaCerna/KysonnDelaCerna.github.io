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

    keys = [];
}