import React from 'react';
import Layout from '../../components/layout/layout';
import {connect} from 'react-redux';
import {fetchSales} from '../../services/store/actions/saleActions';
import { Table } from 'semantic-ui-react';
import { dataCache } from '../../utils/dataCache';

class SaleRow extends React.Component{

    state = {
        product:{}
    }

    componentDidMount(){
        this.fetchProduct();
    }

    fetchProduct = () =>{
        dataCache.getData(`/api/product/${this.props.sale.product}/`)
        .then(response =>{
            this.setState({product:response})
        })
    }

    render(){
        const {sale} =this.props;
        return(
            <Table.Row>
            <Table.Cell>{this.state.product.name}</Table.Cell>
            <Table.Cell>{sale.serial}</Table.Cell>
            <Table.Cell>{sale.quantity}</Table.Cell>
            <Table.Cell>{sale.deposit}</Table.Cell>
            <Table.Cell>{sale.credit_amount}</Table.Cell>
        </Table.Row>
        );
    }
}

class Tables extends React.Component{

    componentDidMount(){
        this.props.fetchSales();
    }

    render(){
        const {sales} = this.props;
        return(
            <Layout>
            <div className="tables">
            <Table>
                <Table.Header>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Serial</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Deposit</Table.HeaderCell>
                    <Table.HeaderCell>Credit</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                    {sales.map(sale =>(
                        <SaleRow sale={sale}/>
                    ))}
                </Table.Body>
            </Table>
            </div>
            </Layout>
        );
    }
}

const mapStateToProps = state =>{
    return{
        sales:state.sale.sales
    }
}

export default connect(mapStateToProps,{fetchSales})(Tables);