import React from 'react'
import Header from './components/Header'
import Filter from './components/Filter'
import Aside from './components/Aside'
import Main from './components/Main'
//import ImportFromCSV from './services/ImportFromCSV'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      groups: [],
      pages: [],
      products: [],
      layout: {},
      filter: ''
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleLayoutChange = this.handleLayoutChange.bind(this)
    this.handleFileImport = this.handleFileImport.bind(this)
  }

  handleLayoutChange(source, target) {
    const newLayout = this.state.layout

    const layoutPage = newLayout.groups
      .find(g => g.id === source.group)
      .pages.find(p => p.id === source.page).products

    const temp = source
    const layoutPageSource = layoutPage[source.seq - 1]
    const layoutPageTarget = layoutPage[target.seq - 1]
    layoutPageSource.seq = layoutPageTarget.seq
    layoutPageSource.top = layoutPageTarget.top
    layoutPageSource.left = layoutPageTarget.left
    layoutPageTarget.seq = temp.seq
    layoutPageTarget.top = temp.top
    layoutPageTarget.left = temp.left

    this.setState({
      layout: newLayout
    })
  }

  handleFileImport(result) {
    this.setState({
      groups: result.groups,
      pages: result.pages,
      products: result.products,
      layout: result.layout
    })
  }

  handleFilterChange(e) {
    this.setState({ filter: e.target.value })
  }

  componentDidMount() {
    /*
    ImportFromCSV().then(result => {
      this.setState({
        groups: result.groups,
        pages: result.pages,
        products: result.products,
        layout: result.layout
      })
    })
    */
  }

  render() {
    const fileLoaded = this.state.products.length > 0

    return (
      <div className="app">
        <Header />
        {fileLoaded > 0 && <Filter handleFilterChange={this.handleFilterChange} />}
        {fileLoaded > 0 && <Aside products={this.state.products} filter={this.state.filter} />}
        <Main
          groups={this.state.groups}
          pages={this.state.pages}
          layout={this.state.layout}
          changeLayout={this.handleLayoutChange}
          fileImport={this.handleFileImport}
        />
      </div>
    )
  }
}

export default App
