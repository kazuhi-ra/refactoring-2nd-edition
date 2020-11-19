import assert from 'assert'

import { createStatementData } from '../chapter1/createStatementData.js'
import { renderPlainText } from '../chapter1/statement.js'
import { renderHtml } from '../chapter1/renderHtml.js'

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
You earned 47 credits
`

const outputHtml = `<h1>Statement for BigCo</h1>
<table>
<tr><th>play</th><th>seats</th><th>cost</th></tr> <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>
 <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>
 <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>
</table>
<p>Amount owed is <em>$1,730.00</em></p>
<p>You earned <em>47</em> credits</p>
`

try {
  assert.strictEqual(
    renderPlainText(createStatementData(invoiceExample, playsExample)),
    output
  )
  console.log('\x1b[32m', 'text-ok')
} catch (e) {
  console.log(e)
}

try {
  assert.strictEqual(
    renderHtml(createStatementData(invoiceExample, playsExample)),
    outputHtml
  )
  console.log('\x1b[32m', 'html-ok')
} catch (e) {
  console.log(e)
}
