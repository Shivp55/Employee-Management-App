import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";
import "../styles/employee.css";

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            firstName: "",
            lastName: "",
            emailId: ""
        };

        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        if (this.state.id === "_add") {
            return;
        } else {
            EmployeeService.getEmployeeById(this.state.id).then(res => {
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId: employee.emailId
                });
            });
        }
    }

    saveOrUpdateEmployee(e) {
        e.preventDefault();
        let employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId
        };

        if (this.state.id === "_add") {
            EmployeeService.createEmployee(employee).then(res => {
                this.props.history.push("/employees");
            });
        } else {
            EmployeeService.updateEmployee(employee, this.state.id).then(res => {
                this.props.history.push("/employees");
            });
        }
    }

    changeFirstNameHandler(event) {
        this.setState({ firstName: event.target.value });
    }

    changeLastNameHandler(event) {
        this.setState({ lastName: event.target.value });
    }

    changeEmailHandler(event) {
        this.setState({ emailId: event.target.value });
    }

    cancel() {
        this.props.history.push("/employees");
    }

    getTitle() {
        return this.state.id === "_add" ? "Add employee" : "Update employee";
    }

    render() {
        return (
            <div className="page-wrapper">
                <div className="container">
                    <div className="page-header">
                        <div className="page-title-block">
                            <h2 className="page-title">{this.getTitle()}</h2>
                            <p className="page-subtitle">
                                Enter or update basic information for this team member.
                            </p>
                        </div>
                    </div>

                    <div className="card card-elevated form-card">
                        <div className="card-body">
                            <form onSubmit={this.saveOrUpdateEmployee}>
                                <div className="mb-3">
                                    <label className="form-label">First name</label>
                                    <input
                                        placeholder="Enter first name"
                                        name="firstName"
                                        className="form-control"
                                        value={this.state.firstName}
                                        onChange={this.changeFirstNameHandler}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Last name</label>
                                    <input
                                        placeholder="Enter last name"
                                        name="lastName"
                                        className="form-control"
                                        value={this.state.lastName}
                                        onChange={this.changeLastNameHandler}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        name="emailId"
                                        className="form-control"
                                        value={this.state.emailId}
                                        onChange={this.changeEmailHandler}
                                    />
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={this.cancel}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-pill-primary"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateEmployeeComponent;
