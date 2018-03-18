import React from 'react'
import Header from '../Header'
import Filter from '../Filter'
import Aside from '../Aside'
import Main from '../Main'
import LandingPage from '../LandingPage'
import DragDrop from '../Shared/DragDrop'
import Modal from '../Shared/Modal'
import { ToastContainer } from 'react-toastify'
import * as app from './App.logic'

const DraggableMain = DragDrop(Main)

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      groups: [],
      pages: [],
      products: [],
      filter: '',
      hasUnexportedChanges: false,
      isModalOpen: false
    }
    this.handleFilterChange = app.handleFilterChange.bind(this)
    this.handleLayoutChange = app.handleLayoutChange.bind(this)
    this.handleFileImport = app.handleFileImport.bind(this)
    this.handleFileExport = app.handleFileExport.bind(this)
    this.handleFileClose = app.handleFileClose.bind(this)
    this.handleProductEdit = app.handleProductEdit.bind(this)
  }

  closeModal(response) {
    this.setState({
      isModalOpen: false,
      hasUnexportedChanges: !response
    })

    if (response) {
      this.handleFileClose(null, true)
    }
  }

  componentDidMount() {
    const localState = localStorage.getItem('state')
    if (localStorage) {
      this.setState(JSON.parse(localState))
    }
  }

  render() {
    const fileLoaded = this.state.products.length > 0

    return (
      <div className="app">
        <Header
          products={this.state.products}
          fullwidth={!fileLoaded}
          handleFileClose={this.handleFileClose}
        />
        {fileLoaded && <Filter handleFilterChange={this.handleFilterChange} />}
        {fileLoaded && (
          <Aside
            products={this.state.products}
            filter={this.state.filter}
            handleProductEdit={this.handleProductEdit}
          />
        )}
        {!fileLoaded && <LandingPage fileImport={this.handleFileImport} />}
        {fileLoaded && (
          <DraggableMain
            groups={this.state.groups}
            pages={this.state.pages}
            products={this.state.products}
            changeLayout={this.handleLayoutChange}
            handleFileExport={this.handleFileExport}
            draggable={false}
            droptarget={true}
          />
        )}
        <ToastContainer />
        <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <p className="title is-4 has-text-centered">Unsaved Changes</p>
          <p className="modalmessage">
            You have unexported chnages, do you want to close without exporting?
          </p>
          <p className="has-text-centered">
            <button className="green" onClick={() => this.closeModal(true)}>
              Yes
            </button>
            <button className="red" onClick={() => this.closeModal(false)}>
              No
            </button>
          </p>
        </Modal>
      </div>
    )
  }
}

export default App
