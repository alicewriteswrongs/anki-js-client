import React, { Component } from "react"
import onClickOutside from "react-onclickoutside"

class Dialog extends Component {
  handleClickOutside = evt => {
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
