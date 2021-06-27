import React from "react";
import { STORY } from "../backend/interface";
import Card from "../components/card"
import Loader from "../components/loading"
import "./screen.scss"

const defaultState = { view: "" }
class List extends React.Component<{ loading: boolean, stories: any[] }> {

    constructor(props: any) {
        super(props)
        this.setState({ ...defaultState })
    }

    render() {
        let main: any
        let group: any = []
        return <div className="list">
            {!this.props.loading &&
                <div className="cards">
                    {this.props.stories && this.props.stories.map((story: STORY, id) => {
                        if (id > 4) {
                            return <Card key={id} idx={id} story={story} />
                        }

                        if (id == 0) {
                            main = <Card key={id} idx={id} story={story} />
                            return
                        }

                        if (id >= 1 || id < 4) {
                            group.push(<Card key={id} idx={id} story={story} />)

                            if (group.length == 4) {
                                return <div key="first" className="first">{main} <div className="group">{group}</div></div>
                            }
                            return
                        }
                    })}
                </div>
            }
            {this.props.loading && <Loader detail="Loading Stories" />}
        </div>
    }

    componentDidMount() {

    }
}

export default List