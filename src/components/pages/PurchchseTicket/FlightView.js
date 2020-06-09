import React, { Component } from "react";
import { Card, ListGroup, Row, Col } from 'react-bootstrap'
import './FlightView.css'
import Moment from 'moment';
import { connect } from 'react-redux';
import { addPostAction, addPostIdAction } from '../../../actions/posts.action'
import { bindActionCreators } from 'redux'

class FlightView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            f1: {},
            f2: {},
            posts: null,
            postId: 0
        }
        let postsJson = localStorage.getItem('posts');
        let posts = JSON.parse(postsJson);
        this.state.posts = posts;

        let postIdJson = localStorage.getItem('postId');
        let postId = JSON.parse(postIdJson);
        this.state.postId = postId;

        if (this.props.postsData.posts.length === 0 && posts !== null) {
            this.props.addPostAction(this.state.posts);
            this.props.addPostIdAction(this.state.postId);
        }
    }
    componentDidMount() {

        setTimeout(function () { //Start the timer
            this.getFromRedux();  //After 100 miliseconds execute func
        }.bind(this), 100)
    }
    getFromRedux() {
        if (this.props.postsData.posts.length > 0) {
            this.setState({ f1: this.props.postsData.posts[this.props.postId.postId].f1 })
            this.setState({ f2: this.props.postsData.posts[this.props.postId.postId].f2 })
        }
    }
    render() {
        // const { dispatch, ...rest } = this.props
        Moment.locale('en');
        let dtd1 = this.state.f1.REAL_DEPARTURE_TIME;
        console.log("dtd1: " + dtd1)
        let dtl1 = this.state.f1.REAL_LANDING_TIME;
        let dtd2 = this.state.f2.REAL_DEPARTURE_TIME;
        let dtl2 = this.state.f2.REAL_LANDING_TIME;
        // const now1 = Moment(dtd1);
        // const expiration1 = Moment(dtl1);
        // const diff1 = expiration1.diff(now1);
        // const now2 = Moment(dtd2);
        // const expiration2 = Moment(dtl2);
        // const diff2 = expiration2.diff(now2);
        return (
            <div className="marginTop">

                <Card className="cardStyle">
                    <Card.Header className="cardHeader">Reservation Summary</Card.Header>
                    <Card.Header>Flight&nbsp;&nbsp;<i className="fas fa-plane"></i></Card.Header>

                    <ListGroup className="cardBodyStyle">

                        <Row>
                            <Col sm><p>Outbound flight:&nbsp;&nbsp;{Moment(dtd1).format('ddd. DD/MM')}</p></Col>
                        </Row>

                        <Row>
                            <Col xs={3} sm={3}><img src={process.env.PUBLIC_URL + `/images/${this.state.f1.AIRLINE_NAME}.jpg`} alt="company" style={{ width: '100px' }} /></Col>
                            <Col xs={3} sm={3}><p>{this.state.f1.O_COUNTRY_NAME}</p><p style={{ marginTop: -20 }}>{Moment(dtd1).format('HH:mm')}</p></Col>
                            <Col xs={3} sm={3}><hr></hr></Col>
                            <Col xs={3} sm={3}><p>{this.state.f1.D_COUNTRY_NAME}</p><p style={{ marginTop: -20 }}>{Moment(dtl1).format('HH:mm')}</p></Col>
                        </Row>

                        <Row>
                            <Col sm><hr></hr></Col>
                        </Row>

                        <Row>
                            <Col sm><p>Return flight:&nbsp;&nbsp;{Moment(dtd2).format('ddd. DD/MM')}</p></Col>
                        </Row>

                        <Row>
                            <Col xs={3} sm={3}><img src={process.env.PUBLIC_URL + `/images/${this.state.f2.AIRLINE_NAME}.jpg`} alt="company" style={{ width: '100px' }} /></Col>
                            <Col xs={3} sm={3}><p>{this.state.f2.O_COUNTRY_NAME}</p><p style={{ marginTop: -20 }}>{Moment(dtd2).format('HH:mm')}</p></Col>
                            <Col xs={3} sm={3}><hr></hr></Col>
                            <Col xs={3} sm={3}><p>{this.state.f2.D_COUNTRY_NAME}</p><p style={{ marginTop: -20 }}>{Moment(dtl2).format('HH:mm')}</p></Col>
                        </Row>

                    </ListGroup>
                </Card>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log("mapStateToProps  state FlightView: " + JSON.stringify(state))
    return {
        postsData: state.postsData,
        postId: state.postId
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addPostAction, addPostIdAction }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(FlightView);