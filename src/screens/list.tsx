import React from "react";
import { STORY } from "../backend/interface";
import Card from "../components/card"
import Loader from "../components/loading"
import "./screen.scss"

class List extends React.Component<{ global?: any, loading: boolean, stories: any[] }> {

    render() {
        let main: any
        let group: any = []

        return <div className="list">
            {!this.props.loading &&
                <div className="cards">
                    {this.props.stories && this.props.stories.map((story: STORY, id) => {
                        if (this.props.global.screen.width <= 1200) {
                            return <Card key={id} idx={id} story={story} />
                        } else {
                            if (id > 4) {
                                return <Card key={id} idx={id} story={story} />
                            }

                            if (id === 0) {
                                main = <Card key={id} idx={id} story={story} />
                                return undefined
                            }

                            if (id >= 1 || id < 4) {
                                group.push(<Card key={id} idx={id} story={story} />)

                                if (group.length === 4) {
                                    return <div key="first" className="first">{main} <div className="group">{group}</div></div>
                                }
                                return undefined
                            }
                        }
                        return undefined
                    })}
                </div>
            }
            {this.props.loading && <Loader detail="Loading Stories" />}
        </div>
    }
}

export default List