import {useState} from 'react'



interface ShowMoreProps {

	
	wins:		number,	
	defeats:	number,
	games:		number	
}


const ShowMore = (props: ShowMoreProps) => {
	const [isVisible, setIsVisible] = useState(false)

	let maybeText = null
	if( isVisible ) {
		maybeText = (
			<div>
				<p>	Wins: {props.wins} </p>
				<p> Defeats: {props.defeats} </p>
				<p> Games:{props.games} </p>
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