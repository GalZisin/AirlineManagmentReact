import React, { Component } from "react";
import axios from 'axios';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import Swal from "sweetalert2";
import './Inbox.css'
import { BaseUrl } from '../../../../constants/BaseUrl'

class Inbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companiesData: []
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        this.getAllcompaniesToApprove();
    }
    getAllcompaniesToApprove = () => {
        let token = localStorage.getItem('admin');
        axios.get(BaseUrl.url + '/api/AdministratorFacade/getAllcompaniesToApprove', { headers: { 'Authorization': 'Bearer ' + token } })
            .then((result) => {
                console.log("getAllcompaniesToApprove: " + JSON.stringify(result))
                if (result.status === 200) {
                    this.setState({
                        companiesData: result.data
                    });
                }
            }, (error) => {
                this.setState({ error });
            }
            )
    }

    DeclineOrApprove = (isApproved, userName, email, country) => {
        let swalTitle = '';
        let confirmButtonText = '';
        if (isApproved === '1') {
            swalTitle = 'Please confirm your action';
            confirmButtonText = 'Yes, add it!';
        }
        else if (isApproved === '0') {
            swalTitle = 'Are you sure?';
            confirmButtonText = 'Yes, delete it!';
        }
        Swal.fire({
            title: swalTitle,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: confirmButtonText
        }).then((result) => {
            if (result.value) {
                let token = localStorage.getItem('admin');
                const { companiesData } = this.state;
                let data = {
                    userName: userName,
                    country: country,
                    email: email,
                    isApproved: isApproved
                }
                console.log("data company: " + JSON.stringify(data))

                axios.post(BaseUrl.url + `/api/AdministratorFacade/acceptOrDeclineCompany`, data, { headers: { 'Authorization': 'Bearer ' + token } })
                    .then(res => {
                        if (res.status === 200) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: res.data,
                                showConfirmButton: true
                            });
                        }
                        this.setState({
                            companiesData: companiesData.filter(company => company.USER_NAME !== userName)
                        });
                    })
                    .catch(error => {

                        Swal.fire({
                            icon: 'warning',
                            title: "failed",
                            text: error
                        });

                    })
            }
        })
    }
    render() {
        const comopaniesList = this.state.companiesData.length ? (
            this.state.companiesData.map((company, index) => {
                return (
                    <div>
                        <Container style={{ paddingBottom: 20 }} key={index}>
                            <Card className="cardStyle1">
                                <Row>
                                    <Col md={10} xs={12} lg={9}>

                                        <Row className="pSize">
                                            <Col xs={12} md={6} lg={4}><label>Company name:&nbsp;&nbsp;<span>{company.AIRLINE_NAME}</span></label></Col>
                                            <Col xs={12} md={5} lg={3}><label>Username:&nbsp;&nbsp;<span>{company.USER_NAME}</span></label></Col>
                                            <Col xs={12} md={7} lg={5}><label>Password:&nbsp;&nbsp;<span>{company.PASSWORD}</span></label></Col>
                                            <Col xs={12} md={6} lg={4}><label>Email:&nbsp;&nbsp;<span>{company.EMAIL}</span></label></Col>
                                            <Col xs={12} md={6} lg={4}><label>Country name:&nbsp;&nbsp;<span>{company.COUNTRY_NAME}</span></label></Col>
                                        </Row>
                                    </Col>
                                    <Col md={{ span: 6, offset: 3 }} xs={7} lg={{ span: 3, offset: 0 }}>
                                        <Row>
                                            <Col lg={{ span: 4, offset: 0 }} md={{ span: 6, offset: 0 }} xs={{ span: 2, offset: 3 }} sm={{ span: 2, offset: 4 }}>
                                                <Button lg={{ span: 6, offset: 0 }} style={{ marginLeft: 0, marginRight: 5, marginTop: 12, marginBottom: 0 }} onClick={() => this.DeclineOrApprove('1', company.USER_NAME, company.EMAIL, company.COUNTRY_NAME)} variant="success">Accept</Button>
                                            </Col>
                                            <Col md={{ span: 4, offset: 0 }} xs={{ span: 2, offset: 3 }} sm={{ span: 2, offset: 4 }}>
                                                <Button style={{ marginLeft: 5, marginRight: 0, marginTop: 12, marginBottom: 0 }} variant="danger" onClick={() => this.DeclineOrApprove('0', company.USER_NAME, company.EMAIL, company.COUNTRY_NAME)}>Decline</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </Container>
                    </div>

                );

            })
        ) : (
                <div className="cardNoPosts">No emails to show</div>
            )
        return (
            <div className="content1">
                <Container>
                    <p style={{ fontWeight: 500, fontSize: 40, textAlign: 'center'}}>Incoming requests</p>
                    {comopaniesList}
                </Container>
            </div>
        );
    }
}
export default Inbox;