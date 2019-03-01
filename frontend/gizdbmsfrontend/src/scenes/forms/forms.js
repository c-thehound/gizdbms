import React from 'react';
import {connect} from 'react-redux';
import {handleChange,makeSale} from '../../services/store/actions/saleActions';
import { TransitionablePortal,Button,Icon,Card ,Form, Breadcrumb, Grid, Label, Divider, GridColumn} from 'semantic-ui-react';
import './forms.css';
import { dataCache } from '../../utils/dataCache';
import WOW from 'wowjs';
import $ from 'jquery';
import csrftoken from '../../utils/csrf_token';

export class NewSale extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open:false,
            stage:1,
            customer:"",
            constituency:"",
            county:"",
            product:"",
            serial:"",
            quantity:"",
            deposit:"",
            credit:""
        }
    }

    handleChange = (field,val) =>{
        this.setState({[field]:val})
    }

    componentDidMount(){
        var wow = new WOW.WOW();
        wow.init();
    }

    handleNextStage = () =>{
        const {stage} = this.state;
        switch (stage) {
            case 1:
                this.setState({stage:2})
                break;
            case 2:
                this.setState({stage:3})
                break;
            case 3:
                this.setState({stage:3});
                break;
            default:
                break;
        }
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
                <Card.Content className="mainform wow slideInRight">
                    <Forms handleClose={this.handleClose} handleChange={this.handleChange} stage={stage}/>
                </Card.Content>
                <Card.Content className="actions">
                <div className="btns">
                <Button color="google plus" content="Cancel" onClick={this.handleClose}/>
                {stage > 1 ? <Button color="google plus" content="Previous" onClick={this.handlePreviousStage}/> :null}
                {stage === 3? null : <Button color="orange" content="Continue" onClick={this.handleNextStage}/>}
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
            counties:[],
            cleandata:null,
            // Select fields
            customer:"",
            constituency:"",
            county:"",
            gender:""
        }
    }

    componentDidMount(){
        this.fetchCustomers('/api/customers/');
        this.fetchCounties('/api/counties/');
    }

    fetchCustomers = url =>{
        dataCache.getData(url).then(response => {
            this.setState({
                customers:response
            })
        })
    }

    fetchCounties = url =>{
        dataCache.getData(url).then(response =>{
            this.setState({
                counties:response
            })
        })
    }

    handleChange = (e) =>{
        this.props.handleChange(e.target.name,e.target.value);
    }

    handleSelectChange = (e,{value,name}) =>{
        this.setState({[name]:value});
        this.props.handleChange(name,value);
    }

    cleanData = () =>{
        const {customers} = this.state;
        var data = [];
        customers.forEach(function(d){
            data.push({key:d.id,text:d.fname+" "+d.lname,value:d.id_no})
        });
        return data;
    }

    cleanCountyData = () =>{
        const {counties} = this.state;
        var data = [];
        counties.forEach(function(d){
            data.push({key:d.id,text:d.name,value:d.id})
        });
        return data;
    }

    render(){
        const genders = [
            {key:"F",text:"Female",value:"FEMALE"},
            {key:"M",text:"Male",value:"MALE"}
        ];
        return(
            <div className="stage wow">
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                    <Form className="selectcustomer">
                        <Form.Select fluid name="customer" value={this.state.customer} onChange={this.handleSelectChange} placeholder="Select Customer" options={this.cleanData()}/>
                        <Form.Select fluid name="county" onChange={this.handleSelectChange} value={this.state.county} options={this.cleanCountyData()} placeholder="County"/>
                    </Form>
                    </Grid.Column>
                    <Grid.Column width={8}>
                    <Form className="createcustomer">
                        <Form.Input name="fname" placeholder="First name" onChange={this.handleChange}/>
                        <Form.Input name="sname" placeholder="Last name"/>
                        <Form.Input name="idno" placeholder="National ID"/>
                        <Form.Input name="phone" placeholder="Phone number"/>
                        <Form.Select name="gender" placeholder="Gender" options={genders} />
                        <Form.Input name="aphone" placeholder="Alternative phone number"/>
                        <Form.Button type="submit" fluid content="Add customer"/>
                    </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </div>
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
        var wow = new WOW.WOW();
        wow.init();
    }

    handleSelectChange = (e,{value,name}) =>{
        this.setState({[name]:value});
        this.props.handleChange(name,value);
    }

    handleChange = (e) =>{
        this.props.handleChange(e.target.name,e.target.value);
    }

    fetchProducts = url =>{
        dataCache.getData(url).then(response =>{
            this.setState({
                products:response
            })
        })
    }

    cleanData = () =>{
        const {products} = this.state;
        var data = [];
        products.forEach(function(d){
            data.push({key:d.id,text:d.name,value:d.id})
        });
        return data;
    }

    render(){
        return(
            <div className="stage wow fadeInRight productform">
            <Form>
            <Form.Select name="product" onChange={this.handleSelectChange} placeholder="Select Product" value={this.state.product} options={this.cleanData()}/>
            <Form.Input name="serial" onChange={this.handleChange} placeholder="Enter serial number"/>
            <Form.Input name="quantity" onChange={this.handleChange} placeholder="Quantity" type="number"/>
            <Form.Input name="deposit" onChange={this.handleChange} placeholder="Deposit" type="number"/>
            <Form.Input name="credit" onChange={this.handleChange} placeholder="Credit" type="number"/>
            </Form>
            </div>
        );
    }
}

