import React, { Component } from 'react';

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
            console.log(response);
            return response.json();
          })
        .then((data) => { 
          console.log(data);
          this.setState({ orders: data.orders}); 
        });
    }

    render() {
        console.log(this.state.orders)
        return (
            <div>
                <h2>Orders</h2>
                <ul>
                    {this.state.orders.map(order => 
                        <li key={order._id}>{ order.title }</li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Orders;
