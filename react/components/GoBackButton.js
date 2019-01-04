import React, { Component, Fragment } from 'react'
import { ButtonWithIcon, IconArrowBack } from 'vtex.styleguide'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import { translate } from '../utils/translate'

const arrow = <IconArrowBack size={10} />

class GoBackButton extends Component {
  static propTypes = {
    /** Function to change de active tab */
    onStateChange: PropTypes.func,
    /** Intl object*/
    intl: intlShape,
  }

  render() {
    const { onStateChange, intl } = this.props
    return (
      <Fragment>
        <div className="vtex-login__back-butto2n">
          <ButtonWithIcon
            icon={arrow}
            iconPosition="left"
            variation="tertiary"
            size="small"
            onClick={onStateChange}
          >
            <span className="t-small ml2">
              {translate('login.goBack', intl)}
            </span>
          </ButtonWithIcon>
        </div>
      </Fragment>

    )

  }
}
export default injectIntl(GoBackButton)