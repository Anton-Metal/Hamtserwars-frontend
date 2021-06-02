//innehåller skäljva webbsrver grejerna medna database är databas koden
//nmp packet 
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const hamsters = require('./routing/hamsters')

const PORT = process.env.PORT || 5566

//för frotnend
const buildFolder = path.join(__dirname, '../build')
 



//middleware

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url} `, req.params);
	next()
})

// gör om json till js 
//om express.json inte fnns kommre det inte funka att skcika data till serven i request body 
app.use( express.json())
app.use( cors())
// för att publicera en statisk mapp, 
//i stället för att länka till varje sida för sig så lägger länkar man hela mappen i stället 
app.use( express.static(buildFolder) )



//routes

// root fär webroot
app.get('/', (req, res) => {
	console.log('GET /');
	res.send('Examination time')
})


//______ slut på exempel 


//rest api hamsterwars
app.use('/hamsters', hamsters)


// måste vara sist
// för att frontend routing ska fungera 
app.get('*', (req, res) =>  {
	res.sendFile(path.join(__dirname, '../build/index.html'))
})


// starta webserven
app.listen(PORT, () => {
	console.log('Server is listening to port ' + PORT);
})