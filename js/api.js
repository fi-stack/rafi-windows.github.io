const base_url = "https://api.football-data.org/v2/";

const fetchApi = url => {
    return fetch(url, {
        headers: {
            "X-Auth-Token": "9c78f4353126450da2bc0a570b7e1ed4"
        }
    });
}

// Blok kode yang akan dipanggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log(`Error : ${response.status}`);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}

// Blok kode untuk memparsing json menjadi array Javascript
function json(response) {
    return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter berasal dari Promise.reject()
    console.log(`Error : ${error}`);
}

// Blok kode untuk melakukan request data json
function getTeams() {
    if ("caches" in window) {
        caches.match(base_url + "teams").then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    let teamsHTML = "";
                    data.teams.forEach(function (team) {
                        teamsHTML += `
                                    <div class="card">
                                        <a href="./team.html?id=${team.id}">
                                            <div class="card-image waves-effect waves-block waves-light">
                                                <img src="${team.crestUrl}" />
                                            </div>
                                        </a>
                                        <div class="card-content">
                                            <span class="card-title truncate">${team.name}</span>
                                                <p>${team.website}</p>
                                        </div>
                                    </div>
                                `;
                    });
                    // Sisipkan komponen card ke dalam elemen dengan id #teams
                    document.getElementById("teams").innerHTML = teamsHTML;
                });
            }
        });
    }

    fetchApi(base_url + "teams")
        .then(status)
        .then(json)
        .then(function (data) {
            // Objek/array Javascript dari response.json() masuk lewat variabel data.
            // console.log(data);
            // Menyusun komponen card teams secara dinamis
            let teamsHTML = "";
            data.teams.forEach(function (team) {
                teamsHTML += `
                            <div class="card">
                                <a href="./team.html?id=${team.id}">
                                    <div class="card-image waves-effect waves-block waves-light">
                                        <img src="${team.crestUrl}" />
                                    </div>
                                </a>
                                <div class="card-content">
                                    <span class="card-title truncate">${team.name}</span>
                                        <p>${team.website}</p>
                                </div>
                            </div>
                        `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #teams
            document.getElementById("teams").innerHTML = teamsHTML;
        })
        .catch(error);
}

function getTeamById() {
    return new Promise(function (resolve, reject) {
        // Ambil nilai query parameter (?id=)
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(base_url + "teams/" + idParam).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        // Objek Javascript dari response.json() masuk lewat variabel data.
                        // console.log(data);
                        // Menyusun komponen card team secara dinamis
                        const teamHTML = `
                                        <div class="card">
                                            <div class="card-image waves-effect waves-block waves-light">
                                                <img src="${data.crestUrl}" />
                                            </div>
                                            <div class="card-content">
                                                <span class="card-title">${data.name}</span>
                                                <p>Last Updated : ${data.lastUpdated}</p>
                                            </div>
                                        </div>
                                    `;

                        let playerHTML = "";
                        data.squad.forEach(function (player) {
                            // Objek Javascript dari response.json() masuk lewat variabel data.
                            // console.log(player);
                            // Menyusun komponen card team secara dinamis
                            playerHTML += `
                                        <div class="card">
                                            <div class="card-content">
                                                <span class="card-title">Detail Player</span>
                                                <p>Name : ${player.name}</p>
                                                <p>Shirt Number : ${player.shirtNumber}</p>
                                                <p>Position : ${player.position}</p>
                                                <p>Role : ${player.role}</p>
                                                <p>Nationality : ${player.nationality}</p>
                                                <p>Date of Birth : ${player.dateOfBirth}</p>
                                                <p>Country of Birth : ${player.countryOfBirth}</p>
                                            </div>
                                        </div>
                                    `;
                        });
                        // Sisipkan komponen card ke dalam elemen dengan id #content
                        document.getElementById("body-content").innerHTML = teamHTML + playerHTML;
                        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
                        resolve(data);
                    });
                }
            });
        }

        fetchApi(base_url + "teams/" + idParam)
            .then(status)
            .then(json)
            .then(function (data) {
                // Objek Javascript dari response.json() masuk lewat variabel data.
                // console.log(data);
                // Menyusun komponen card team secara dinamis
                const teamHTML = `
                            <div class="card">
                                <div class="card-image waves-effect waves-block waves-light">
                                    <img src="${data.crestUrl}" />
                                </div>
                                <div class="card-content">
                                    <span class="card-title">${data.name}</span>
                                    <p>Last Updated : ${data.lastUpdated}</p>
                                </div>
                            </div>
                        `;

                let playerHTML = "";
                data.squad.forEach(function (player) {
                    // Objek Javascript dari response.json() masuk lewat variabel data.
                    // console.log(player);
                    // Menyusun komponen card team secara dinamis
                    playerHTML += `
                            <div class="card">
                                <div class="card-content">
                                    <span class="card-title">Detail Player</span>
                                    <p>Name : ${player.name}</p>
                                    <p>Shirt Number : ${player.shirtNumber}</p>
                                    <p>Position : ${player.position}</p>
                                    <p>Role : ${player.role}</p>
                                    <p>Nationality : ${player.nationality}</p>
                                    <p>Date of Birth : ${player.dateOfBirth}</p>
                                    <p>Country of Birth : ${player.countryOfBirth}</p>
                                </div>
                            </div>
                        `;
                });
                // Sisipkan komponen card ke dalam elemen dengan id #content
                document.getElementById("body-content").innerHTML = teamHTML + playerHTML;
                // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
                resolve(data);
            });
    });
}

function getSavedTeams() {
    getAll().then(function (teams) {
        console.log(teams);
        // Menyusun komponen card team secara dinamis
        let teamsHTML = "";
        teams.forEach(function (team) {
            teamsHTML += `
                        <div class="card">
                            <a href="./team.html?id=${team.id}&saved=true">
                                <div class="card-image waves-effect waves-block waves-light">
                                    <img src="${team.crestUrl}" />
                                </div>
                            </a>
                            <div class="card-content">
                                <span class="card-title truncate">${team.name}</span>
                                <p>${team.website}</p>
                            </div>
                        </div>
                    `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #body-content
        document.getElementById("body-content").innerHTML = teamsHTML;
    });
}

function getSavedTeamById() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    getTeamById(idParam).then(function (team) {
        const teamHTML = `
                    <div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img src="${team.crestUrl}"/>
                        </div>
                        <div class="card-content">
                            <span class="card-title">${team.name}</span>
                            <p>${team.website}</p>
                        </div>
                    </div>
                `;

        let playerHTML = "";
        team.squad.forEach(function (player) {
            playerHTML += `
                        <div class="card">
                            <div class="card-content">
                                <span class="card-title">Detail Player</span>
                                <p>Name : ${player.name}</p>
                                <p>Shirt Number : ${player.shirtNumber}</p>
                                <p>Position : ${player.position}</p>
                                <p>Role : ${player.role}</p>
                                <p>Nationality : ${player.nationality}</p>
                                <p>Date of Birth : ${player.dateOfBirth}</p>
                                <p>Country of Birth : ${player.countryOfBirth}</p>
                            </div>
                        </div>
                    `;
        })
        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = teamHTML + playerHTML;
    });
}