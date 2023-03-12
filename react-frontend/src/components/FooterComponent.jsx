import React, { Component } from 'react';

class FooterComponent extends Component {
    render() {
        return (
            <footer className="app-footer">
                <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div className="footer-left">
                        <span className="footer-copy">
                            © {new Date().getFullYear()} Shaishav Parekh
                        </span>
                    </div>
                    <div className="footer-links">
                        <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://shaishav-portfolio.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Portfolio
                        </a>
                    </div>
                </div>
            </footer>
        );
    }
}

export default FooterComponent;
