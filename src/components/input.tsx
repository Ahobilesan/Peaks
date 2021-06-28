import React, { MouseEventHandler } from "react";
import search from "../assets/search-icon@2x.svg"


class Input extends React.Component<{ type?: string, value?: string, placeholder?: string, onChange?: Function, onSearch?: MouseEventHandler }> {
    input: any = React.createRef()

    render() {
        return <div className="input">
            <input ref={this.input} type={this.props.type} value={this.props.value} placeholder={this.props.placeholder} onInput={this.handleChange.bind(this)} />
            {this.props.type === "search" && <div className="search-icon" onClick={this.focus.bind(this)}><img src={search} alt="" /></div>}
        </div>
    }

    focus() {
        console.log(this.input)
        if (this.input && this.input.current) {
            this.input.current.focus()
        }
    }

    handleChange() {

        if (this.props.onChange) {
            this.props.onChange()
        }

    }
}

export default Input