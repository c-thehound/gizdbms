import React from 'react';
import {connect} from 'react-redux';
import Layout from '../../components/layout/layout';

class Reports extends React.Component{
    render(){
        return(
            <Layout>
                <div className="reports">
                
                </div>
            </Layout>
        );
    }
}

export default connect()(Reports);