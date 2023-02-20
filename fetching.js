async function getHexNumber(number, onSuccess) {
	let url = 'https://api.math.tools/numbers/base/hex' + '?number=' + number
	const response = await fetch(url)
	const data = await response.json()
	console.log('getHexNumber: data is ', data)
	// { copyright, success, contents: { number, base, answer} }
	const answer = data.contents.answer
	onSuccess(answer)
}

export { getHexNumber }
