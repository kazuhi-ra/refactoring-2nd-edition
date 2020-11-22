export class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance
    this.play = aPlay
  }

  get amount() {
    let result = 0

    switch (this.play.type) {
      case 'tragedy':
        throw '想定外の呼び出し'
      case 'comedy':
        throw '想定外の呼び出し'
      default:
        throw new Error(`unknown type: ${this.play.type}`)
    }

    return result
  }

  get volumeCredits() {
    let result = 0

    result += Math.max(this.performance.audience - 30, 0)
    if (this.play.type === 'comedy')
      result += Math.floor(this.performance.audience / 5)

    return result
  }
}
