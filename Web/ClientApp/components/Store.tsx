import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

interface StoreState {
    customers: Customer[];
    items: Item[];
    selectedCustomer: SelectedCustomer;
}
export class Store extends React.Component<RouteComponentProps<{}>, StoreState> {
    constructor() {
        super();
        this.state = {
            customers: [],
            items: [],
            selectedCustomer: { id: 0, name: '', orders: [] }
        };

        fetch('api/Customers')
            .then(response => response.json() as Promise<Customer[]>)
            .then(data => {
                this.setState({ customers: data });
            });
        fetch('api/Items')
            .then(response => response.json() as Promise<Item[]>)
            .then(data => {
                this.setState({ items: data });
            });

        this.onCustomerSelect = this.onCustomerSelect.bind(this);
    }

    onCustomerSelect({ value, label }) {
        fetch(`api/customers/${value}/orders`)
            .then(response => response.json() as Promise<Order[]>)
            .then(data => {
                this.setState((prevState, props) => {
                    return {
                        selectedCustomer: {
                            name: label,
                            id: value,
                            orders: data
                        }
                    };
                }
                );
            });
    }

    public render() {
        var orders = this.state.selectedCustomer.orders.map((item, index) => {
            return (
                <div key={index}>
                    <li >Order nr {item.id}</li>
                    {
                        item.orderLines.map((subitem, i) => {
                            return (
                                <ul key={subitem.id}>
                                    <li>{subitem.item.name} x {subitem.quantity}</li>
                                </ul>
                            )
                        })
                    }
                </div>
            )
        });
        return (
            <div>
                <Customers
                    customers={this.state.customers}
                    onSelect={x => this.onCustomerSelect(x)}
                    selected={this.state.selectedCustomer} />
                <h1> Items </h1>
                <ul>
                    {this.state.items.map(c =>
                        <li key={c.id}>
                            {c.name}
                            <input></input>
                        </li>
                    
                    )}
                </ul>
                <button>Order</button>
                <h1> Orders </h1>
                <ul>
                    {orders}
                </ul>
            </div>
        );
    }
}
class Customers extends React.Component<any, any> {

    render() {
        const options = this.props.customers.map(c => {
            return { label: c.name, value: c.id };
        });

        let currentOption: any = null;
        if (this.props.selected.id) {
            currentOption = {
                label: this.props.selected.name, 
                value: this.props.selected.id
            };
        }

        return (
            <div>
                <h3>Who are you?</h3>
                <Dropdown options={options}
                    placeholder="Select an option"
                    value={currentOption}
                    onChange={(x) => this.props.onSelect(x)} />
            </div>
        );
    }
}
interface Customer {
    name: string;
    id: number;
}
interface SelectedCustomer {
    name: string;
    id: number;
    orders: Order[]
}
interface Item {
    name: string;
    id: number;
}
interface Order {
    id: number;
    orderLines: orderLines[];
}
interface orderLines {
    id: number;
    item: Item;
    quantity: number;
}