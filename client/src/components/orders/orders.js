import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class Orders extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        fetch('/orders')
        .then(response => {
            return response.json();
          })
        .then((data) => { 
          this.setState({ orders: data.orders}); 
        });
    }

    render() {
      return (
        <Paper elevation={1}>
          <Typography variant="h5" component="h3">
            Orders
          </Typography>
          <Typography component="p">
            <ul>
                  {this.state.orders.map(order => 
                      <li key={order._id}>{ order.title }</li>
                  )}
            </ul>
          </Typography>
        </Paper>
      );
    }
}

export default Orders;
