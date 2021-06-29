import React from "react";
import { STORY } from "../backend/interface";
import { moment } from "../util"

import "./component.scss"

class Card extends React.Component<{ story: STORY, idx?: number, bookmark?: boolean, onClick: Function }> {
    render() {
        return <div onClick={this.handleClick.bind(this)} className={`card ${this.props.bookmark ? "small" : this.props.idx === 0 ? "large" : this.props.idx! <= 4 ? "mini" : "small"}`} >
            <img alt="" src={this.props.story.image.url} style={{ backgroundImage: `url(${this.props.story.image.thumbnail})` }} />
            <div className="content">
                <div className="header">{this.props.story.title}</div>
                <div className="meta">
                    <span className="provider">{this.props.story.provider.name}</span> <span className="date">{moment(this.props.story.datePublished).fromNow()}</span>
                </div>
                {this.props.story.title.length < 90 && <div className="description">{this.props.story.description.substring(0, 80)}...</div>}
            </div>
        </div>
    }

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props.story, this.props.idx)
        }
    }
}

export default Card