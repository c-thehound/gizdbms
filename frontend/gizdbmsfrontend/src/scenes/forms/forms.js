import React from 'react';
import Layout from '../../components/layout/layout';
import {connect} from 'react-redux';

class Forms extends React.Component{
    render(){
        return(
            <Layout>
                <div className="forms">
                
                </div>
            </Layout>
        );
    }
}

export default connect()(Forms);