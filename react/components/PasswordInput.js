import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types'
import { Input } from 'vtex.styleguide'
import { injectIntl, intlShape } from 'react-intl'
import PasswordValidationItem from './PasswordValidationItem'
import { translate } from '../utils/translate'
import EyeSightEnable from '../images/EyeSightEnable'
import EyeSightDisable from '../images/EyeSightDisable'

class PasswordInput extends Component {
  state = {
    showVerification: false,
    showPassword: false,
  }

  handleEyeIcon = () => this.setState({ showPassword: !this.state.showPassword })

  handlePasswordChange = event => {
    const lowerCaseLetters = /[a-z]/g
    const upperCaseLetters = /[A-Z]/g
    const numbers = /[0-9]/g

    const value = event.target.value

    this.setState({
      containsLowerLetter: value.match(lowerCaseLetters),
      containsUpperLetter: value.match(upperCaseLetters),
      containsNumber: value.match(numbers),
      atLeastEightCharacteres: value.length >= 8,
    })

    this.props.onStateChange({ password: value })
  }

  render() {
    const {
      showVerification,
      containsLowerLetter,
      containsUpperLetter,
      containsNumber,
      atLeastEightCharacteres,
      showPassword,
    } = this.state

    const {
      intl,
      password,
    } = this.props

    return (
      <Fragment>
        <Input
          type={`${showPassword ? 'text' : 'password'}`}
          value={password}
          onChange={this.handlePasswordChange}
          placeholder={this.props.placeholder}
          onBlur={() => this.setState({ showVerification: false })}
          onFocus={() => this.setState({ showVerification: true })}
          suffixIcon={(
            <span className="pointer" onClick={this.handleEyeIcon}>
              {showPassword ? <EyeSightDisable /> : <EyeSightEnable />}
            </span>
          )}
        >
        </Input>
        {showVerification &&
          <div className="flex flex-row pt4">
            <div className="flex flex-column mr3">
              <PasswordValidationItem label={translate('login.password.uppercaseLetter', intl)} valid={containsUpperLetter} />
              <PasswordValidationItem label={translate('login.password.lowercaseLetter', intl)} valid={containsLowerLetter} />
            </div>
            <div className="flex flex-column">
              <PasswordValidationItem label={translate('login.password.number', intl)} valid={containsNumber} />
              <PasswordValidationItem label={translate('login.password.eightCharacteres', intl)} valid={atLeastEightCharacteres} />
            </div>
          </div>
        }
      </Fragment>
    )
  }
}

PasswordInput.propTypes = {
  /** Password set on state */
  password: PropTypes.string.isRequired,
  /** Placeholder to appear into the input */
  placeholder: PropTypes.string.isRequired,
  /** Function to change de active tab */
  onStateChange: PropTypes.func.isRequired,
  /** Intl object*/
  intl: intlShape,
}

export default injectIntl(PasswordInput)