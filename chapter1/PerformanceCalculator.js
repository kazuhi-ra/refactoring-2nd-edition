export class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance
    this.play = aPlay
  }

  get amount() {
    throw new Error('サブクラスの責務です') // R.I.P.
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0)
  }
}
