import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { addPostAction,  addPostIdAction } from '../actions/posts.action'
import Moment from 'moment';
import '../components/SearchResultBox.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import SelectedFlightModal from './SelectedFlightModal';
import Swal from "sweetalert2";
import axios from 'axios';
import { BaseUrl } from '../constants/BaseUrl'
class SearchResults extends Component {

  constructor(props) {
    super(props);
    this.state = {
      requiredItem: 0,
      isOpen: false,
      isSelectModalOpen: true

    }
    this.ModalItem = this.ModalItem.bind(this);
  }

  componentDidMount() {
    this.props.addPostAction(0);
  }

  ModalItem = (index) => {
    localStorage.setItem('postId', index)
    let token = '';
    let url = '';
    let adminToken = localStorage.getItem('admin');
    let customerToken = localStorage.getItem('customer');
    let companyToken = localStorage.getItem('airlineCompany');

    if (adminToken !== null && adminToken !== '') {
      token = adminToken;
      url = '/api/AdministratorFacade/getAdministratorFirstName';
    }
    else if (customerToken !== null && customerToken !== '') {
      token = customerToken;
      url = '/api/CustomerFacade/getCustomerFirstName';
    }
    else if (companyToken !== null && companyToken !== '') {
      token = companyToken
      url = '/api/AirlineCompanyFacade/getAirlineCompanyName';
    }
    else {
      url = '/api/CustomerFacade/getCustomerFirstName';
    }

    const instance = axios.create({
      baseURL: BaseUrl.url, headers: { 'Authorization': 'Bearer ' + token }
    });

    instance.post(url)
      .then(res => {
        if (res.data !== '') {
          this.setState({ requiredItem: index });
          this.setState({ isOpen: true })

          this.props.addPostIdAction(this.state.requiredItem);
        }
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 401') {
          Swal.fire({
            icon: 'warning',
            title: "Oops..",
            text: "Please log-in to continue with your purchase!"
          });

        }
      })
  }

  render() {
    console.log("postsData: " + JSON.stringify(this.props.postsData))

    const { posts } = this.props.postsData

    const postList = posts.length ? (
      posts.map((post, index) => {
        Moment.locale('en');
        let dtd1 = post.f1.REAL_DEPARTURE_TIME;
        let dtl1 = post.f1.REAL_LANDING_TIME;
        let dtd2 = post.f2.REAL_DEPARTURE_TIME;
        let dtl2 = post.f2.REAL_LANDING_TIME;
        const now1 = Moment(dtd1);
        const expiration1 = Moment(dtl1);
        const diff1 = expiration1.diff(now1);
        const now2 = Moment(dtd2);
        const expiration2 = Moment(dtl2);
        const diff2 = expiration2.diff(now2);
      
        if (posts.length < 0) {
          this.setState({ isSelectModalOpen: false })
        }

        return (

          <div className="card container mt-2 mb-3 p-5" key={index}>
            <div className="card-body">
              <Container>
                <Row>
                  <Col sm={2}><img src={require(`../../public/images/${post.f1.AIRLINE_NAME}.jpg`)} alt="company" style={{ width: '100px' }} /></Col>
                  <Col sm={3}><h3>{post.f1.O_COUNTRY_NAME}</h3>
                    <h6> {Moment(dtd1).format('MMMM dddd Do YYYY, HH:mm:ss')}</h6></Col>
                  <Col sm={1}><i className='fas fa-plane' style={{ fontSize: 40, color: 'lightseagreen' }}></i></Col>
                  <Col sm={3}><h3>{post.f1.D_COUNTRY_NAME}</h3>
                    <h6>{Moment(dtl1).format('MMMM dddd Do YYYY, HH:mm:ss')}</h6> </Col>
                  <Col sm={2}><h6>Flight</h6><h6>duration: </h6>
                    <h5>{Moment(diff1).format('HH:mm')}</h5></Col>
                </Row>

                <Row style={{ marginTop: 25, marginBottom: 25 }}>
                  <Col md={10} xs={6}><hr style={{ color: 'black', height: 2, backgroundColor: 'black' }} /></Col>
                  {/* <Link to={'/posts/' + keyId}> */}
                  <Col md={2} xs={6}>  {this.state.isSelectModalOpen && <Button variant="warning" size="lg" onClick={() => this.ModalItem(index)}><i className="far fa-hand-point-left"></i>&nbsp;Select</Button>}</Col>
                  {/* </Link> */}
                </Row>

                <Row>
                  <Col sm={2}><img src={require(`../../public/images/${post.f2.AIRLINE_NAME}.jpg`)} alt="company" style={{ width: '100px' }} /></Col>
                  <Col sm={3}> <h3>{post.f2.O_COUNTRY_NAME}</h3>
                    <h6> {Moment(dtd2).format('MMMM dddd Do YYYY, HH:mm:ss')}</h6></Col>
                  <Col sm={1}><i className='fas fa-plane' style={{ fontSize: 45, color: 'lightseagreen' }}></i></Col>
                  <Col sm={3}><h3>{post.f2.D_COUNTRY_NAME}</h3>
                    <h6>{Moment(dtl2).format('MMMM dddd Do YYYY, HH:mm:ss')}</h6></Col>
                  <Col sm={2}><h6>Flight</h6><h6>duration: </h6>
                    <h5>{Moment(diff2).format('HH:mm')}</h5></Col>
                </Row>

              </Container>
            </div>
          </div>
        );

      })
    ) : (
        <div className="cardNoPosts">No posts to show</div>
      )

    const requiredItem = this.state.requiredItem;

    return (
      <div>
        <div className="container">
          {postList}
        </div>
        <SelectedFlightModal
          show={this.state.isOpen}
          onHide={() => this.setState({ isOpen: false })}
          indexofpost={requiredItem}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  console.log("mapStateToProps: state= " + JSON.stringify(state.posts));

  return {
    postsData: state.postsData

  }
}

function mapDispatchToProps(dispatch) {
  return  bindActionCreators({addPostAction, addPostIdAction}, dispatch)
    // addPostAction: bindActionCreators(addPostAction, dispatch),
    // addPostIdAction: bindActionCreators(addPostIdAction, dispatch),
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);