import React, { ReactNode } from 'react'
import { Dropdown } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
import AzureBlobStorage from '../../datasource/AzureBlobStorage'
import NavbarItemData from '../../datasource/models/NavbarData'

type NavbarComponentProps = {
    navbarData: NavbarItemData
}

export default class NavbarComponent extends React.Component<NavbarComponentProps> {
    isMobile = window.innerWidth <= 1024

    navbarTogglerId = 'navbar-toggler'
    navbarId = 'basic-navbar-nav'

    //This fix and handle is for mobile versions!
    handleNavbarCollapse = () => {
        if (this.isMobile) {
            const navbarToggler = document.getElementById(this.navbarTogglerId)
            navbarToggler?.click()
        }
    }
    render(): React.ReactNode {
        return (
            <Navbar expand="sm" className="bg-white" sticky="top">
                <Container>
                    <Container fluid>
                        <Link onClick={this.handleNavbarCollapse} to="/">
                            <img
                                src={AzureBlobStorage.getBlobUrl('logo.png')}
                                width={'7%'}
                                height={'7%'}
                            />
                        </Link>
                        <Navbar.Toggle
                            id={this.navbarTogglerId}
                            aria-controls={this.navbarId}
                        />
                        <Navbar.Collapse id={this.navbarId}>
                            <Nav className="m-auto uppercasetext">
                                {this.props.navbarData!.content.map(
                                    (navbarItem) => {
                                        if (
                                            navbarItem.childItems !== undefined
                                        ) {
                                            return (
                                                <NavDropdown
                                                    title={navbarItem.name}
                                                    id="basic-nav-dropdown"
                                                >
                                                    {navbarItem.childItems?.map(
                                                        (navbarChildItem) => {
                                                            {
                                                                const elementsToDisplay: ReactNode[] =
                                                                    []
                                                                if (
                                                                    navbarChildItem.hasDividerOnTop ==
                                                                    true
                                                                ) {
                                                                    elementsToDisplay.push(
                                                                        <Dropdown.Divider />
                                                                    )
                                                                }
                                                                if (
                                                                    navbarChildItem.childItems !=
                                                                    undefined
                                                                ) {
                                                                    elementsToDisplay.push(
                                                                        <NavDropdown
                                                                            title={
                                                                                navbarChildItem.name
                                                                            }
                                                                            id="basic-nav-dropdown drop-left"
                                                                        >
                                                                            {navbarChildItem.childItems.map(
                                                                                (
                                                                                    navbardThirdLevelChild
                                                                                ) => {
                                                                                    {
                                                                                        const thirdLevelChildElementsToDisplay: ReactNode[] =
                                                                                            []
                                                                                        if (
                                                                                            navbardThirdLevelChild.hasDividerOnTop ==
                                                                                            true
                                                                                        ) {
                                                                                            thirdLevelChildElementsToDisplay.push(
                                                                                                <Dropdown.Divider />
                                                                                            )
                                                                                        }
                                                                                        thirdLevelChildElementsToDisplay.push(
                                                                                            <NavDropdown.Item
                                                                                                onClick={
                                                                                                    this
                                                                                                        .handleNavbarCollapse
                                                                                                }
                                                                                                className="nav-link navlink-highlighted"
                                                                                                to={
                                                                                                    navbardThirdLevelChild.href
                                                                                                }
                                                                                                as={
                                                                                                    Link
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    navbardThirdLevelChild.name
                                                                                                }
                                                                                            </NavDropdown.Item>
                                                                                        )
                                                                                        return thirdLevelChildElementsToDisplay
                                                                                    }
                                                                                }
                                                                            )}
                                                                        </NavDropdown>
                                                                    )
                                                                } else {
                                                                    elementsToDisplay.push(
                                                                        <NavDropdown.Item
                                                                            onClick={
                                                                                this
                                                                                    .handleNavbarCollapse
                                                                            }
                                                                            className="nav-link navlink-highlighted"
                                                                            to={
                                                                                navbarChildItem.href
                                                                            }
                                                                            as={
                                                                                Link
                                                                            }
                                                                        >
                                                                            {
                                                                                navbarChildItem.name
                                                                            }
                                                                        </NavDropdown.Item>
                                                                    )
                                                                }
                                                                return elementsToDisplay
                                                            }
                                                        }
                                                    )}
                                                </NavDropdown>
                                            )
                                        } else {
                                            return (
                                                <NavDropdown.Item
                                                    onClick={
                                                        this
                                                            .handleNavbarCollapse
                                                    }
                                                    className="nav-link"
                                                    to={navbarItem.href}
                                                    as={Link}
                                                >
                                                    {navbarItem.name}
                                                </NavDropdown.Item>
                                            )
                                        }
                                    }
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Container>
            </Navbar>
        )
    }
}
