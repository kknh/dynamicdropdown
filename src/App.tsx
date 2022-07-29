import React, { useState, useRef } from 'react'

enum Category {
	animals = 'animals',
	fruits = 'fruits',
}
interface Item {
	name: string
}

interface InitialData {
	animals: Item[]
	fruits: Item[]
}

const initialData: InitialData = {
	animals: [{ name: 'cow' }, { name: 'cat' }, { name: 'dog' }],
	fruits: [{ name: 'orange' }, { name: 'melon' }, { name: 'apple' }],
}

function App() {
	const [data, setData] = useState<InitialData>(initialData)
	const [animalSelection, setAnimalSelection] = useState<string>('')
	const [fruitSelection, setFruitSelection] = useState<string>('')
	const [favoriteAnimalAndFruit, setFavoriteAnimalAndFruit] =
		useState<string>('')

	const animalInput = useRef<HTMLInputElement>(null)
	const fruitInput = useRef<HTMLInputElement>(null)

	const handleSelectAnimal = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setAnimalSelection(e.target.value)
	}
	const handleSelectFruit = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFruitSelection(e.target.value)
	}
	const handleSelectFavoriteAnimalOrFruit = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setFavoriteAnimalAndFruit(e.target.value)
	}

	const handleChangeAddAnimal = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (animalInput.current) {
			animalInput.current.value = e.target.value
		} else {
			return null
		}
	}
	const handleChangeAddFruit = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (fruitInput.current) {
			fruitInput.current.value = e.target.value
		} else {
			return null
		}
	}

	const handleSubmitNewAnimal = (
		e: React.FormEvent<HTMLFormElement>,
		category: Category
	) => {
		e.preventDefault()

		if (animalInput.current && fruitInput.current) {
			const animalInputValue = animalInput.current.value
			const fruitInputValue = fruitInput.current.value

			if (category === 'animals' && animalInputValue.trim() === '') return null
			if (category === 'fruits' && fruitInputValue.trim() === '') return null

			const value = category === 'animals' ? animalInputValue : fruitInputValue

			setData((prev) => ({
				...prev,
				[category]: [...prev[category], { name: value }],
			}))

			animalInput.current.value = ''
			fruitInput.current.value = ''
		}
	}

	return (
		<>
			<form onSubmit={(e) => handleSubmitNewAnimal(e, Category.animals)}>
				<label htmlFor="addAnimal">Add an another animal:</label>
				<br />
				<input
					id="addAnimal"
					onChange={handleChangeAddAnimal}
					ref={animalInput}
				/>
				<button type="submit">add</button>
			</form>
			<br />
			<br />
			<form onSubmit={(e) => handleSubmitNewAnimal(e, Category.fruits)}>
				<label htmlFor="addFruit">Add an another fruit:</label>
				<br />
				<input id="addFruit" onChange={handleChangeAddFruit} ref={fruitInput} />
				<button type="submit">add</button>
			</form>
			<br />
			<br />
			<label htmlFor="animal">Choose Your Favorite Animal:</label>
			<br />
			<select id="animal" value={animalSelection} onChange={handleSelectAnimal}>
				<option value={''}>-</option>
				{data?.animals?.map((animal, i) => (
					<option key={i} value={animal.name}>
						{animal.name}
					</option>
				))}
			</select>
			<br />
			<br />
			<label htmlFor="animal">Choose Your Favorite Fruit:</label>
			<br />
			<select id="fruit" value={fruitSelection} onChange={handleSelectFruit}>
				<option value={''}>-</option>
				{data?.fruits?.map((fruit, i) => (
					<option key={i} value={fruit.name}>
						{fruit.name}
					</option>
				))}
			</select>
			<br />
			<br />
			{animalSelection && fruitSelection && (
				<>
					<label htmlFor="favorite">
						Now You Can Choose Your Favorite Animal Or Fruit
					</label>
					<br />
					<select
						id="favorite"
						value={favoriteAnimalAndFruit}
						onChange={handleSelectFavoriteAnimalOrFruit}
					>
						<option value={animalSelection}>{animalSelection}</option>
						<option value={fruitSelection}>{fruitSelection}</option>
					</select>
				</>
			)}
		</>
	)
}

export default App
