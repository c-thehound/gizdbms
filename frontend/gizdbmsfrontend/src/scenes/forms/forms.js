import React from 'react';
import {connect} from 'react-redux';
import { TransitionablePortal,Button,Icon,Card ,Form, Breadcrumb, Grid, Label} from 'semantic-ui-react';
import './forms.css';
import { dataCache } from '../../utils/dataCache';

export class NewSale extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open:false,
            stage:1
        }
    }

    handleNextStage = () =>{
        this.setState({stage:this.state.stage+1})
    }

    handlePreviousStage = () =>{
        this.setState({stage:this.state.stage-1})
    }

    handleOpen = () => this.setState({open:true})
    handleClose = () => this.setState({open:false})

    render(){
        const {stage} = this.state;
        return(
            <TransitionablePortal
            closeOnTriggerClick
            closeOnDocumentClick
            open={this.state.open}
            onOpen={this.handleOpen}
            onClose={this.handleClose}
            openOnTriggerClick
            transition={{animation:"fade down",duration:300}}
            trigger={
                <Button color="green" icon labelPosition="right">
                <Icon name="chart line"/>
                New Sale
                </Button>
            }
            >
            <div className="formcard">
            <div className="overlay"></div>
            <Card className="newsale form">
                <Card.Content>
                    New sale
                    <span className="close">
                    <Icon name="window close outline" onClick={this.handleClose}/>
                    </span>
                </Card.Content>
                <Card.Content className="progress">
                    <Grid columns="3">
                        <Grid.Row>
                            <Grid.Column>
                                <Label circular>1</Label>
                                Select customer
                            </Grid.Column>
                            <Grid.Column>
                                <Label circular>2</Label>
                                Select product
                            </Grid.Column>
                            <Grid.Column>
                                <Label circular>3</Label>
                                Review and complete
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
                <Card.Content>
                    <Forms stage={stage}/>
                </Card.Content>
                <Card.Content className="actions">
                <div className="btns">
                <Button color="google plus" content="Cancel"/>
                <Button primary content="Continue"/>
                </div>
                </Card.Content>
            </Card>
            </div>
            </TransitionablePortal>
        );
    }
}

export class CustomerForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            customers:[],
            customer:""
        }
    }

    componentDidMount(){
        this.fetchCustomers('/api/customers/');
    }

    fetchCustomers = url =>{
        dataCache.getData(url).then(response => {
            this.setState({
                customers:response
            })
        })
    }

    handleChange = (e) =>{
        this.setState({customer:e.target.value});
    }

    render(){
        return(
            <Form>
                <Form.Input name="customer" placeholder="Select Customer"/>
            </Form>
        );
    }
}

export class ProductForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            products:[],
            product:""
        }
    }

    componentDidMount(){
        this.fetchProducts('/api/products/');
    }

    fetchProducts = url =>{
        dataCache.getData(url).then(response =>{
            this.setState({
                products:response
            })
        })
    }

    handleChange = (e) =>{
        this.setState({product:e.target.value});
    }

    render(){
        return(
            <Form>
            <Form.Input name="customer" placeholder="Select"/>
            </Form>
        );
    }
}

class ReviewFinish extends React.Component{
    render(){
        return(
            <div>
                Review and finish
            </div>
        );
    }
}




class Forms extends React.Component{
    render(){
        const {stage} = this.props;
        switch (stage) {
            case 1:
                return <CustomerForm/>
            case 2:
                return <ProductForm/>
            case 3:
                return <ReviewFinish/>
            default:
                return null
        }
    }
}

export default connect()(Forms);