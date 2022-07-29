import { useState } from 'react'

function App() {
	const [animal, setAnimal] = useState('')
	const [fruit, setFruit] = useState('')
	const [favoriteAnimalAndFruit, selectFavoriteAnimalAndFruitHandler] =
		useState('')
	const options = {
		animals: {
			cow: 'cow',
			cat: 'cat',
			dog: 'dog',
		},
		fruits: {
			orange: 'orange',
			melon: 'melon',
			apple: 'apple',
		},
	}
	const selectAnimalsHandler = (e) => {
		setAnimal(e.target.value)
	}
	const selectFruitsHandler = (e) => {
		setFruit(e.target.value)
	}
	return (
		<>
			<label htmlFor="animal">Choose Your Favorite Animal:</label>
			<br />
			<select id="animal" value={animal} onChange={selectAnimalsHandler}>
				<option value={null}>-</option>
				<option value={options.animals.cow}>cow</option>
				<option value={options.animals.cat}>cat</option>
				<option value={options.animals.dog}>dog</option>
			</select>
			<br />
			<br />
			<label htmlFor="animal">Choose Your Favorite Fruit:</label>
			<br />
			<select id="fruit" value={fruit} onChange={selectFruitsHandler}>
				<option value={null}>-</option>
				<option value={options.fruits.orange}>orange</option>
				<option value={options.fruits.melon}>melon</option>
				<option value={options.fruits.apple}>apple</option>
			</select>
			<br />
			<br />
			{animal && fruit && (
				<>
					<label htmlFor="favorite">
						Now You Can Choose Your Favorite Animal Or Fruit
					</label>
					<br />
					<select
						id="favorite"
						value={favoriteAnimalAndFruit}
						onChange={selectFavoriteAnimalAndFruitHandler}
					>
						<option value={animal}>{animal}</option>
						<option value={fruit}>{fruit}</option>
					</select>
				</>
			)}
		</>
	)
}

export default App
