import Menu from './menu.js';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/cpedido.css';
import '../css/index.css';
import React,{Component} from 'react';
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

export default class Restaurant extends Component {    
    
    constructor(props){
        super(props);
            this.state ={ pedido: [] }
        }

        refresh() {
            Api.get('LISTAR_PRATO/1.0/listarPratos', options)
            .then(response => { this.setState({ pedido: response.data}); })
            .catch(() => { console.log('Erro ao recuperar os dados'); });    
        }
        
        componentDidMount() {
            this.refresh()
        }    
 
        submitPedido(e){
            e.preventDefault();
                alert("Pedido realizado!");
        }

    render(){
  return (
<div className="center">
        <Menu/>
        <Container>
            <Row>
                <Col md={{ span: 12, offset: 0 }}>
                    {this.state.pedido.map((pedido,index) =>{
                        if(index <= 0){
                            return (                            
                                <Col md={{ span: 3, offset: 0 }}>
                    <Card style={{ width: '30rem' }}>
                        <Card.Img variant="top" src={pedido.url} />
                        <Card.Body>
                            <Card.Title className="tile-card">{pedido.nome}</Card.Title>
                            <Card.Text className="card-text">
                            {pedido.descricao}
                            </Card.Text>
                            <Row className="details-card-restaurant">
                                <Col md={{ span: 6, offset: 0 }}>
                                    <Card.Text as={Col}className="card-text details-card">
                            <strong>{pedido.restaurante}</strong>
                                    </Card.Text>
                                </Col>
                                <Col md={{ span: 6, offset: 0 }}>
                                    <Card.Text as={Col}className="card-text">
                            <strong>{pedido.tempoParaPreparo}</strong>
                                    </Card.Text>
                                </Col>                               
                            </Row>
                            <Card.Text as={Col}className="price">
                                      R$ {pedido.preco}
                            </Card.Text>
                            <Button variant="danger" className="btn-danger-pedido" value={index} onClick={this.submitPedido.bind(this)}>Fazer Pedido</Button>
                        </Card.Body>
                        <hr/>
                    </Card>
                    </Col>
                            )
                        } else {
                            return(
                            <Col md={{ span: 3, offset: 1 }}>
                   <Card style={{ width: '30rem' }}>
                        <Card.Img variant="top"  className="card-image" src={pedido.url} />
                        <Card.Body>
                            <Card.Title className="tile-card">{pedido.nome}</Card.Title>
                            <Card.Text className="card-text">
                            {pedido.descricao}
                            </Card.Text>
                            <Row className="details-card-restaurant">
                                <Col md={{ span: 6, offset: 0 }}>
                                    <Card.Text as={Col}className="card-text details-card">
                            <strong>{pedido.restaurante}</strong>
                                    </Card.Text>
                                </Col>
                                <Col md={{ span: 6, offset: 0 }}>
                                    <Card.Text as={Col}className="card-text">
                            <strong>{pedido.tempoParaPreparo}</strong>
                                    </Card.Text>
                                </Col>                                
                            </Row>
                            <Card.Text as={Col}className="price">
                                      R$ {pedido.preco}
                            </Card.Text>
                            <Button variant="danger" className="btn-danger-pedido" value={index} onClick={this.submitPedido.bind(this)}>Fazer Pedido</Button>
                        </Card.Body>
                        <hr/>
                    </Card>
                    </Col>)
                        }
                    })}
                    
                </Col>
            </Row>
        </Container>
</div>
  );
}
}
