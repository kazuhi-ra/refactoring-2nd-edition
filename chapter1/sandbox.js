const invoiceExample = {
  customer: 'BigCo',
  performances: [
    { playID: 'hamlet', audience: 55 },
    { playID: 'as−like', audience: 35 },
    { playID: 'othello', audience: 40 },
  ],
}

const playsExample = {
  hamlet: { name: 'Hamlet', type: 'tragedy' },
  'as−like': { name: 'As You Like It', type: 'comedy' },
  othello: { name: 'Othello', type: 'tragedy' },
}

function statement(invoice = invoiceExample, plays = playsExample) {
  let totalAmount = 0
  let volumeCredits = 0
  let result = `Statement for ${invoice.customer}\n`

  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }

  function amountFor(aPerformance, play) {
    let result = 0

    switch (playFor(aPerformance).type) {
      case 'tragedy':
        result = 40000
        if (aPerformance.audience > 30) {
          result += 10000 + 500 * (aPerformance.audience - 30)
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
        throw new Error(`unknown type: ${playFor(aPerformance).type}`)
    }

    return result
  }

  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format

  for (let performance of invoice.performances) {
    // const play = playFor(performance)
    let thisAmount = amountFor(performance, playFor(performance))

    // ボリューム特典のポイントの加算
    volumeCredits += Math.max(performance.audience - 30, 0)
    // comedyのときは、10人につきさらにポイントを加算
    if ('comedy' === playFor(performance).type)
      volumeCredits += Math.floor(performance.audience / 5)
    // 注文の内訳を出力
    result += `${playFor(performance).name}: ${format(thisAmount / 100)} (${
      performance.audience
    } seats)\n`
    totalAmount += thisAmount
  }

  result += `Amount owed is ${format(totalAmount / 100)}\n`
  result += `You earned ${volumeCredits} credits\n`
  return result
}

console.log(statement())
