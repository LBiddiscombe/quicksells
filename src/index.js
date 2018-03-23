import React from 'react'
import ReactDOM from 'react-dom'
import './styles/reset.css'
import './styles/index.css'
import App from './components/App/App'
import registerServiceWorker from './registerServiceWorker'
import { polyfill } from 'mobile-drag-drop'
import 'react-virtualized/styles.css'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()

polyfill()
