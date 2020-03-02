let player = {
    resource: {
        wood: {
            amount: 0,
            perClick: 1,
        }
    },
    upgrades: [],
    availableUpgrades: []
}

let upgrades = {};

// Saving and loading
function saveData () {
    localStorage.setItem('player', JSON.stringify(player));
}

function loadData () {
    if (typeof(localStorage.player) !== 'undefined')
        player = JSON.parse(localStorage.player)

    if (typeof(player.resource.research) !== 'undefined')
        createResource('Research', 'Do Research', function() {research();});
    if (typeof(player.resource.sticks !== 'undefined'))
        createResource('Sticks', 'Make Sticks</br>(1 Wood)', function() {makeSticks();});

    player.availableUpgrades.forEach(function (value) {unlock(value);});

    update();
}

// Constructors
function resource () {
    this.amount = 0;
    this.perClick = 1;
}

// Clickys
function chopWood () {
    player.resource.wood.amount += player.resource.wood.perClick;

    if (player.resource.wood.amount >= 100) upgrade('woodHouse');

    update();
}

function research () {
    player.resource.research.amount += player.resource.research.perClick;

    if (player.resource.research.amount >= 10) upgrade('sticks');

    update();
}

function makeSticks () {
    if (player.resource.wood.amount >= 1) {
        player.resource.wood.amount -= player.resource.sticks.perClick;
        player.resource.sticks.amount += player.resource.sticks.perClick;
    }

    update();
}

// Upgrades
function unlock (id) {
    switch (id) {
        case 'woodHouse': createButton('woodHouse', 'Build House</br>(100 Wood)', function() {if (upgradeHouse()) this.parentElement.removeChild(this);}); break;
        case 'sticks': createButton('sticks', 'Research Sticks</br>(10 Research</br>10 Wood)', function() {if (researchSticks()) this.parentElement.removeChild(this);}); break;
    }
}

function upgrade (id) {
    if (player.availableUpgrades.indexOf(id) === -1 && player.upgrades.indexOf(id) === -1) {
        player.availableUpgrades.push(id);
        unlock(id);
    }
}

function createButton (id, message, func) {
    let btn = document.createElement("BUTTON");

    btn.id = id;
    btn.innerHTML = message;
    btn.onclick = func;

    document.getElementById('upgrades').appendChild(btn);
}

function upgradeHouse () {
    let upgraded = false;

    if (player.resource.wood.amount >= 100 && player.upgrades.indexOf('woodHouse') === -1 && player.availableUpgrades.indexOf('woodHouse') > -1) {
        player.resource.wood.amount -= 100;
        player.upgrades.push('woodHouse');
        player.availableUpgrades = player.availableUpgrades.filter(function (value, index, arr) {return value !== 'woodHouse';});
        player.resource.research = new resource();
        createResource('Research', 'Do Research', function() {research();});
        upgraded = true;
    }

    update();
    return upgraded;
}

function researchSticks () {
    let researched = false;

    if (player.resource.wood.amount >= 10 && 
        player.resource.research.amount >= 10 &&
        player.upgrades.indexOf('sticks') === -1 &&
        player.availableUpgrades.indexOf('sticks') > -1) {
        player.resource.wood.amount -= 10;
        player.resource.research.amount -= 10;
        player.upgrades.push('sticks');
        player.availableUpgrades = player.availableUpgrades.filter(function (value, index, arr) {return value !== 'sticks';});
        player.resource.sticks = new resource();
        createResource('Sticks', 'Make Sticks</br>(1 Wood)', function() {makeSticks();});
        researched = true;
    }

    update();
    return researched;
}

function createResource (resourceName, resourceAction, resourceFunc) {
    let p = document.createElement("P");
    p.id = resourceName.toLowerCase() + "Amount";
    document.getElementById('resources').appendChild(p);
    p = document.createElement("BUTTON");
    p.id = resourceName.toLowerCase();
    p.innerHTML = resourceAction;
    p.onclick = resourceFunc;
    document.getElementById('resources').appendChild(p);
}

function update () {
    document.getElementById('woodAmount').innerHTML = 'Wood: ' + player.resource.wood.amount;
    try {document.getElementById('researchAmount').innerHTML = 'Research: ' + player.resource.research.amount;} catch (error) {;}
    try {document.getElementById('sticksAmount').innerHTML = 'Sticks: ' + player.resource.sticks.amount;} catch (error) {;}
}

loadData();
setInterval(saveData, 60000);