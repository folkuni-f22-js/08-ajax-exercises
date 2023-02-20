import { getHexNumber } from "./fetching.js"

// Alternativt namn: adviceApi
const exercise1 = {
	btn: document.querySelector('#btn-exercise1'),
	output: document.querySelector('#exercise1-output'),
	list: document.querySelector('#exercise1-advice-list')
}
const exercise2 = {
	input: document.querySelector('#input-exercise2'),
	btn: document.querySelector('#btn-exercise2')
}
const exercise4 = {
	input: document.querySelector('#exercise4-input'),
	btn: document.querySelector('#exercise4-btn'),
	output: document.querySelector('#exercise4-output')
}


exercise1.btn.addEventListener('click', async () => {
	const url = 'https://api.adviceslip.com/advice'

	const response = await fetch(url)
	const data = await response.json()  // inte samma som JSON

	// const advice = data.slip.advice
	// const id = data.slip.id
	const { advice, id } = data.slip
	// console.log('Data from advice API: ', data)
	// console.log('Advice: ', advice)

	exercise1.output.innerText = advice

	renderAdvice(id, advice)
})
// Funktion för att lägga till ett nytt tips till <ul> listan
function renderAdvice(id, advice) {
	let idSpan = document.createElement('span')
	let adviceSpan = document.createElement('span')
	idSpan.innerText = id
	adviceSpan.innerText = advice
	let li = document.createElement('li')
	li.append(idSpan)
	li.append(adviceSpan)
	exercise1.list.append(li)
}

/* 2 Förbättra webbappen så att man kan söka efter specifika tips.Du behöver lägga till ett input-fält så att användaren kan skriva in en söksträng.
Skicka request till: https://api.adviceslip.com/advice/search/{query} 
Läs i dokumentationen hur API:et förväntas svara: https://api.adviceslip.com/#endpoint-search 
*/

exercise2.btn.addEventListener('click', async () => {
	// plocka ut söksträngen från DOM -> lägga i en variabel
	// konstruera URL
	// ta reda på hur API:et svarar
	// skicka request - vänta på svar - gör om till JS-objekt
	// kom ihåg: felhantering
	// presentera datan för användaren

	const searchString = exercise2.input.value
	const url = `https://api.adviceslip.com/advice/search/` + searchString

	// Datan: an array of slip objects is returned inside a search object
	// Slip object: { id, date, advice }
	// Search object: { total_results, slips, query }

	try {
		const response = await fetch(url)
		const data = await response.json()
		console.log('Advice: Fick data = ', data)

		// Alternativ syntax: data.slips.forEach(({ id, advice }) => {
		data.slips.forEach(slip => {
			renderAdvice(slip.id, slip.advice)
		})

	} catch(error) {
		console.log('Advice: Ett fel inträffade: ', error.message)
	}
})


/*
4a Bygg en webbapp som kan räkna ut det hexadecimala värdet för ett vanligt tal. (Till exempel: 255 decimalt blir FF hexadecimalt.) Gör ett input-fält så att användaren kan skriva in ett tal. När man klickar på en button ska ett request skickas.
Skicka request till: https://api.math.tools/numbers/base/hex 
Talet som användaren skriver skickas med querystring. Lägg till: "?number=" + inputFromUser
Förväntat resultat: { copyright, success, contents: { number, base, answer} }

4b Lägg till att appen ska visa det binära talvärdet.
Skicka ett nytt request till: https://api.math.tools/numbers/base/binary

4c* Användaren ska kunna välja från (default: 10) och till (default: 16) vilken bas input ska omvandlas. Tips: från=10 och till=16 är samma som a-uppgiften.
Skicka request till: https://api.math.tools/numbers/base?from=x&to=y&number=z (byt ut x/y/z mot dina värden)
*/
exercise4.btn.addEventListener('click', () => {
	// hämta användarens tal ur DOM
	// konstruera URL
	// skicka request - vänta på svar - vänta på json
	// hantera eventuella fel
	// visa talet i output

	const userNumber = exercise4.input.value
	getHexNumber(userNumber, hex => {
		renderHexNumber(hex)
	})
})


function renderHexNumber(hex) {
	exercise4.output.innerText = `Talet blir: ${hex}.`
}