import React from "react";
import { moment } from "../util";
import { STORY } from "../backend/interface";
import Loader from "../components/loading"
import "./screen.scss"

class Detail extends React.Component<{ global?: any, story: STORY }> {
    state = { loading: true }
    render() {
        return <div className="detail">
            {this.state.loading && <Loader detail="Loading" />}

            {!this.state.loading && <div className="content-wrapper">
                <div className="meta">
                    {/* <span className="provider">{this.props.story.provider.name}</span>  */}
                    <span className="date">{moment(this.props.story.datePublished).fromNow()}</span>
                </div>
                <h1>{this.props.story.title}</h1>
                <h3>{this.props.story.description}</h3>
                <article>{this.props.story.body}</article>
            </div>}
            {!this.state.loading && <div className="image-wrapper" style={{ backgroundImage: this.props.story.image.thumbnail }}>
                <img alt="" src={this.props.story.image.url} />
            </div>}
        </div>
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false })
        }, 500);
    }
}

export default Detail