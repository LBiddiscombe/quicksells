import React from 'react'
import Logo from './Logo'
import ImportFile from './ImportFile'
import LandingStep from './LandingStep'

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing">
        <p className="title is-2 has-text-centered">Let's get started...</p>
        <div className="landingsteps">
          <LandingStep zindex="3" arrow={false} leftBorder={true}>
            <ImportFile iconsize="fa-5x" fileImport={this.props.fileImport} />
            <p className="title is-4 has-text-light">Import</p>
          </LandingStep>
          <LandingStep zindex="2" arrow={false}>
            <i className="landingicon fas fa-5x fa-arrows-alt" />
            <p className="title is-4 has-text-light">Manage</p>
          </LandingStep>
          <LandingStep zindex="1" arrow={false}>
            <i className="landingicon far fa-5x fa-save" />
            <p className="title is-4 has-text-light">Save</p>
          </LandingStep>
        </div>
      </div>
    )
  }
}

export default LandingPage