class ReviewFinish extends React.Component{

    state = {
        response:{}
    }

    componentDidMount(){
        var wow = new WOW.WOW();
        wow.init();
    }

    handleSubmit = () =>{
        var {data} = this.props;
        $.ajax({
            url:'/api/sales/',
            type:'POST',
            data:data,
            headers:{
                'X-CSRFTOKEN':csrftoken
            },
            success:(res) => {
                this.setState({response:res})
                this.props.handleClose();
            }
        })
    }
    
    render(){
        const {data={}} = this.props;
        return(
            <div className="stage wow slideInRight review">
                <Form>
                        <Form.Input label="Customer" labelPosition="left" disabled value={data.customer}/>
                        <Form.Input label="Product" labelPosition="left" disabled value={data.product}/>
                        <Form.Input label="County" labelPosition="left" disabled value={data.county}/>
                        <Form.Input label="Serial" labelPosition="left" disabled value={data.serial}/>
                        <Form.Input label="Quantity" labelPosition="left" disabled value={data.quantity}/>
                        <Form.Input label="Deposit" labelPosition="left" disabled value={data.deposit}/>
                        <Form.Input label="Credit" labelPosition="left" disabled value={data.credit_amount}/>
                        <Button color="green" content="Finish" onClick={this.handleSubmit}/>
                </Form>
            </div>
        );
    }
}

export default connect({makeSale})(ReviewFinish);

class Forms extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            customer:"",
            county:"",
            product:"",
            serial:"",
            quantity:"",
            deposit:"",
            credit:""
        }
    }

    handleChange = (name,value) =>{
        this.setState({[name]:value})
    }

    render(){
        const {stage} = this.props;
        const handleOnChange = this.handleChange;
        const data = {
            customer:this.state.customer,
            county:this.state.county,
            product:this.state.product,
            serial:this.state.serial,
            quantity:this.state.quantity,
            deposit:this.state.deposit,
            credit_amount:this.state.credit
        };
        switch (stage) {
            case 1:
                return <CustomerForm handleChange={handleOnChange}/>
            case 2:
                return <ProductForm handleChange={handleOnChange}/>
            case 3:
                return <ReviewFinish handleClose={this.props.handleClose} makesale={makeSale} data={data}/>
            default:
                return null
        }
    }
}
