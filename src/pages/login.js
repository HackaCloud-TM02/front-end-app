import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/index.css";
import "../css/login.css";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Api = axios.create({
  baseURL: "https://time-02-axrih3s3hs5a-px.integration.us-phoenix-1.ocp.oraclecloud.com/ic/api/integration/v1/flows/rest/"
  
});

const token = "dGltZWhhY2thY2xvdWRwbHVzb2Z0QGdtYWlsLmNvbTpIYWNrYWNsb3VkcGx1c29mdDAyKg=="

const options = {
    Headers: {
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Basic ${token}`,
    }
}


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false,
    };
  }

  changeField(field, event) {
    let _filed = event.target.value;
    this.setState((prevState) => {
      let nextState = Object.assign({}, prevState);
      nextState[field] = _filed;
      return nextState;
    });
  }



  submitForm(e){
    e.preventDefault();    

      if (this.state.password === '123456'){
        this.setState((prevState) => {
          let nextState = Object.assign({}, prevState);
          nextState.redirect = true;
          return nextState;
        });
      }else{

        alert("Usuário ou senha Incorretos !!!");
        
      }
      
      Api.get('', this.state, options).then((resp) => {

    }).catch((error)=> {

    });
    
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    } else {
      return (
        <div className="center">
          <Container>
            <Row>
              <Col md={{ span: 4, offset: 4 }}>
                <Image
                  className="image-details"
                  src="https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-cinco-altos_114360-1078.jpg?w=740&t=st=1677700329~exp=1677700929~hmac=caf22a71ace70d0e9097a3d9b06555d7e36a1f25b74434503132e56482bc217f"
                  rounded
                />
                <Form onSubmit={this.submitForm.bind(this)}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="details-form">Email</Form.Label>
                    <Form.Control
                      type="email"
                      className="font-forms"
                      placeholder="Informe o email"
                      value={this.state.email}
                      onChange={this.changeField.bind(this, "email")}
                    />
                    <Form.Text className="text-muted">
                      Informe seu e-mail pessoal
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="details-form">Password</Form.Label>
                    <Form.Control
                      type="password"
                      className="font-forms"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.changeField.bind(this, "password")}
                    />
                  </Form.Group>
                  <Button variant="danger" type="submit">
                    Login
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}
