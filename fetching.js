async function getHexNumber(number, onSuccess) {
	let url = 'https://api.math.tools/numbers/base/hex' + '?number=' + number
	const response = await fetch(url)
	const data = await response.json()
	console.log('getHexNumber: data is ', data)
	// { copyright, success, contents: { number, base, answer} }
	const answer = data.contents.answer
	onSuccess(answer)
}

async function getCountryData() {
	const url = 'https://forverkliga.se/JavaScript/api/simple.php?world'
	
	const response = await fetch(url)
	let text = await response.text()
	text = text.substring(0, text.length - 1)
	const data = JSON.parse(text)
	console.log('getCountryData data is: ', data)
	return data
}

export { getHexNumber, getCountryData }
