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

function amountFor(performance, play) {
  let thisAmount = 0

  switch (play.type) {
    case 'tragedy':
      thisAmount = 40000
      if (performance.audience > 30) {
        thisAmount += 10000 + 500 * (performance.audience - 30)
      }
      break
    case 'comedy':
      thisAmount = 30000
      if (performance.audience > 20) {
        thisAmount += 10000 + 500 * (performance.audience - 20)
      }
      thisAmount += 300 * performance.audience
      break
    default:
      throw new Error(`unknown type: ${play.type}`)
  }

  return thisAmount
}

function statement(invoice = invoiceExample, plays = playsExample) {
  let totalAmount = 0
  let volumeCredits = 0
  let result = `Statement for ${invoice.customer}\n`

  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format

  for (let performance of invoice.performances) {
    const play = plays[performance.playID]
    let thisAmount = amountFor(performance, play)

    // ボリューム特典のポイントの加算
    volumeCredits += Math.max(performance.audience - 30, 0)
    // comedyのときは、10人につきさらにポイントを加算
    if ('comedy' === play.type)
      volumeCredits += Math.floor(performance.audience / 5)
    // 注文の内訳を出力
    result += `${play.name}: ${format(thisAmount / 100)} (${
      performance.audience
    } seats)\n`
    totalAmount += thisAmount
  }

  result += `Amount owed is ${format(totalAmount / 100)}\n`
  result += `You earned ${volumeCredits} credits\n`
  return result
}

console.log(statement())
