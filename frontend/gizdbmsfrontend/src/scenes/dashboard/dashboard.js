import React from 'react';
import {connect} from 'react-redux';
import Layout from '../../components/layout/layout';
import { Grid ,Card, Icon, Header, Table, TableRow} from 'semantic-ui-react';
import {fetch_dashboard} from '../../services/store/actions/dashboardActions';
import './dashboard.css';
import isObjEmpty from '../../utils/isObjEmpty';
import * as d3 from 'd3';

class SalesPerProductType extends React.Component{

    componentDidMount(){
        this.drawChart(this.props.data);
    }

    drawChart = (data) =>{
        // Dimensions
        var height = 360;
        var width = 650;

        // Scales
        var xScale = d3.scaleLinear().range([0,width-30]).domain([0,d3.max(data,function(d){return d.sales;})]);
        var yScale = d3.scaleBand().range([height-40,0]).domain(data.map(function(d){return d.name;})).padding(.1);

        // Create the svg
        var svg = d3.select('.salesperproducttype')
        .append('svg')
        .attr('width',width).attr('height',height)
        .append('g')
        .attr('transform','translate('+10+','+5+")");
        
        // Append the rectangles for each type
        svg.selectAll('.bar').data(data)
        .enter().append('rect')
        .attr('height',yScale.bandwidth())
        .attr('y',function(d){return yScale(d.name);})
        .transition("meter")
        .delay(600)
        .duration(500)
        .attr('width',function(d){return xScale(d.sales);});

        // Append text to the rectangles
        var thickness = yScale.bandwidth();

        svg.selectAll('.bar')
        .data(data).enter()
        .append('g').attr('class',"labelg")
        .append('rect')
        .attr('width',function(d){return d.name.length*10})
        .attr('height',25)
        .attr('rx',5)
        .attr('ry',5)
        .attr('x',15)
        .attr('y',function(d){return (yScale(d.name)+(thickness/2)-13)})
        .attr('fill','red');

        d3.selectAll('.labelg')
        .append('text').text(function(d){return d.name;})
        .attr('class','label')
        .attr('x',20)
        .attr('y',function(d){return (yScale(d.name)+(thickness/2)+5)});

        d3.selectAll('.labelg')
        .append('rect')
        .attr('class','value')
        .attr('width',40)
        .attr('height',25)
        .attr('rx',5)
        .attr('ry',5)
        .attr('x',function(d){return (d.name.length*10)+20})
        .attr('y',function(d){return (yScale(d.name)+(thickness/2)-13)});

        d3.selectAll('.labelg')
        .append('text').text(function(d){return d.sales})
        .attr('class','label')
        .attr('x',function(d){return (d.name.length*10)+25})
        .attr('y',function(d){return (yScale(d.name)+(thickness/2)+5)});

        // Add the axes
        svg.append('g').attr('transform','translate(0,'+(height-40)+')').call(d3.axisBottom(xScale));
        svg.append('g').attr('class','yAxis').call(d3.axisLeft(yScale));
        svg.selectAll('.yAxis .tick text').remove();
    }

    render(){
        return(
            <div className="salesperproducttype">
            </div>
        );
    }
}

class SalesPerCounty extends React.Component{

    componentDidMount(){
        this.drawChart(this.props.data);
    }

    drawChart = (data) =>{
        // Dimensions
        var height = 360;
        var width = 360;
        var radius = Math.min(width,height)/2;

        var svg = d3.select('.salespercounty')
        .append('svg')
        .attr('width',width)
        .attr('height',height)
        .append('g')
        .attr("transform","translate("+width/2+","+height/2+")");

        var arc = d3.arc().outerRadius(radius-10).innerRadius(0);
        var pie = d3.pie().sort(null).value(function(d){return d.sales;});
        var color = d3.scaleOrdinal(d3.schemeAccent);

        var chart = svg.selectAll('.arc').data(pie(data))
        .enter()
        .append('g').attr('class','arc')

        chart.append("path")
        .transition()
        .delay(600)
        .duration(500)
        .attr('d',arc)
        .style('fill',function(d){return color(d.data.name);})
        
    }

    render(){
        return(
            <div className="salespercounty"></div>
        );
    }
}

