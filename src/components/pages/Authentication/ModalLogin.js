import React from 'react';
import Modal from 'react-bootstrap/Modal'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from "./login.component";
import SignUp from "./signup.component";

class ModalLogin extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			onclosemodal: this.props.onclosemodal,
			isSignUpOpen: false,
			isLoginOpen: true,
		};
		this.closemymodal = this.closemymodal.bind(this);
	}
	showBox = (islogin) => {
		if (islogin === 'signIn') {
			console.log("Enter islogin true");
			this.setState({ isSignUpOpen: false, isLoginOpen: true })
		}
		else {
			console.log("Enter islogin false");
			this.setState({ isSignUpOpen: true, isLoginOpen: false })
		}
	}
	closemymodal(close) {
		console.log("isclose: " + JSON.stringify(close))
		this.state.onclosemodal(close);
		// this.setState({ isClosed: true })
	}
	render() {
		const { onclosemodal, ...rest } = this.props
		return (
			<Modal
				{...rest}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Body>
					{this.state.isLoginOpen && <Login showSignUpBox={this.showBox.bind(this, 'signUp')} closemodal={this.closemymodal.bind(this, 'close')} />}
					{this.state.isSignUpOpen && <SignUp showSignInBox={this.showBox.bind(this, 'signIn')} closemodal={this.closemymodal.bind(this, 'close')}/>}
				</Modal.Body>
			</Modal>
		);
	}
}
export default ModalLogin;