import assert from 'assert'

import { createStatementData } from '../chapter1/createStatementData.js'
import { renderPlainText } from '../chapter1/statement.js'

const invoiceExample = {
  customer: 'BigCo',
  performances: [
    { playID: 'hamlet', audience: 55 },
    { playID: 'as-like', audience: 35 },
    { playID: 'othello', audience: 40 },
  ],
}

const playsExample = {
  hamlet: { name: 'Hamlet', type: 'tragedy' },
  'as-like': { name: 'As You Like It', type: 'comedy' },
  othello: { name: 'Othello', type: 'tragedy' },
}

const output = `Statement for BigCo
 Hamlet: $650.00 (55 seats)
 As You Like It: $580.00 (35 seats)
 Othello: $500.00 (40 seats)
Amount owed is  $1,730.00
You earned 47 credits\n`

try {
  assert.strictEqual(
    renderPlainText(createStatementData(invoiceExample, playsExample)),
    output
  )
  console.log('\x1b[32m', 'ok')
} catch (e) {
  console.log(e)
}
