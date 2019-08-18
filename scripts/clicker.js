let player = {
    resource: {
        wood: {
            amount: 0,
            perClick: 1
        }
    },
    house: 0
}

function click (type) {
    player.resource[type].amount += player.resource[type].perClick;

    update();
}

function saveData () {
    localStorage.setItem('player', JSON.stringify(player));
}

function loadData () {
    if (typeof(localStorage.player) !== 'undefined')
        player = JSON.parse(localStorage.player)

    document.getElementById("chopWood").onclick = function() {click('wood');};

    update();
}

function upgradeHouse () {
    if (player.house == 0 && player.resource.wood.amount >= 100) {
        player.resource.wood.amount -= 100;
        player.house = 1;
        player.resource.research = {
            amount: 0,
            perClick: 1
        };
    }

    let btn = document.getElementById("upgradeHouse");
    btn.parentElement.removeChild(btn);

    update();
}

function update () {
    document.getElementById('wood').innerHTML = 'Wood: ' + player.resource.wood.amount;

    if (player.house === 0 && player.resource.wood.amount >= 100 && document.getElementById("upgradeHouse") === null) {
        let btn = document.createElement("BUTTON");
        btn.innerHTML = "Build House</br>(100 Wood)";
        btn.id = "upgradeHouse";
        btn.onclick = function() {upgradeHouse();};
        document.body.appendChild(btn);
    }

    if (document.getElementById("researchAmount") === null && document.getElementById("research") === null && player.house >= 1) {
        let p = document.createElement("P");
        p.innerHTML = "Research: " + player.resource.research.amount;
        p.id = "researchAmount";
        document.body.appendChild(p);
        p = document.createElement("BUTTON");
        p.id = "research";
        p.innerHTML = "Research";
        p.onclick = function() {click('research');};
        document.body.appendChild(p);
    } else {
        try {
            document.getElementById('researchAmount').innerHTML = 'Research: ' + player.resource.research.amount;
        } catch (error) {
            ;
        }
    }
}

loadData();
setInterval(saveData, 60000);
