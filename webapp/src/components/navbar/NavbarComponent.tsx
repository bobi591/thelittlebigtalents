import React, { ReactNode } from 'react'
import { Dropdown } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
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
                        <Navbar.Brand href="/">
                            <img
                                src={AzureBlobStorage.getBlobUrl('logo.png')}
                                width={'7%'}
                                height={'7%'}
                            />
                        </Navbar.Brand>
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
                                                                            className="navlink-highlited"
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
                                                                                            <Nav.Link
                                                                                                className="navlink-highlited"
                                                                                                href={
                                                                                                    navbardThirdLevelChild.href
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    navbardThirdLevelChild.name
                                                                                                }
                                                                                            </Nav.Link>
                                                                                        )
                                                                                        return thirdLevelChildElementsToDisplay
                                                                                    }
                                                                                }
                                                                            )}
                                                                        </NavDropdown>
                                                                    )
                                                                } else {
                                                                    elementsToDisplay.push(
                                                                        <Nav.Link
                                                                            className="navlink-highlited"
                                                                            href={
                                                                                navbarChildItem.href
                                                                            }
                                                                        >
                                                                            {
                                                                                navbarChildItem.name
                                                                            }
                                                                        </Nav.Link>
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
                                                <Nav.Link
                                                    href={navbarItem.href}
                                                >
                                                    {navbarItem.name}
                                                </Nav.Link>
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
