import React, { ReactNode } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavbarItemData from "../../datasource/models/NavbarData";
import Backend from "../../datasource/Backend";
import { Dropdown } from "react-bootstrap";
import ErrorBoundaryComponentState from "../ErrorBoundaryComponentState";

type NavbarComponentState = {
    navbarData?: NavbarItemData; 
}

export default class NavbarComponent extends React.Component {

    state: NavbarComponentState & ErrorBoundaryComponentState = {
        navbarData: undefined,
        error: undefined,
    }

    async componentDidMount() {
        Backend.getNavbar().then(value => this.setState({
            ...this.state,
            navbarData: value,
        })).catch(error => this.setState({
            ...this.state,
            error: error
        }));
    }

    render(): React.ReactNode {
        if(this.state.error !== undefined) {
            throw this.state.error;
        }
        if(this.state.navbarData != undefined) {
            return (
                <Navbar expand="sm" className="bg-white" sticky="top">
                    <Container>
                        <Container fluid>
                            <Navbar.Brand href="/">
                                <img src="/logo.png" width={"7%"} height={"7%"}/>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="m-auto uppercasetext">
                                    {
                                        this.state.navbarData.content.map((navbarItem) => {
                                            if(navbarItem.childItems !== undefined){
                                                return (
                                                    <NavDropdown title={navbarItem.name} id="basic-nav-dropdown">
                                                    {
                                                        navbarItem.childItems?.map((navbarChildItem) => {
                                                            {
                                                                const elementsToDisplay: ReactNode[] = [];
                                                                if(navbarChildItem.hasDividerOnTop == true) {
                                                                    elementsToDisplay.push(<Dropdown.Divider />);
                                                                }
                                                                if(navbarChildItem.childItems!=undefined) {
                                                                    elementsToDisplay.push(
                                                                        <NavDropdown className="navlink-highlited" key={"end"} title={navbarChildItem.name} id="basic-nav-dropdown drop-left">
                                                                            {
                                                                                navbarChildItem.childItems.map((navbardThirdLevelChild) => {
                                                                                    {
                                                                                        const thirdLevelChildElementsToDisplay: ReactNode[] = [];
                                                                                        if(navbardThirdLevelChild.hasDividerOnTop == true){
                                                                                            thirdLevelChildElementsToDisplay.push(<Dropdown.Divider />);
                                                                                        }
                                                                                        thirdLevelChildElementsToDisplay.push(<Nav.Link className="navlink-highlited" href={navbardThirdLevelChild.href}>{navbardThirdLevelChild.name}</Nav.Link>);
                                                                                        return thirdLevelChildElementsToDisplay;
                                                                                    }
                                                                                })
                                                                            }
                                                                        </NavDropdown>
                                                                    )
                                                                }
                                                                else {
                                                                    elementsToDisplay.push(<Nav.Link className="navlink-highlited" href={navbarChildItem.href}>{navbarChildItem.name}</Nav.Link>);
                                                                }
                                                                return elementsToDisplay;
                                                            }
                                                        })
                                                    }
                                                    </NavDropdown>
                                                )
                                            }
                                            else{
                                                return <Nav.Link href={navbarItem.href}>{navbarItem.name}</Nav.Link>
                                            }
                                        })
                                    }
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Container>
                </Navbar>
            )
        }
    }
}