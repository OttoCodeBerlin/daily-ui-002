import React from 'react'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ccn: '',
      name: '',
      valid: '',
      cvv: '',
      issuer: '',
    }

    this.handleCCNChange = this.handleCCNChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleValidChange = this.handleValidChange.bind(this)
    this.handleCVVChange = this.handleCVVChange.bind(this)
    this.addSlash = this.addSlash.bind(this)
  }

  addSlash(str) {
    return str
  }

  handleCCNChange(e) {
    let ccn = e.target.value
    ccn = ccn.replace(/[^0-9]/g, '')
    let typeCheck = ccn.substring(0, 2)
    let cType = ''
    let block1 = ''
    let block2 = ''
    let block3 = ''
    let block4 = ''
    let formatted = ''

    if (typeCheck.length === 2) {
      typeCheck = parseInt(typeCheck)
      if (typeCheck >= 40 && typeCheck <= 49) {
        cType = 'Visa'
      } else if (typeCheck >= 51 && typeCheck <= 55) {
        cType = 'Master Card'
      } else if ((typeCheck >= 60 && typeCheck <= 62) || typeCheck === 64 || typeCheck === 65) {
        cType = 'Discover'
      } else if (typeCheck === 34 || typeCheck === 37) {
        cType = 'American Express'
      } else {
        cType = 'Invalid'
      }
    }

    // all support card types have a 4 digit firt block
    block1 = ccn.substring(0, 4)
    if (block1.length === 4) {
      block1 = block1 + ' '
    }

    if (cType === 'Visa' || cType === 'Master Card' || cType === 'Discover') {
      // for 4X4 cards
      block2 = ccn.substring(4, 8)
      if (block2.length === 4) {
        block2 = block2 + ' '
      }
      block3 = ccn.substring(8, 12)
      if (block3.length === 4) {
        block3 = block3 + ' '
      }
      block4 = ccn.substring(12, 16)
    } else if (cType === 'American Express') {
      // for Amex cards
      block2 = ccn.substring(4, 10)
      if (block2.length === 6) {
        block2 = block2 + ' '
      }
      block3 = ccn.substring(10, 15)
      block4 = ''
    } else if (cType === 'Invalid') {
      // for Amex cards
      block1 = typeCheck
      block2 = ''
      block3 = ''
      block4 = ''
      //alert('Invalid Card Number')
    }

    formatted = block1 + block2 + block3 + block4

    this.setState({ ccn: formatted, issuer: cType })
  }

  handleNameChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleValidChange(e) {
    let returnStr = e.target.value
    if (returnStr.length>4) returnStr=returnStr.substr(0,5)
    if (returnStr.length === 2)  returnStr = returnStr+'/'
    
    this.setState({ valid: returnStr })
  }

  handleCVVChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className="App">
        <div className="container-center">
          <form>
            <div className="credit-card">
              <label className="labels ccn-label">
                Credit Card Number {'  '} <strong>{this.state.issuer}</strong>
                <br />
                <input
                  className="inputs ccn-input"
                  name="ccn"
                  type="text"
                  onChange={this.handleCCNChange}
                  value={this.state.ccn}
                />
              </label>
              <label className="labels name-label">
                Cardholder Name
                <br />
                <input
                  className="inputs name-input"
                  name="name"
                  type="text"
                  onChange={this.handleNameChange}
                  value={this.state.name}
                />
              </label>
              <label className="labels valid-label">
                Valid Through
                <br />
                <input
                  className="inputs valid-input"
                  name="valid"
                  type="text"
                  onChange={this.handleValidChange}
                  value={this.state.valid}
                />
              </label>
            </div>
            <div className="credit-card">
              <label className="labels cvv-label">
                CVV
                <br />
                <input
                  className="inputs cvv-input"
                  name="cvv"
                  type="text"
                  placeholder=""
                  onChange={this.handleCVVChange}
                  value={this.state.cvv.substring(0, 3)}
                />
              </label>
            </div>

            <input type="submit" value="Send" className="send-button" />
          </form>
        </div>
      </div>
    )
  }
}

export default App
