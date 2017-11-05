import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface GrafanaState {
    boards: Dashboard[];
}

export class Grafana extends React.Component<RouteComponentProps<{}>, GrafanaState> {
    constructor() {
        super();
        this.state = { boards: [] };

        fetch('api/Grafana/Dashboards')
            .then(response => response.json() as Promise<Dashboard[]>)
            .then(data => {
                this.setState({ boards: data });
            });

    }

    public render() {
        return <div>
            <h1> Dashboards </h1>
            <ul>
                {this.state.boards.map(board =>
                    <li key={board.title}>
                        {board.title}
                    </li>
                )}
            </ul>
        </div>;
    }


}
interface Dashboard {
    title: string;
}