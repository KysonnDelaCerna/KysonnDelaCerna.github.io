let wood = 0;
let woodPerClick = 1;

function chopWood () {
    wood += woodPerClick;

    document.getElementById('wood').innerHTML = 'Wood: ' + wood;
}

function saveCookies () {
    Cookies.set('wood', wood.toString(), {expires: 7, path: ''});

    console.log(document.cookies);
}

setInterval(saveCookies, 10000);