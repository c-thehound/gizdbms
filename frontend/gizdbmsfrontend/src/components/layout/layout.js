import React from 'react';
import {connect} from 'react-redux';
import './layout.css';
import {Card, Accordion, Image, Grid, Icon, Menu, Button} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import DP from '../../assets/kristy.png';
import {NewSale, UploadExcel, UploadCsv} from '../../scenes/forms/forms';

class SideNav extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeIndex:0
        }
    }

    handleLinkClick = (e,titleProps) =>{
        const {index} = titleProps;
        const {activeIndex} = this.state;
        const newIndex = activeIndex === index? -1:index;
        this.setState({
            activeIndex:newIndex
        })
    }
    render(){
        const {activeIndex} =this.state;
        return(
            <div className="sidenav">
            <div className="section1">
            <Card>
                <Card.Content className="logo">
                <p>Solar RBF Project</p>
                </Card.Content>
                <Card.Content className="user">
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                        <Image avatar src={DP}/>
                        </Grid.Column>
                        <Grid.Column className="details">
                        <span>Castin</span><br></br>
                        <span>browncastin@gmail.com</span>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Card.Content>
            </Card>
            </div>
            <div className="section2">
            <Accordion fluid styled>
            <NavLink to="/dashboard">
            <Accordion.Title active={activeIndex ===0} index={0} onClick={this.handleLinkClick}>
            <Icon name="home"/>
            Overview
            </Accordion.Title>
            </NavLink>

            <NavLink to="/tables">
            <Accordion.Title active={activeIndex ===1} index={1} onClick={this.handleLinkClick}>
            <Icon name="table"/>
            Sales
            </Accordion.Title>
            </NavLink>

            <NavLink to="reports">
            <Accordion.Title active={activeIndex ===2} index={2} onClick={this.handleLinkClick}>
            <Icon name="chart line"/>
            Reports
            </Accordion.Title>
            </NavLink>
            <Accordion.Content active={activeIndex === 2}>
            <NavLink to="/suntransfer">
            <li>Sales per company</li>
            </NavLink>
            <NavLink to="/azuri">
            <li>Sales per county</li>
            </NavLink>
            <NavLink to="/suntransfer">
            <li>Sales per product type</li>
            </NavLink>
            <NavLink to="/azuri">
            <li>Sales per product</li>
            </NavLink>
            <NavLink to="/">
            <li>Sales per product type per county</li>
            </NavLink>
            </Accordion.Content>
            
            </Accordion>
            </div>
            <div className='section3'>
            <Card>
                <Card.Content extra>
                <span>
                    <Icon name="power"/>
                    Log off
                </span>
                </Card.Content>
            </Card>
            </div>
            </div>
        );
    }
}

class HeaderComponent extends React.Component{
    render(){
        return(
            <div className="header-component">
            <Menu>
                <Menu.Item>
                    <Icon name="bars"/>
                </Menu.Item>
                <Menu.Menu position="right">
                <Menu.Item>
                    <NewSale/>
                </Menu.Item>
                <Menu.Item>
                    <UploadExcel/>
                </Menu.Item>
                <Menu.Item>
                    <UploadCsv/>
                </Menu.Item>
                </Menu.Menu>
            </Menu>
            </div>
        );
    }
}

class Layout extends React.Component{
    render(){
        return(
            <div className="layout">
            <HeaderComponent/>
            <SideNav/>
            <div className="appcontent">
            {this.props.children}
            </div>
            </div>
        );
    }
}

export default connect()(Layout);