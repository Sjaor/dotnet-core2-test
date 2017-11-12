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
            selectedCustomer: {id:0, name:'', orders:[]}
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

        this.onSelect = this.onSelect.bind(this);
    }

    onSelect({ value, label }) {

       // this.setState((prevState, props) => { return { selectedCustomer: { name: label, id: value} };});
        fetch('api/customers/'+ value+'/orders')
        .then(response => response.json() as Promise<Order[]>)
        .then(data => {
            console.log(data)
            this.setState((prevState, props) => { return { selectedCustomer: { name: label, id: value, orders: data} };});
        });
    }

    public render() {

        return <div><Customers customers = {this.state.customers} onSelect={(x) => this.onSelect(x)} selected={this.state.selectedCustomer.id} />
            <h1> Items </h1>
            <ul>
                {this.state.items.map(c =>
                    <li key={c.id}>
                        {c.name}
                    </li>
                )}
            </ul>
            <h1> Orders </h1>
            <ul>
                {this.state.selectedCustomer.orders.map(o =>
                <li key={o.id}>{o.id}</li>)}
            </ul>
        </div>;
    }
}
class Customers extends React.Component<any, any> {

    render() {
        const options = this.props.customers.map(c => {
            return { label: c.name, value: c.id };
        });
        console.log(this.props.selected)
        return <div> Who are you?
        <Dropdown options={options}
                placeholder="Select an option"
                value = {this.props.selected}
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
    lines: orderLines;
}
interface orderLines {
    id: number;
    item: string;
    qty: number;
}