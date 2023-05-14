import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Col,
  Container,
  Row,
  Tab,
  Tabs
} from 'react-bootstrap';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { userRegisterReq } from '../../../redux/users/UserAction';
import './UserLogin.scss';
import UserLoginMail from './UserLoginMail';

const UserLogin = (props) => {
  const [key, setKey] = useState('home');

  return (
    <Container fluid className="h-auto user-login">
      <Row className="">
        <Col
          lg={4}
          className="sideContainer height100vh d-flex flex-column m-0 p-0"
        >
          <h1 className="logoText pt-3 ps-3 ps-sm-4">CSX</h1>
          <div className="imgTextDiv d-flex flex-column justify-content-center ps-lg-5 ps-sm-4 ps-3 pe-lg-1 pe-sm-3 pe-2 w-100">
            <h1 className="imgTexth1">Be the one of 100X</h1>
            <p className="imgText mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </Col>
        <Col lg={8} className="p-0 h-auto d-flex  flex-column">
          <div className="loginReg w-100 d-flex justify-content-end pt-lg-3 pt-2 pe-4">
            <div className="loginRegSpace">
              <Link to={'/login'} className="link me-3">
                Login
                <MdOutlineArrowDropDown />
              </Link>
              <Link to={'/register'} className="link me-3">
                Register
                <MdOutlineArrowDropDown />
              </Link>
            </div>
          </div>

          <Container fluid>
            <Row className="justify-content-md-center">
              <Col
                sm={12}
                xs={12}
                className="form mt-lg-5  mb-2 mb-sm-3 mb-lg-4"
              >
                <h1 className="text-center pb-lg-1 mt-lg-5 mb-lg-4 mb-sm-3 mb-0">
                  User Login
                </h1>
              </Col>
              <Col sm={9} xs={12} className="mb-2 mb-sm-3 mb-lg-4">
                <UserLoginMail/>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col className="p-0">
          <div className="curve-bg"></div>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  // studentList: state.User.studentList,
});

const mapDispatchToProps = (dispatch) => ({
  userRegisterReq: bindActionCreators(userRegisterReq, dispatch),
});

UserLogin.propTypes = {
  userRegisterReq: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);