import {useState} from 'react'


const ShowMore = () => {
	const [isVisible, setIsVisible] = useState(false)

	let maybeText = null
	if( isVisible ) {
		maybeText = (
			<div>
				<p>	Wins: </p>
				<p> Defeats: </p>
				<p> Games: </p>
			</div>
		)
	}

	let buttonText;
	if( isVisible ) {
		buttonText = 'Show Less'
	} else {
		buttonText = 'Show More'
	}

	const toggleVisibility = () => {
		setIsVisible( !isVisible )
	}

	return (
		<div>
			<div>
				<button onClick={toggleVisibility}>
					{buttonText}
				</button>
			</div>
			{maybeText}
		</div>
	)
}


export default ShowMore