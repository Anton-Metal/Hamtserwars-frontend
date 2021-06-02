import { useState } from 'react'


const InputGallery = () => {
	const [inputName, setInputName] = useState('')
	const [inputAge, setInputAge] = useState('')
	const [inputFavFood, setInputFavFood] = useState('')
	const [inputLoves, setInputLoves] = useState('')
	const [inputImgName, setInputImgName] = useState('')
	const [inputWins, setInputWins] = useState(0)
	const [inputDefeats, setInputDefeats] = useState(0)
	const [inputGames, setInputGames] = useState(0)



	//fältet är flase alltså clean först sen när man skriver i input fältett blri det dirty = true
	const [inputNameTouched, setInputNameTouched] = useState(false)
	const [inputAgeTouched, setInputAgeTouched] = useState(false)
	const [inputFavFoodTouched, setInputFavFoodTouched] = useState(false)
	const [inputLovesTouched, setInputLovesTouched] = useState(false)
	const [inputImgTouched, setInputImgTouched] = useState(false)
	
	

	
	
	// Variabler för validering (kontrollera rimligheten i värden)
	// Ändra bara CSS-klassen om användaren haft en chans att ändra värdet


	//-----------NAME-----------

	// kontrollera om input fältet är valid 
	// nu kontrollerar jag om det är en tom sträng 
	let inputNameIsValid: boolean = true
	let inputNameErrorMessage: string = ''
	if( inputName === '' ) {
		inputNameIsValid = false
		
		inputNameErrorMessage = 'Please write a name.'
	}
	let InputNameClass = ''
		//kolla om man inte har touchad någonting så ka man inte ändra någonting
	if( inputNameTouched ) {
		//om man har touchat fältet blir det antingen valid eller error 
		InputNameClass = (inputNameIsValid ? 'valid' : 'error')
	}


	//-------------- AGE -----------

	const allowedAgeCharacters = "0123456789"
	let inputAgeIsValid: boolean = true
	let inputAgeErrorMessage: string = ''
	if( inputAge === '' ) {
		inputAgeIsValid = false
		inputAgeErrorMessage = 'Please write your age here'


	//för att kontrollera om inputet (number) innehåller godkända tecken
	// kollar om allowNumberCharacters innhehåller första tecknet 
	//loopa igenom strängen och kolla så varje tecken är godkänt 
	//för att kolla igenom varje tecken
	} else if( !inputAge.split('').every(char => allowedAgeCharacters.includes(char)) ) {
		inputAgeIsValid = false
		inputAgeErrorMessage = 'Please write a age.'
	}
	let InputAgeClass = ''
	if( inputAgeTouched ) {
		InputAgeClass = (inputAgeIsValid ? 'valid' : 'error')
	}





	//-----------FAVFOOD--------------


	let inputFavFoodIsValid: boolean = true
	let inputFavFoodMessage: string = ''
	if( inputFavFood === '' ) {
		inputFavFoodIsValid = false
		
		inputFavFoodMessage = 'Please write a hamsters favorite food.'
	}
	let InputFavFoodClass = ''
		//kolla om man inte har touchad någonting så ka man inte ändra någonting
	if( inputFavFoodTouched ) {
		//om man har touchat fältet blir det antingen valid eller error 
		InputFavFoodClass = (inputFavFoodIsValid ? 'valid' : 'error')
	}


	//-------------- LOVES -----------

	let inputLovesIsValid: boolean = true
	let inputLovesMessage: string = ''
	if( inputLoves === '' ) {
		inputLovesIsValid = false
		
		inputLovesMessage = 'Please write something the hamster loves.'
	}
	let InputLovesClass = ''
		//kolla om man inte har touchad någonting så ka man inte ändra någonting
	if( inputLovesTouched ) {
		//om man har touchat fältet blir det antingen valid eller error 
		InputLovesClass = (inputLovesIsValid ? 'valid' : 'error')
	}

	///--------IMG----------
	let inputImgIsValid: boolean = true
	let inputImgMessage: string = ''
	if( inputImgName === '' ) {
		inputImgIsValid = false
		
		inputImgMessage = 'Please write a URL for picture.'
	}
	let InputImgClass = ''
		//kolla om man inte har touchad någonting så ka man inte ändra någonting
	if( inputImgTouched ) {
		//om man har touchat fältet blir det antingen valid eller error 
		InputImgClass = (inputImgIsValid ? 'valid' : 'error')
	}


	

	
	let formIsInvalid = !inputNameIsValid || !inputAgeIsValid || !inputFavFoodIsValid || !inputLovesIsValid || !inputImgIsValid

	
	
	
	async function addHamster() {

		

		
		const hamsterInputData = {
			'name': inputName,
			'age': Number(inputAge),
			'favFood': inputFavFood,
			'loves': inputLoves,
			'imgName': inputImgName,
			'wins': 0,
			'defeats': 0,
			'games': 0

		}

		// för att skickar den nya hamstern till API:t som skickar hamstern vidare till databasen(firestore) 
		await fetch(`/hamsters`, { 
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(hamsterInputData) 

			
		
		})
	}
	
	return (
	<section className="gallery-form">
				

		<div>
				<label> Name </label>
				<input type="text" 
				placeholder="Write a name"	

				//onBlue tar reda på om det är rätt eller inte 
				onBlur={() => setInputNameTouched(true)}
				//för att kontrollera värdet på input fältet
				//när man skriver i inpit fältet ska vi spara värdet i name variabeln
					onChange={e => setInputName(e.target.value)}	
					value={inputName}
					//till för att input fältet ska kunna byta färg på ramen om något har gåt bra eller inte 
					//genom att ta reda på om värdet är valid eller inte 
					className={InputNameClass}
				/>
		
				{inputNameTouched ? <div className="message"> {inputNameErrorMessage}</div> : null }
				

			</div>	
			

			<div>
				<label> Age </label>
				<input type="text"
				placeholder="Write a age"
					onBlur={() => setInputAgeTouched(true)}
					onChange={e => setInputAge(e.target.value)}
					value={inputAge}
					className={InputAgeClass}
				/>
				{inputAgeTouched ? <div className="message"> {inputAgeErrorMessage} </div> : null}
			</div>


			<div>
				<label> FavFood </label>
				<input type="text"
				placeholder="Write a favorite food"
					onBlur={() => setInputFavFoodTouched(true)}
					onChange={e => setInputFavFood(e.target.value)}
					value={inputFavFood}
					className={InputFavFoodClass}
				/>
				{inputFavFoodTouched ? <div className="message"> {inputFavFoodMessage} </div> : null}
			</div>


			<div>
				<label> Loves </label>
				<input type="text"
				placeholder="Write what the hamster loves"
					onBlur={() => setInputLovesTouched(true)}
					onChange={e => setInputLoves(e.target.value)}
					value={inputLoves}
					className={InputLovesClass}
				/>
				{inputLovesTouched ? <div className="message"> {inputLovesMessage} </div> : null}
			</div>
			

			<div>
				<label> IMG </label>
				<input type="text"
				placeholder="Write a Img"
					onBlur={() => setInputImgTouched(true)}
					onChange={e => setInputImgName(e.target.value)}
					value={inputImgName}
					className={InputImgClass}
				/>
				{inputImgTouched ? <div className="message"> {inputImgMessage} </div> : null}
				
			</div>
			
		<button disabled={formIsInvalid} onClick={addHamster}> Add hamster  </button>

	</section>

)}
export default InputGallery