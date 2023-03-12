import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";
import "../styles/employee.css";

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        };

        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            this.setState({ employee: res.data });
        });
    }

    goBack() {
        this.props.history.push("/employees");
    }

    render() {
        const { employee } = this.state;

        return (
            <div className="page-wrapper">
                <div className="container">
                    <div className="page-header">
                        <div className="page-title-block">
                            <h2 className="page-title">Employee details</h2>
                            <p className="page-subtitle">
                                Quick overview of this team member information.
                            </p>
                        </div>
                    </div>

                    <div className="card card-elevated form-card">
                        <div className="card-body">
                            <div className="detail-row">
                                <div className="detail-label">First name</div>
                                <div className="detail-value">
                                    {employee.firstName}
                                </div>
                            </div>

                            <div className="detail-row">
                                <div className="detail-label">Last name</div>
                                <div className="detail-value">
                                    {employee.lastName}
                                </div>
                            </div>

                            <div className="detail-row">
                                <div className="detail-label">Email</div>
                                <div className="detail-value">
                                    {employee.emailId}
                                </div>
                            </div>

                            <div className="form-actions" style={{ marginTop: "1.75rem" }}>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={this.goBack}
                                >
                                    Back to list
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewEmployeeComponent;
