let wood = 0;
let woodPerClick = 1;
let trees = 1000000;

function chopWood () {
    if (trees <= 0)
        return;
    
    wood += woodPerClick;
    trees -= 1;

    update();
}

function saveData () {
    localStorage.setItem('wood', wood);
    localStorage.setItem('woodPerClick', woodPerClick);
    localStorage.setItem('trees', trees);
}

function loadData () {
    if (typeof(localStorage.wood) !== 'undefined')
        wood = parseInt(localStorage.wood);
    if (typeof(localStorage.woodPerClick) !== 'undefined')
        woodPerClick = parseInt(localStorage.woodPerClick);
    if (typeof(localStorage.trees) !== 'undefined')
        trees = parseInt(localStorage.trees);

    update();
}

function update () {
    document.getElementById('wood').innerHTML = 'Wood: ' + wood;
    document.getElementById('trees').innerHTML = 'Trees: ' + trees;
}

loadData();
setInterval(saveData, 60000);