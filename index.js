const express = require('express');
const path = require('path');

const fs = require('fs');
const port = 4444;

const app = express();


app.get("/", (req, res) =>{
    res.sendFile( path.join(__dirname, "./view/index.html"));
})


app.get("/stilus.css", (req, res) =>{
    res.sendFile( path.join(__dirname, "./view/stilus.css"));
})       

app.get("/kinaik", (req, res) =>{
    res.sendFile( path.join(__dirname, "./data/kinaik.json"));
})         
        
app.get("/kinai.js", (req, res) =>{
    res.sendFile( path.join(__dirname, "./public/kinai.js"));
}) 
       
app.post("/kinai", (req, res) =>{
    let adatom = '';
    req.on('data', (chunk) => {
        adatom += chunk.toString();
    });
    req.on('end', () => {
        const ujKinai = JSON.parse(adatom);



        fs.readFile('./data/kinaik.json', (err, data) => {
            let adatok = JSON.parse(data);
            adatok.push({
                "nev": ujKinai.nev,
                "telefonszam": ujKinai.telefonszam,
                "cim": ujKinai.cim,
                "fajta": ujKinai.fajta,
                "meret": ujKinai.meret,
            });
            fs.writeFile('./data/kinaik.json', JSON.stringify(adatok), () => {
                res.end(JSON.stringify(adatok));
            })
        })
    })
})

       
            

app.get("/", (req, res) => {
    res.redirect("/");
})           

app.listen(port);

