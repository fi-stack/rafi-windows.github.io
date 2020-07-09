const dbPromised = idb.open("football-database", 1, function (upgradeDb) {
    const teamsObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    teamsObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLater(team) {
    dbPromised
        .then(function (db) {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            console.log(team);
            store.add(team);
            return tx.complete;
        })
        .then(function () {
            alert(`${team.name} berhasil disimpan`);
            console.log("Team berhasil di simpan.");
        });
}

function deleteForLater(team) {
    dbPromised
        .then(function (db) {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            console.log(team);
            store.delete(team.id);
            return tx.complete;
        })
        .then(function () {
            alert(`${team.name} berhasil dihapus`);
            console.log("Team berhasil di delete.");
        });
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function (teams) {
                resolve(teams)
            });
    });
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                const tx = db.transaction("teams", "readonly");
                const store = tx.objectStore("teams");
                return store.get(id);
            })
            .then(function (team) {
                resolve(team);
            });
    });
}