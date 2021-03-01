import IatRecorder from "/assets/js/web/xfvoice/listen.js"

const recorder = new IatRecorder()

document.getElementById('getTalk').addEventListener('click', getTalk);

function getTalk() {
    //debugger
    //connectWebSocket()
    recorder.start()
  }