class SalesPerCompany extends React.Component{

    componentDidMount(){
        this.drawChart(this.props.data);
    }

    drawChart = (data) =>{
        // Dimensions
        var height = 360;
        var width = 360;
        var radius = Math.min(width,height)/2;

        // Draw the svg
        var svg = d3.select('.salespercompany')
        .append('svg')
        .attr('width',width)
        .attr('height',height)
        .append('g')
        .attr('transform','translate('+width/2+","+height/2+')');

        var arc = d3.arc().outerRadius(radius-10).innerRadius(0);
        var pie = d3.pie().sort(null).value(function(d){return d.sales;});
        var color = d3.scaleOrdinal(d3.schemeAccent);

        var chart = svg.selectAll('.arc').data(pie(data))
        .enter()
        .append('g').attr('class','arc');

        chart.append('path')
        .transition()
        .delay(600)
        .duration(500)
        .attr('d',arc)
        .style('fill',function(d){return color(d.data.name)});
    }
    render(){
        return(
            <div className="salespercompany"></div>
        );
    }
}


class SalesPerProduct extends React.Component{
    render(){
        const {data} = this.props;
        return(
            <div className="salesperproduct">
            <Table>
                <Table.Header>
                    <Table.HeaderCell>Product</Table.HeaderCell>
                    <Table.HeaderCell>Total Sales</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                    {data.map(product =>(
                        <TableRow>
                            <Table.Cell>{product.name}</Table.Cell>
                            <Table.Cell>{product.sales}</Table.Cell>
                        </TableRow>
                    ))}
                </Table.Body>
            </Table>
            </div>
        );
    }
}

class SalesPerProductTypePerCounty extends React.Component{
    render(){
        const {data} = this.props;
        return(
            <div className="salesperproducttypepercounty">
            <Table celled>
                    <Table.Header>
                        <Table.HeaderCell>County</Table.HeaderCell>
                        <Table.HeaderCell>Product Type</Table.HeaderCell>
                        <Table.HeaderCell>Total Sales</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                        {data.map(row =>(
                            <Table.Row>
                                <Table.Cell>{row.name}</Table.Cell>
                                <Table.Cell className="nestedcells">
                                    {row.results.map(result =>(
                                        <div>
                                        <Table.Cell>{result.name}</Table.Cell>
                                        </div>
                                    ))}
                                </Table.Cell>
                                <Table.Cell className="nestedcells">
                                    {row.results.map(result =>(
                                        <div>
                                            <Table.Cell>{result.sales}</Table.Cell>
                                        </div>
                                    ))}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
            </Table>
            </div>
        );
    }
}

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
                        <Card.Content>
                            <Header as='h3'>Sales per product type</Header>
                        </Card.Content>
                        <Card.Content>
                        <SalesPerProductType data={dashboard.salesperproducttype}/>
                        </Card.Content>
                    </Card>
                    </Grid.Column>
                    <Grid.Column width={6}>
                    <Card>
                        <Card.Content>
                            <Header as="h3">Sales per county</Header>
                        </Card.Content>
                        <Card.Content>
                            <SalesPerCounty data={dashboard.salespercounty}/>
                        </Card.Content>
                    </Card>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row className="row2">
                <Grid.Column width={6}>
                <Card>
                    <Card.Content>
                    <Header as="h3">Sales per company</Header>
                    </Card.Content>
                    <Card.Content>
                        <SalesPerCompany data={dashboard.salespercompany}/>
                    </Card.Content>
                </Card>
                </Grid.Column>
                <Grid.Column width={10}>
                <Card>
                    <Card.Content>
                        <Header as='h3'>Sales per product</Header>
                    </Card.Content>
                    <Card.Content>
                        <SalesPerProduct data={dashboard.salesperproduct}/>
                    </Card.Content>
                </Card>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row className="row3">
                    <Grid.Column width={16}>
                    <Card>
                        <Card.Content>
                            <Header as='h3'>Sale per product per county</Header>
                        </Card.Content>
                        <Card.Content>
                            <SalesPerProductTypePerCounty data={dashboard.salesperproductpercounty}/>
                        </Card.Content>
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