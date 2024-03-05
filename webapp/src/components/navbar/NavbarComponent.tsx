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
    render(): React.ReactNode {
        return (
            <Navbar expand="sm" className="bg-white" sticky="top">
                <Container>
                    <Container fluid>
                        <Link to="/">
                            <img
                                src={AzureBlobStorage.getBlobUrl('logo.png')}
                                width={'7%'}
                                height={'7%'}
                            />
                        </Link>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
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
                                                                                            <Link
                                                                                                className="nav-link navlink-highlighted"
                                                                                                to={
                                                                                                    navbardThirdLevelChild.href
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    navbardThirdLevelChild.name
                                                                                                }
                                                                                            </Link>
                                                                                        )
                                                                                        return thirdLevelChildElementsToDisplay
                                                                                    }
                                                                                }
                                                                            )}
                                                                        </NavDropdown>
                                                                    )
                                                                } else {
                                                                    elementsToDisplay.push(
                                                                        <Link
                                                                            className="nav-link navlink-highlighted"
                                                                            to={
                                                                                navbarChildItem.href
                                                                            }
                                                                        >
                                                                            {
                                                                                navbarChildItem.name
                                                                            }
                                                                        </Link>
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
                                                <Link
                                                    className="nav-link"
                                                    to={navbarItem.href}
                                                >
                                                    {navbarItem.name}
                                                </Link>
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
