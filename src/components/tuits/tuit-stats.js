import React from "react";

export class TuitStats extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row mt-2">
                <div className="col">
                    <i className="far fa-message me-1"/>
                    {this.props.tuit.stats && this.props.tuit.stats.replies}
                </div>
                <div className="col">
                    <i className="far fa-retweet me-1"/>
                    {this.props.tuit.stats && this.props.tuit.stats.retuits}
                </div>
                <div className="col">
                    <i className="far fa-heart me-1"/>
                    {this.props.tuit.stats && this.props.tuit.stats.likes}
                </div>
                <div className="col">
                    <i className="far fa-inbox-out"/>
                </div>
            </div>
        );
    }
}
