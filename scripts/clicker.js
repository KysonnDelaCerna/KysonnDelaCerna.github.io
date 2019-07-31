let wood = 0;
let woodPerClick = 1;

function chopWood () {
    wood += woodPerClick;

    document.getElementById('wood').innerHTML = 'Wood: ' + wood;
}

function saveCookies () {
    let d = new Date();
    let year = d.getFullYear();
    d = new Date(year + 1, d.getMonth(), d.getDate()).toUTCString();

    let cookie = 'wood=' + wood + ', expires=' + d;

    document.cookie = cookie;
    console.log(cookie);
}

function loadCookies () {
    let cookies = document.cookie.split(',');
    let value;

    for (let i = 0; i < cookies.length - 1; i++) {
        value = cookies[i].split('=')[1];

        switch (i) {
            case 0: wood = value;
            default: console.log('nani');
        }
    }
}

loadCookies();
setInterval(saveCookies, 10000);