import React from 'react'

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing">
        <h1 className="title is-4 has-text-light">Very Temporary Landing Page</h1>
        <ol>
          <li>
            Upload quicksell file <i className="fas fa-upload" />
          </li>
          <li>Manage layout and items</li>
          <li>Save quicksell file</li>
        </ol>
      </div>
    )
  }
}

export default LandingPage
