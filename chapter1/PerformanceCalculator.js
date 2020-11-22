export class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance
    this.play = aPlay
  }

  get amount() {
    throw new Error('サブクラスの責務です') // R.I.P.
  }

  get volumeCredits() {
    let result = 0

    result += Math.max(this.performance.audience - 30, 0)
    if (this.play.type === 'comedy')
      result += Math.floor(this.performance.audience / 5)

    return result
  }
}
