document.getElementById('eddigikinaik').onclick = kinaikLista;

async function kinaikLista() {
    const response = await fetch("/kinaik");
    const kinaik = await response.json();

    var kinaiHTML = "<h1>Az eddigi kínaik listája:</h1>";
    kinaiHTML += `<table id="kinaitabla"><tr><th>Név</th><th>Telefonszám</th><th>Cím</th><th>Fajta</th><th>Méret</th></tr>`;
    for (const egyKinai of kinaik) {
        var sorClass = "közepes";
        if (egyKinai.meret === "kicsi")
            sorClass = "kicsi";
        kinaiHTML += `<tr><td>${egyKinai.nev}</td><td>${egyKinai.telefonszam}</td><td>${egyKinai.cim}</td><td>${egyKinai.fajta}</td>
        <td class=>${sorClass}</td></tr>`;
    }
    kinaiHTML += `</table>`;

    document.getElementById("Kinai").innerHTML = kinaiHTML;
}

document.getElementById("kinaiform").onsubmit = async function (event) {
    event.preventDefault();
    const nev = event.target.elements.nev.value;
    const telefonszam = event.target.elements.telefonszam.value;
    const cim = event.target.elements.cim.value;
    const kozepesErtek  = event.target.elements.meret.checked;
    const fajta = event.target.elements.fajta.value;


    var meret = "kicsi"
    if( kozepesErtek == true)
    meret = "közepes";


    const res = await fetch("/kinaik", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            nev,
            telefonszam,
            cim,
            meret,
            fajta
        }),
    });

    if (res.ok) {
        kinaikLista();
    } else {
        alert("Server error");
    }
};