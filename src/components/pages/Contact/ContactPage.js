import React, { Component } from "react";
import { Link } from 'react-router-dom';

class ContactPage extends Component {

  render() {
    return (
      <section className="my-5 py-5" >
        <div className="container" style={{ marginTop: 110 }}>
          <div className="well well-sm">
            <h3>
              <strong>Our Location</strong>
            </h3>
          </div>

          <div className="row">
            <div className="col-md-7">
              <iframe title="frame"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26919.1402456562!2d34.94345568670439!3d32.50230143132708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d0c4c2bca8fb7%3A0x3edf7e9243cf880a!2z15DXldeoINei16fXmdeR15A!5e0!3m2!1siw!2sil!4v1588803286269!5m2!1siw!2sil"
                style={{
                  border: '0',
                  width: '100%',
                  height: '315px',
                  frameborder: '0'
                }}
                allowFullscreen
              />
            </div>
            <div className="col-md-5">
              <h4>
                <strong>Contact Us</strong>
              </h4>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone"
                  />
                </div>
                <textarea
                  className="form-control"
                  cols="30"
                  rows="3"
                  placeholder="Message"
                />
                <Link className="btn btn-outline-primary text-uppercase mt-1">
                  <i className="fa fa-paper-plane-o" aria-hidden="true" />
                  <i className="fab fa-telegram-plane" />
                  &nbsp;Send
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default ContactPage;






