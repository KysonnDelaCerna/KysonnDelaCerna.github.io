let wood = 0;
let woodPerClick = 1;

function chopWood () {
    wood += woodPerClick;

    document.getElementById('wood').innerHTML = 'Wood: ' + wood;
}