class Ui {
  static initialize () {
    this.elm = document.getElementById('latency')
  }

  static updatePing (latency) {
    this.elm.innerText = latency
  }
}

export default Ui
