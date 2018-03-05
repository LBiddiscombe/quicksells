import React from 'react'
import Logo from './Logo'
import LandingStep from './LandingStep'

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing">
        <p className="title is-2 has-text-light has-text-centered">Quicksell Builder</p>
        <p className="subtitle is-5 has-text-light has-text-centered">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempus sollicitudin
          orci a rhoncus. Suspendisse feugiat leo ante, vitae porttitor massa venenatis sit amet.
          Donec maximus varius rhoncus. Mauris ultricies nulla vitae nisi auctor fermentum.
        </p>

        <div className="landingsteps">
          <LandingStep zindex="3" arrow={true} leftBorder={true}>
            <i className="fas fa-5x fa-upload" />
            <p className="title is-4 has-text-light">Import</p>
          </LandingStep>
          <LandingStep zindex="2" arrow={true}>
            <i className="fas fa-5x fa-arrows-alt" />
            <p className="title is-4 has-text-light">Manage</p>
          </LandingStep>
          <LandingStep zindex="1" arrow={false}>
            <i className="far fa-5x fa-save" />
            <p className="title is-4 has-text-light">Save</p>
          </LandingStep>
        </div>
      </div>
    )
  }
}

export default LandingPage
