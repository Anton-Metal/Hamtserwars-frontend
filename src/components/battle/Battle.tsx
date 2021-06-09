
import { useEffect, useState } from "react"
import "./Battle.css"


interface Hamster {

	id:			string,
	name: 		string,
	age:		number,	
	favFood:	string,	
	loves:		string,	
	imgName:	string,	
	wins:		number,	
	defeats:	number,
	games:		number	
}






const Battle = () => {
	
	const [hamster1, setHamster1] = useState<null | Hamster> (null) 
	const [hamster2, setHamster2] = useState<null | Hamster> (null) 
	const [showResult, setShowResult] = useState(false)


	
	async function gamehamster1() {
		console.log(showResult);
		if(!hamster1 || !hamster2) {
			return
		}
		// Om resultatet inte visas så kör matchen .
		
		if (!showResult) {

			// Registrerar matchresultatet
			setHamster1({...hamster1, wins: hamster1.wins + 1, games: hamster1.games + 1})
			setHamster2({...hamster2, defeats: hamster2.defeats + 1, games: hamster2.games + 1})
			const winnerChanges = {wins: hamster1.wins + 1, games: hamster1.games + 1}
			
			await fetch(`/hamsters/${hamster1.id}`, 
			{ method: 'PUT', 
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(winnerChanges) 
			})

			const defeatsChanges = {defeats: hamster2.defeats + 1, games: hamster2.games + 1}
			await fetch(`/hamsters/${hamster2.id}`, 
			{ method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(defeatsChanges) 
			})

			// Visa match resultatet
			setShowResult(true)
		}
	}


	async function gamehamster2() {
		console.log(showResult);
		if(!hamster1 || !hamster2) {
			return
		}
		// Om resultatet inte visas så kör matchen .
		
		if (!showResult) {

			// Registrerar matchresultatet
			setHamster2({...hamster2, wins: hamster2.wins + 1, games: hamster2.games + 1})
			setHamster1({...hamster1, defeats: hamster1.defeats + 1, games: hamster1.games + 1})
			const winnerChanges = {wins: hamster2.wins + 1, games: hamster2.games + 1}
			
			await fetch(`/hamsters/${hamster2.id}`, 
			{ method: 'PUT', 
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(winnerChanges) 
			})

			const defeatsChanges = {defeats: hamster2.defeats + 1, games: hamster2.games + 1}
			await fetch(`/hamsters/${hamster1.id}`, 
			{ method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(defeatsChanges) 
			})

			// Visa match resultatet
			setShowResult(true)
		}
	}
	



	async function startANewMatch() {
		
		setShowResult(false)

		
		let response = await fetch('/hamsters/random', {method: 'GET' })
		let data: Hamster = await response.json()
		setHamster1(data)	

		response = await fetch('/hamsters/random', {method: 'GET' })
		data = await response.json()
		setHamster2(data)

	}
	
	

	//för att skicka ett fetch request när komponenten maountas 
	useEffect(() => {
		async function getRandomHamster() {
		// async ovan och await nedean eftersom request är en aysnc händlese
			let response = await fetch('/hamsters/random', {method: 'GET' })
			
			//för att göra om svaret från json till js
			let data: Hamster = await response.json()
			setHamster1(data)	

			 response = await fetch('/hamsters/random', {method: 'GET' })
			 data = await response.json()
			setHamster2(data)

			
		}
		getRandomHamster()
		//tom aray = callbacken kör en gång
	}, [])

	//göra en if stats om hamster 1 eller 2 är null

	// kontrollera att hamster1 och hamster2 inte är null
	if( hamster1 == null || hamster2 == null ) {
		return (

			<p>Load, waiting to get hamsters</p>

		)
					
	}					 		
	
	return(
		

		<section className='battle-page'>
			
			<div key={hamster1.id} className='battle-component'>
			<div><strong> {hamster1.name} </strong></div>
			<div><strong> Age: {hamster1.age} </strong></div>
			<img src={ './img/' + hamster1.imgName } alt="bild på hamster" />
			<button onClick={() => gamehamster1()}>Vote to win</button>
			</div>
			<h1>VS</h1>
			<div key={hamster2.id} className='battle-component'>
			<div><strong> {hamster2.name} </strong></div>
			<div><strong> Age: {hamster2.age} </strong></div>
			<img src={ './img/' + hamster2.imgName } alt="bild på hamster" />
			<button onClick={() => gamehamster2()}>Vote to win</button>
				</div>



			
			{showResult ? 
			
			<div className='victory-box'>

				<h2> Yeey</h2>

				<div>
					<div>
						<p><strong>{hamster1.name}</strong></p>
						<p>Wins: {hamster1.wins}</p>
						<p>Games: {hamster1.games}</p>
						<p>Defeats: {hamster1.defeats}</p>
					</div>

					<div>
						<p><strong>{hamster2.name}</strong></p>
						<p>Wins: {hamster2.wins}</p>
						<p>Games: {hamster2.games}</p>
						<p>Defeats: {hamster2.defeats}</p>
					</div>
				</div>
				
				<button onClick={startANewMatch}>Play again</button>

			</div>
			: ''}
			
		</section>

		)
		 //'Hämtar 2 random hamstrar'
		
		



}
export default Battle