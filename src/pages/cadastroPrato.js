import Menu from "./menu.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/cprato.css";
import "../css/index.css";
import React, { Component } from "react";
import axios from "axios";


const Api = axios.create({
  baseURL:
    "https://time-02-axrih3s3hs5a-px.integration.us-phoenix-1.ocp.oraclecloud.com/ic/api/integration/v1/flows/rest/",
});

const token =
  "dGltZWhhY2thY2xvdWRwbHVzb2Z0QGdtYWlsLmNvbTpIYWNrYWNsb3VkcGx1c29mdDAyKg==";

const options = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: `Basic ${token}`,
  },
};

export default class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      descricao: "",
      restaurante: "",
      tempoParaPreparo: "",
      acompanhamento: "Acompanhamento 1",
      preco: "",
      url: "",
      listaRestaurantes: [],
      realizado: "",
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

  refresh() {
    Api.get("LISTAR_RESTAURANTES/1.0/listarRestaurante", options)
      .then((response) => {
        this.setState({ listaRestaurantes: response.data });
        console.log(response.data);
      })
      .catch(() => {
        console.log("Erro ao recuperar os dados");
      });
  }

  componentDidMount() {
    this.refresh();
  }

  handleReset = () => {
    document.querySelectorAll("input");
    this.setState({
      nome: "",
      descricao: "",
      tempoParaPreparo: "",
      acompanhamento: "Acompanhamento 1",
      preco: "",
      url: "",
    });
  };

  submitForm(e) {
    e.preventDefault();

    Api.post("CADASTRA_PRATO/1.0/cadastraPrato", this.state, options)
      .then((resp) => {
        alert("Prato cadastrado");
        this.handleReset();
      })
      .catch((error) => {        
        alert(`Erro ao cadastrar prato " ${error.data}`);
      });
  }

  render() {
    return (
      <div className="center">
        <Menu />
        <Container>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={this.submitForm.bind(this)}>
                <Form.Group controlId="formGridNome">
                  <Form.Label className="details-form">
                    Nome do Prato
                  </Form.Label>
                  <Form.Control
                    className="font-forms"
                    type="text"
                    placeholder="Informe o email"
                    value={this.state.nome}
                    onChange={this.changeField.bind(this, "nome")}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formGridDescricao">
                  <Form.Label className="details-form">
                    Descrição do prato
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    className="font-forms"
                    placeholder="Informe o descritivo do prato"
                    value={this.state.descricao}
                    onChange={this.changeField.bind(this, "descricao")}
                    required
                  />
                </Form.Group>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridendereco">
                    <Form.Label className="details-form">
                      Restaurante
                    </Form.Label>
                    <Form.Control
                      as="select"
                      className="font-forms select-forms"
                      placeholder="Informe o endereço"
                      value={this.state.restaurante}
                      onChange={this.changeField.bind(this, "restaurante")}
                      required
                    >
                      {this.state.listaRestaurantes.map((dados, index) => (
                        <option key={index} value={dados.id}>
                          {dados.id} - {dados.nome}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridPreco">
                    <Form.Label className="details-form">
                      Preço do prato
                    </Form.Label>
                    <Form.Control
                      className="font-forms"
                      placeholder="Informe o preço do prato"
                      value={this.state.preco}
                      onChange={this.changeField.bind(this, "preco")}
                      required
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridtempoParaPreparo">
                    <Form.Label className="details-form">
                      Tempo para preparo
                    </Form.Label>
                    <Form.Control
                      className="font-forms"
                      placeholder="Informe o tempo medio para preparar o pedido"
                      value={this.state.tempoParaPreparo}
                      onChange={this.changeField.bind(this, "tempoParaPreparo")}
                      required
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridAcompanhamento">
                    <Form.Label className="details-form">
                      Acompanhamento
                    </Form.Label>
                    <Form.Control
                      className="font-forms select-forms"
                      as="select"
                      placeholder="Selecione o acompanhamento"
                      value={this.state.acompanhamento}
                      onChange={this.changeField.bind(this, "acompanhamento")}
                      required
                    >
                      <option>Acompanhamento 1</option>
                      <option>Acompanhamento 2</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Group controlId="formGridNome">
                  <Form.Label className="details-form">
                    Imagem do prato (URL)
                  </Form.Label>
                  <Form.Control
                    className="font-forms"
                    type="text"
                    placeholder="Informe a url da imagem (dica use o bucket)"
                    value={this.state.url}
                    onChange={this.changeField.bind(this, "url")}
                    required
                  />
                </Form.Group>
                <Button variant="danger" type="submit">
                  Cadastrar
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
