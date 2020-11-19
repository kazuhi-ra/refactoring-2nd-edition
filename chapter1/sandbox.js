import { createStatementData } from './createStatementData.js'

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

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`

// 引数dataで渡されたデータを加工するだけの関数にしたい
function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n` //

  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${
      perf.audience
    } seats)\n`
  }

  result += `Amount owed is  ${usd(data.totalAmount)}\n`
  result += `You earned ${data.totalVolumeCredits} credits\n`

  return result

  function usd(aNumber) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(aNumber / 100)
  }
}

// console.log(renderPlainText(createStatementData(invoiceExample, playsExample)))
console.log(renderHtml(createStatementData(invoiceExample, playsExample)))
