import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { polyfill } from 'mobile-drag-drop'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()

polyfill()
setItemGridHeight()

window.onresize = function() {
  setItemGridHeight()
}

function setItemGridHeight() {
  const items = document.getElementById('items')
  if (items !== null) items.style.height = items.clientWidth * 4 / 7 + 'px'
}
