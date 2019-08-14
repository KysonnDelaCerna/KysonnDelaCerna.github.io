let player = {
    wood: 0,
    woodPerClick: 1,
    house: 0
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

function buildHouse () {
    if (player.house == 0 && player.wood >= 100) {
        player.wood -= 100;
        player.house = 1;
        player.research = 0;
        player.researchPerClick = 1;
    }

    let btn = document.getElementById("buildHouse");
    btn.parentElement.removeChild(btn);
}

function research () {
    player.research += player.researchPerClick;

    update();
}

function update () {
    document.getElementById('wood').innerHTML = 'Wood: ' + player.wood;

    if (player.house === 0 && player.wood >= 100 && document.getElementById("buildHouse") === null) {
        let btn = document.createElement("BUTTON");
        btn.innerHTML = "Build House (100 Wood)";
        btn.id = "buildHouse";
        btn.onclick = function() {buildHouse();};
        document.body.appendChild(btn);
    }

    if (document.getElementById("researchPoints") === null && document.getElementById("research") === null && player.house >= 1) {
        let p = document.createElement("P");
        p.innerHTML = "Research" + player.research;
        p.id = "researchPoints";
        document.body.appendChild(p);
        p = document.createElement("BUTTON");
        p.id = "research";
        p.innerHTML = "Research";
        p.onclick = function() {research();};
        document.body.appendChild(p);
    } else {
        document.getElementById('reseachPoints').innerHTML = 'Research: ' + player.research;
    }
}

loadData();
setInterval(saveData, 60000);