import React from 'react';
import Layout from '../../components/layout/layout';
import {connect} from 'react-redux';

class Tables extends React.Component{
    render(){
        return(
            <Layout>
            <div className="tables">
            </div>
            </Layout>
        );
    }
}

export default connect()(Tables);