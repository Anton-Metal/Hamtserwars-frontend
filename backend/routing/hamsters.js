// importera databas funktioner
const getDataBase = require('../database.js')
// hämta ett databas objekt 
const db = getDataBase()

const express = require('express')
const router = express.Router()


// lägga till rest API
// GET hamsterwars
router.get('/', async (req, res) => {
	

	const docRef = db.collection('hamsterDocs')
	const snapshot = await docRef.get()

	


	if( snapshot.empty ) {
		res.send([])
		return
 	}


	let items = []
	//hämtar datan och lägger den i en aray
	snapshot.forEach(doc => {
		const data = doc.data()
		// för att id ska visas i datan
		// ID behövs för post put delete
		data.id = doc.id
		items.push( data )
	})
	

	res.send(items)
})



// GET /hamsters/random
router.get('/random', async (req, res) => {
    try {
 
        // Den kollar om databasen är tom
        const docRef = db.collection('hamsterDocs')
        const snapshot = await docRef.get()
 
        if( snapshot.empty ) {
            console.log('No collection found.');
            res.status(404).send('No collection found.')
            return
        }
 
        // fyller en array för att kunna slumpa fram en hamster här ifrån
        let hamsters = []
 
        snapshot.forEach(doc => { 
			// 	loop
            const hamster = doc.data()
            hamster.id = doc.id
            hamsters.push( hamster )
        })
    
        // allt gick bra (200), Slumpar fram en hamster från "hamsters" och skickar.
        randomHamster = hamsters[getRandomInt(hamsters.length)]
        res.status(200).send(randomHamster)
 
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
	
})
	


// GET /hamsterwars/:id

router.get('/:id', async (req, res) => {

	const id = req.params.id
	const docRef = await db.collection('hamsterDocs').doc(id).get()

	if( !docRef.exists ) {
		res.status(404).send('No matching id')
		return
	}

	const data = docRef.data()
	//för att vissa id
	data.id = docRef.id
	res.send(data)

	})




	// POST /hamsters
	router.post('/', async (req, res) => {
    	try {
        	const body = req.body
 
			
        	// Validerar body:n
        	if (bodyKeys(body, res) === false) { res.sendStatus(400); return }
        	if (bodyValues(body, res) === false) { res.sendStatus(400); return }
 
        	// Allt gick bra (200). Hamstern skickas in i databasen, och klienten får ett objekt med hamsterns id.
        	const docRef = await db.collection('hamsterDocs').add(body)
        	const idObject = { id: docRef.id } // Objectet krävs av uppgifts-specen
        	res.status(200).send(idObject)
        
    	} catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})


	
	// PUT /hamsters/:id
router.put('/:id', async (req, res) => {
    try {   
        const body = req.body
 
        // validerar body
        if( bodyObject(body, res) === false ) { return }
 
        const id = req.params.id
        const docRef = db.collection('hamsterDocs').doc(id)
        const doc = await docRef.get();
 
        // validerar id och kontrollerar att hamstern finns
        if ( idHamster(id, doc, res) === false) { return }   
 
        let hamster = doc.data();
 
        // Kollar så att body:ns properties matchar med databasens "hamsterns" properties
        if (propertyKeys(body, hamster, res) === false) { return }
        if (propertyValues(body, res) === false) { return }
 
        // Skickar över data från body till hamster
		// "Object.Keys()" Gör att man kan hantera ett objekt som en array (i loopen) 
		// så "Object.Keys()" basically gör objektet till en aray medans funktionen körs 
  /*      Object.keys(body).forEach(bodyKey => { 
            if (hamster[bodyKey]) { // "hamster[bodyKey]" letar efter en nyckel i "hamster" som matchar nyckeln i body
                hamster[bodyKey] = body[bodyKey] // Den del av hamster som matchar med body, ska overridas av body:n
            }
        });
	*/
 
        // Allt gick bra (200). Hamstern uppdateras
		console.log('putting hamster', hamster, body)
        await docRef.set(body, { merge: true })
        res.sendStatus(200)
 
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
})


	// DELETE / hamsterwars/:id
	// för att tala om vilket dokument som ska tas bort ('/:id')
	router.delete('/:id', async(req, res) => {
		// plocka ut id  params.id för att vara exakt plockar ut id 
		const id = req.params.id
		const docRef = await db.collection('hamsterDocs').doc(id).get()


		// kontrolera om id är giltig 
		if( !docRef.exists ) {
			res.status(404).send('No matching id')
			return
		}
		// 								id för att välja ut dokumentet 
		await db.collection('hamsterDocs').doc(id).delete()
		res.sendStatus(200)
	})

	
// --------- bodykeys i POST
	function bodyKeys(body, res){
 
    console.log('Checking hamster keys');
 
    // Kollar så att antalet properties stämmer
    if( Object.keys(body).length > 8 ) {
        console.log('To many properties');
        res.status(400).send('To many properties')
        return false
    }
 
    // Kollar så att alla nyckar finns med
	// checkar name 
    if (typeof body.name === 'undefined') {
        console.log('Hamster needs a "name"');
        res.status(400).send('Hamster needs a "name"')
        return false
    }
	// checkar age	
    if (typeof body.age === 'undefined') {
        console.log('Hamster needs a "age"');
        res.status(400).send('Hamster needs a "age"')
        return false
    }
	// checkar favFood
    if (typeof body.favFood === 'undefined') {
        console.log('Hamster needs a "favFood"');
        res.status(400).send('Hamster needs a "favFood"')
        return false
    }
	// checkar loves
    if (typeof body.loves === 'undefined') {
        console.log('Hamster needs a "loves"');
        res.status(400).send('Hamster needs a "loves"')
        return false
    }
	// checkar imgName
    if (typeof body.imgName === 'undefined') {
        console.log('Hamster needs a "imgName"');
        res.status(400).send('Hamster needs a "imgName"')
        return false
    }
	// checkar wins
    if (typeof body.wins === 'undefined') {
        console.log('Hamster needs a "wins"');
        res.status(400).send('Hamster needs a "wins"')
        return false
    }
	// checkar defeats
    if (typeof body.defeats === 'undefined') {
        console.log('Hamster needs a "defeats"');
        res.status(400).send('Hamster needs a "defeats"')
        return false
    }
	// checkar games
    if (typeof body.games === 'undefined') {
        console.log('Hamster needs a "games"');
        res.status(400).send('Hamster needs a "games"')
        return false
    }
 
    console.log('All keys are there. All good');
    return true
	}



// ------bodyValues i POST 
function bodyValues(body, res){
 
    console.log('Checking hamster values');
 
    // Kollar så att alla värden är ifyllda och är i rätt data-typ
	// checkar name
    if (typeof body.name !== 'string' || body.name === '') {
        console.log('"name" must be a string');
        res.status(400).send('"name" must be a string')
        return false
    }
	// checkar number
    if (typeof body.age !== 'number' || body.age < -1) {
        console.log('"age" needs to be a positive number');
        res.status(400).send('"age" needs to be a positive number')
        return false
    }
	// checkar favfood
    if (typeof body.favFood !== 'string' || body.favFood === '') {
        console.log('"favFood" must be a string');
        res.status(400).send('"favFood" must be a string')
        return false
    }
	// checking loves
    if (typeof body.loves !== 'string' || body.loves === '') {
        console.log('"loves" must be a string');
        res.status(400).send('"loves" must be a string')
        return false
    }
	// checkar imgName
    if (typeof body.imgName !== 'string' || body.imgName === '') {
        console.log('"imgName" must be a string');
        res.status(400).send('"imgName" must be a string')
        return false
    }
	// checking wins
    if (typeof body.wins !== 'number' || body.wins < -1) {
        console.log('"wins" must be a positive number');
        res.status(400).send('"wins" must be a positive number')
        return false
    }
	// checking defeats
    if (typeof body.defeats !== 'number' || body.defeats < -1) {
        console.log('"defeats" must be a positive number');
        res.status(400).send('"defeats" must be a positive number')
        return false
    }
	// checking games
    if (typeof body.games !== 'number' || body.games < -1) {
        console.log('"games" must be a positive number');
        res.status(400).send('"games" must be a positive number')
        return false
    }
 
    // Kollar så att body:ns wins, defeats och games går ihop
    if (body.wins + body.defeats !== body.games) {
        console.log('"games" must be the sum of "wins" and "defeats"');
        res.status(400).send('"games" must be the sum of "wins" and "defeats"')
        return false
    }
 
    console.log('All properties are valid.')
    return true
}

// ------propertyValues i PUT 
function propertyValues(body, res){
 
    console.log('Checking object values');
 
    let numbersValid = true
    let stringsValid = true
 
    Object.keys(body).forEach(bodyKey => { // "Object.Keys()" Gör så att man kan hantera ett objekt som en array (loopa)
 
        // Kollar så att bodynyckelns värde har rätt datatyp
        if (bodyKey === 'age' || bodyKey === 'wins' || bodyKey === 'defeats' || bodyKey === 'games') {
            if ( typeof body[bodyKey] != 'number') {
                numbersValid = false
            }
        }
        if (bodyKey === 'name' || bodyKey === 'favFood' || bodyKey === 'loves' || bodyKey === 'imgName') {
            if ( typeof body[bodyKey] != 'string') {
                stringsValid = false
            }
        }
    });
 
    // Om datatypen är fel så går queryn inte igenom
    if (numbersValid === false) {
        console.log('"age", "wins", "defeats" and "games" must be numbers. Query rejected.');
        res.status(400).send('"age", "wins", "defeats" and "games" must be numbers. Query rejected.')
        return false    
    }
    if (stringsValid === false) {
        console.log('"name", "favFood", "loves" and "imgName" must be strings. Query rejected.');
        res.status(400).send('"name", "favFood", "loves" and "imgName" must be strings. Query rejected.')
        return false    
    }
 
    console.log('Object values analyzed. All seems fine.');
    return true
}


// ------propertyKeys i PUT 
function propertyKeys(body, hamster, res){
 
    console.log('Checking keys');
 
    let keyExists = true
 
    // Loopar igenom body och checkar så att inga nyckar är fel
    Object.keys(body).forEach(bodyKey => {
        if (hamster[bodyKey] === undefined) {
            keyExists = false
        }
    });
 
    // Om någon nyckel inte stämmer så skickas ett fel meddelande
    if (keyExists === false) {
        console.log('Key is not matching');
        res.status(400).send('Key is not matching')
        return false
    }
 
    console.log('Keys checked. All good');
    return true
}

// Kollar id
function idHamster(id, docRef, res){
 
    console.log('Checking id');
 
    // Validering av request
    if( !id ) {
        console.log('Missing id');
        res.status(400).send('Missing id')
        return false
    }
 
    // Kollar ifall hamstern finns
    if ( !docRef.exists ) {
        console.log('No hamster.');
        res.status(404).send('No hamster.')
        return false
    }
 
    console.log('Hamster found');
    return true
}

// Går igenom body:n / scannar body:n
function bodyObject(body, res) {
    console.log('Checking body object');
 
    if( !body ) { // Kollar om det finns en body
        console.log('Missing body');
        res.status(400).send('Missing body')
        return false
    }
 
    if( typeof body !== 'object' ) { // Kollar om body ett object?
        console.log('Body must be an object');
        res.status(400).send('Body must be an object')
        return false
    }
 
    if (Object.keys(body).length < 1) { // kollar om body-objektet tomt?
        console.log('Body is empty');
        res.status(400).send('Body is empty')
        return false
    }
 
    console.log('Body is checked, all good');
    return true
}

// Random funktionen 
function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}
	
module.exports = router