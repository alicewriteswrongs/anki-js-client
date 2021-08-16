import React, { Component, SyntheticEvent } from "react"
import onClickOutside from "react-onclickoutside"

interface Props {
  hide: () => void
}

class Dialog extends Component<Props> {
  handleClickOutside = (evt: SyntheticEvent<HTMLElement>): void => {
    const { hide } = this.props
    hide()
  }

  render() {
    const { children } = this.props

    return (
      <dialog open className="item-dialog">
        {children}
      </dialog>
    )
  }
}

export default onClickOutside(Dialog)
