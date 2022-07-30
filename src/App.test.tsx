import React from 'react'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import App from './App'

test('third select dropdown is not visible', () => {
	render(<App />)
	const thirdSelect = screen.queryByText(
		/Now You Can Choose Your Favorite Animal Or Fruit/i
	)
	expect(thirdSelect).toBeNull()
})

describe('input element works properly', () => {
	it('adding blank input should not work', () => {
		render(<App />)
		const inputElement = screen.getByTestId('animalInput')
		const addBtn = screen.getByTestId('addAnimalBtn')
		const selectOptionsLength = screen.getAllByTestId('animalOption').length
		user.type(inputElement, '  ')
		user.click(addBtn)
		const selectOptionsAfterAdding = screen.getAllByTestId('animalOption')
		expect(selectOptionsAfterAdding.length).toBe(selectOptionsLength)
	})

	it('adding input shows as select option', () => {
		render(<App />)
		const inputElement = screen.getByTestId('animalInput')
		const addBtn = screen.getByTestId('addAnimalBtn')
		const selectOptionsLength = screen.getAllByTestId('animalOption').length
		user.type(inputElement, 'monkey')
		user.click(addBtn)
		const selectOptionsAfterAdding = screen.getAllByTestId('animalOption')
		const monkeyOption = screen.getByText('monkey')
		expect(selectOptionsAfterAdding.length).toBe(selectOptionsLength + 1)
		expect(selectOptionsAfterAdding.includes(monkeyOption)).toBe(true)
	})
})

test('choosing options for all select dropdowns shows third dropdown', () => {
	render(<App />)
	const animalInputElement = screen.getByTestId('animalInput')
	const fruitInputElement = screen.getByTestId('fruitInput')
	const animalAddBtn = screen.getByTestId('addAnimalBtn')
	const fruitAddBtn = screen.getByTestId('addFruitBtn')
	user.type(animalInputElement, 'monkey')
	user.click(animalAddBtn)
	user.type(fruitInputElement, 'melona')
	user.click(fruitAddBtn)
	const animalSelection = screen.getByTestId('animalSelection')
	const fruitSelection = screen.getByTestId('fruitSelection')
	user.selectOptions(animalSelection, 'monkey')
	user.selectOptions(fruitSelection, 'melona')
	const thirdSelect = screen.getByText(
		/Now You Can Choose Your Favorite Animal Or Fruit/i
	)
	expect(thirdSelect).toBeTruthy()
})
