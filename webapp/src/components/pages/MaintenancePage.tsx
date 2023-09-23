import React from "react";

export class MaintenancePageProps {
    public errorMessage!: string;
}

export default class MaintenancePage extends React.Component<MaintenancePageProps> {
    constructor(props: MaintenancePageProps) {
        super(props);
    }

    render(): React.ReactNode {
        return(
            <div style={{display: "block", textAlign: "center", marginTop: "20vh"}}>
                <h3>Упс... нещо се обърка!</h3>
                <p>В момента има проблем в системата или работим по нея...</p>
                <p><small>{this.props.errorMessage}</small></p>
                <img src="/maintenance.png"/>
            </div>
        );
    }
}