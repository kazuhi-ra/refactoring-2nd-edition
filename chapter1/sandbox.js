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

export function statement(invoice = invoiceExample, plays = playsExample) {
  let totalAmount = 0 // 合計金額
  let volumeCredits = 0 // ボリューム特典のポイント
  let result = `Statement for ${invoice.customer}\n` //

  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format

  for (let perf of invoice.performances) {
    let thisAmount = amountFor(perf, playFor(perf))

    volumeCredits += Math.max(perf.audience - 30, 0)
    if (playFor(perf).type === 'comedy') volumeCredits += Math.floor(perf.audience / 5)

    result += ` ${playFor(perf).name}: ${format(thisAmount / 100)} (${
      perf.audience
    } seats)\n`
    totalAmount += thisAmount
  }

  result += `Amount owed is  ${format(totalAmount / 100)}\n`
  result += `You earned ${volumeCredits} credits\n`
  return result

  function amountFor(aPerformance, play) {
    let result = 0

    switch (play.type) {
      case 'tragedy':
        result = 40000
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30)
        }
        break
      case 'comedy':
        result = 30000
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20)
        }
        result += 300 * aPerformance.audience
        break
      default:
        throw new Error(`unknown type: ${play.type}`)
    }

    return result
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }
}

console.log(statement())
