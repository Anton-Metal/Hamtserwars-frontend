


//måste skicka fetch request när komponenten maountas 
// alltså när komponenten renderas för första gången 

import { useEffect, useState } from "react"
import InputGallery from './InputGallery'
import ShowMore from './ShowMore'
import './Gallery.css'



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


const Gallery = () =>  {
	const [hamsters, setHamsters] = useState<null | Hamster[]> (null)

	//för att skicka ett fetch request när komponenten maountas 
	// då behövs useEffect
	useEffect(() => {
		async function get() {
		//requst är async händelse
		// alltså vi skickar request och så vill vi vänta tills man får svar
		const response = await fetch('/hamsters', { method: 'GET' })
		//när svaret kommer så väntar man på att göra om det från json format till js
		const data: Hamster[] = await response.json()
		setHamsters(data)
		
	}

		
	get()
	//tom aray betyder att callbacken ska köra en gång
	}, [])

	

	
		// DELETE request using fetch with async/await
		async function deleteHamster(hamsterDeleteId: string) {
			await fetch('/hamsters/' + hamsterDeleteId , { method: 'DELETE' });
			
				const response = await fetch('/hamsters', { method: 'GET' })
				const data: Hamster[] = await response.json()
				setHamsters(data)
		}
	return(
	<div>
	<section className='gallery'>
		{hamsters 
		? hamsters.map(hamster => (

			//hamster.id
			<div key={hamster.id} className='gallery-item'>
			
			<h2>	{hamster.name} </h2>
			<p>	Age: {hamster.age} </p>
			<img src={ './img/' + hamster.imgName } alt="bild på hamster" />
			<ShowMore wins={hamster.wins} defeats={hamster.defeats} games={hamster.games}/> 		
			<br />	
			<button onClick={() => deleteHamster(hamster.id)}>Remove</button>
		

			</div>

		))
		: 'Hämtar hamstrar'
		}

		</section>

		

		<InputGallery />

		<footer>
			Anton Melin
		</footer>
		
	</div>

)}
export default Gallery

