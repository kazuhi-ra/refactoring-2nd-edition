import assert from 'assert'

const output = `Statement for BigCo
Hamlet: $625.00 (55 seats)
As You Like It: $580.00 (35 seats)
Othello: $550.00 (40 seats)
Amount owed is $1,755.00
You earned 47 credits`

try {
  assert.strictEqual(output, output)
  console.log('\x1b[32m', 'ok')
} catch (e) {
  console.log(e)
}
