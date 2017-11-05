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
            selectedCustomer: null
        };

        fetch('api/Customers/GetAll')
            .then(response => response.json() as Promise<Customer[]>)
            .then(data => {
                this.setState({ customers: data });
            });
        fetch('api/Items/GetAll')
            .then(response => response.json() as Promise<Item[]>)
            .then(data => {
                this.setState({ items: data });
            });

        this.onSelect = this.onSelect.bind(this);
    }

    onSelect({ value, label }) {
        fetch('api/orders?customerId=' + value)
            .then(response => response.json() as Promise<Order[]>)
            .then(data => {
                this.setState({ selectedCustomer: { name: label, id: value, orders: data } });
            });
        console.log(this.state.selectedCustomer)
    }

    public render() {
        const options = this.state.customers.map(c => {
            return { label: c.name, value: c.id };
        });

        return <div><Customers customers={this.state.customers} onSelect={(x) => this.onSelect(x)} />
            <h1> Items </h1>
            <ul>
                {this.state.items.map(c =>
                    <li key={c.id}>
                        {c.name}
                    </li>
                )}
            </ul>
        </div>;
    }
}
class Customers extends React.Component<any, any> {

    render() {
        const options = this.props.customers.map(c => {
            return { label: c.name, value: c.id };
        });

        return <div> Who are you?
        <Dropdown options={options}
                placeholder="Select an option"
                value
                onChange={(x) => this.props.onSelect(x)} />
        </div>;
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
}