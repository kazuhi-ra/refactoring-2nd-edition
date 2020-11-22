import { PerformanceCalculator } from './PerformanceCalculator.js'
// データを処理するだけの関数にしたい
export function createStatementData(invoice, plays) {
  const result = {}
  result.customer = invoice.customer
  result.performances = invoice.performances.map(enrichPerformance)
  result.totalVolumeCredits = totalVolumeCredits(result)
  result.totalAmount = totalAmount(result)

  return result

  function enrichPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    )
    const result = Object.assign({}, aPerformance)
    result.play = calculator.play
    result.amount = calculator.amount
    result.volumeCredits = calculator.volumeCredits

    return result
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
  }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0)
  }
}

function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance, aPlay)
    case 'comedy':
      return new ComedyCalculator(aPerformance, aPlay)
    default:
      throw new Error(`未知の演劇の種類: ${aPlay.type}`)
  }
}

class TragedyCalculator extends PerformanceCalculator {}

class ComedyCalculator extends PerformanceCalculator {}
