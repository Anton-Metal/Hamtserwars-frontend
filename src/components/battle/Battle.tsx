
import { useEffect, useState } from "react"

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
			<div key={hamster1.id} className='card-item'>
			<div> {hamster1.name} </div>
			<div> {hamster1.age} </div>
			<img src={ './img/' + hamster1.imgName } alt="bild på hamster" />
			</div>
			<h1>VS</h1>
			<span className='battle-card'>
			<div> {hamster2.name} </div>
			<div> {hamster2.age} </div>
			<img src={ './img/' + hamster2.imgName } alt="bild på hamster" />
			</span>
			
			
		</section>

		)
		 //'Hämtar 2 random hamstrar'
		
		



}
export default Battle

