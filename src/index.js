import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()

setItemGridHeight()

window.onresize = function(event) {
  setItemGridHeight()
}

function setItemGridHeight() {
  const items = document.getElementById('items')
  items.style.height = items.clientWidth * 4 / 7 + 'px'
}
