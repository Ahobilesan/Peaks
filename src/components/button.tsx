import React, { MouseEventHandler } from "react";

const defaultState = {}
class Button extends React.Component<{ label?: HTMLElement, icon?: HTMLElement, primary?: boolean, secondary?: boolean, text: string, onClick?: MouseEventHandler }> {
    state = { ...defaultState }

    render() {
        let Label: any = this.props.label
        return <div className={`button${this.props.primary ? " primary" : ""}`}>
            {this.props.label && <Label />}
            <div onClick={this.props.onClick}>{this.props.text}</div>
        </div>
    }
}

export default Button