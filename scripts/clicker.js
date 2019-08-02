let wood = 0;
let woodPerClick = 1;

function chopWood () {
    wood += woodPerClick;

    update();
}

function saveData () {
    localStorage.setItem('wood', wood);
    localStorage.setItem('woodPerClick', woodPerClick);
}

function loadData () {
    if (typeof(localStorage.wood) !== 'undefined')
        wood = localStorage.wood;
    if (typeof(localStorage.woodPerClick) !== 'undefined')
        woodPerClick = localStorage.woodPerClick;

    update();
}

function update () {
    document.getElementById('wood').innerHTML = 'Wood: ' + wood;
}

loadData();
setInterval(saveData, 300000);