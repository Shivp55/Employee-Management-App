import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";
import "../styles/employee.css";

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            search: ""
        };

        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.viewEmployee = this.viewEmployee.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then(res => {
            this.setState({ employees: res.data });
        });
    }

    addEmployee() {
        this.props.history.push("/add-employee/_add");
    }

    editEmployee(id) {
        this.props.history.push(`/add-employee/${id}`);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({
                employees: this.state.employees.filter(emp => emp.id !== id)
            });
        });
    }

    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`);
    }

    onSearchChange(e) {
        this.setState({ search: e.target.value });
    }

    render() {
        const { employees, search } = this.state;

        const filtered = employees.filter(emp => {
            const q = search.toLowerCase();
            return (
                emp.firstName.toLowerCase().includes(q) ||
                emp.lastName.toLowerCase().includes(q) ||
                emp.emailId.toLowerCase().includes(q)
            );
        });

        return (
            <div className="page-wrapper">
                <div className="container">
                    <div className="page-header">
                        <div className="page-title-block">
                            <h2 className="page-title">Employees</h2>
                            <p className="page-subtitle">
                                Manage your team members and their contact information.
                            </p>
                        </div>
                        <button
                            className="btn btn-primary btn-pill-primary"
                            onClick={this.addEmployee}
                        >
                            + Add Employee
                        </button>
                    </div>

                    <div className="card card-elevated">
                        <div className="table-toolbar">
                            <span className="badge-count">
                                <span className="dot" /> {filtered.length} employees
                            </span>

                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search by name or email..."
                                value={search}
                                onChange={this.onSearchChange}
                            />
                        </div>

                        <div className="table-responsive">
                            <table className="table table-hover table-modern">
                                <thead>
                                <tr>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Email</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4">
                                            No employees found.
                                        </td>
                                    </tr>
                                )}

                                {filtered.map(employee => (
                                    <tr key={employee.id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.emailId}</td>
                                        <td className="text-end">
                                            <button
                                                onClick={() =>
                                                    this.viewEmployee(employee.id)
                                                }
                                                className="btn btn-info btn-action"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() =>
                                                    this.editEmployee(employee.id)
                                                }
                                                className="btn btn-primary btn-action"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    this.deleteEmployee(employee.id)
                                                }
                                                className="btn btn-danger btn-action"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {/* simple static pagination UI for now */}
                        <div className="pagination-wrapper">
                            <span className="page-info">
                                Showing {filtered.length} of {employees.length}
                            </span>
                            <ul className="pagination pagination-sm mb-0">
                                <li className="page-item disabled">
                                    <button className="page-link">Prev</button>
                                </li>
                                <li className="page-item active">
                                    <button className="page-link">1</button>
                                </li>
                                <li className="page-item disabled">
                                    <button className="page-link">Next</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;
