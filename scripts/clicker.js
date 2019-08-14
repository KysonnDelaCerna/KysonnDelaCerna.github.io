let player = {
    wood: 0,
    woodPerClick: 1,
    house: "false"
}

function chopWood () {
    player.wood += player.woodPerClick;

    update();
}

function saveData () {
    localStorage.setItem('player', JSON.stringify(player));
}

function loadData () {
    if (typeof(localStorage.player) !== 'undefined')
        player = JSON.parse(localStorage.player)

    update();
}

function update () {
    document.getElementById('wood').innerHTML = 'Wood: ' + player.wood;
}

loadData();
setInterval(saveData, 60000);