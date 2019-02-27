import React from 'react';
import {connect} from 'react-redux';
import Layout from '../../components/layout/layout';
import { Grid ,Card, Icon} from 'semantic-ui-react';
import {fetch_dashboard} from '../../services/store/actions/dashboardActions';
import './dashboard.css';
import isObjEmpty from '../../utils/isObjEmpty';

class Dashboard extends React.Component{

    componentDidMount(){
        this.props.fetch_dashboard();
    }

    render(){
        const {dashboard} = this.props;
        if(isObjEmpty(dashboard)) return <div>Loading...</div>
        return(
            <Layout>
            <div className="dashboard">
            <Grid>
                <Grid.Row className="analytics">
                    <Grid.Column width={4}>
                    <Card>
                            <Card.Content>
                                <Icon name="users"/> Total customers
                            </Card.Content>
                            <Card.Content>
                                {dashboard.totalcustomers.toLocaleString()}
                            </Card.Content>
                            <Card.Content extra>
                                <span></span> From last week
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={4}>
                    <Card>
                            <Card.Content>
                                <Icon name="chart area"/> Total sales
                            </Card.Content>
                            <Card.Content>
                                {dashboard.totalsales.toLocaleString()}
                            </Card.Content>
                            <Card.Content extra>
                                <span></span> From last week
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={4}>
                    <Card>
                            <Card.Content>
                                <Icon name="money bill alternate outline"/> Credit amount
                            </Card.Content>
                            <Card.Content>
                                {dashboard.creditAmount.toLocaleString()}
                            </Card.Content>
                            <Card.Content extra>
                                <span></span> From last week
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={4}>
                    <Card>
                            <Card.Content>
                                <Icon name="money bill alternate outline"/> Deposit amount
                            </Card.Content>
                            <Card.Content>
                                {dashboard.depositAmount.toLocaleString()}
                            </Card.Content>
                            <Card.Content extra>
                                <span></span> From last week
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className="row1">
                    <Grid.Column width={10} className="col1">
                    <Card>

                    </Card>
                    </Grid.Column>
                    <Grid.Column width={6}>
                    <Card>

                    </Card>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className="row2">
                <Grid.Column width={6}>
                <Card>

                </Card>
                </Grid.Column>
                <Grid.Column width={10}>
                <Card>

                </Card>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row className="row3">
                    <Grid.Column width={16}>
                    <Card>

                    </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </div>
            </Layout>
        );
    }
}

const mapStateToProps = state =>{
    return{
        dashboard:state.dashboard.dashboard
    }
}

export default connect(mapStateToProps,{fetch_dashboard})(Dashboard);