import React from "react";
import { Card, CardBody, CardTitle, CardText, Container } from 'reactstrap'
import { useAuth } from "../../Context/AuthrorizeContext"
import img from '../homeimg/Jewellery_Banner_AH_1920.jpg'
import LiveGoldPriceDisplay from "./LiveGoldPriceDisplay"
import '../../index.css'

export default function Home() {
    const { user } = useAuth()

    return (
        <div style={{justifyContent: "center", minHeight: "100vh" ,position: "relative"}}>
            <div>
                <Container style={{ paddingTop: "50px",justifyContent: "center" }}>
                    <LiveGoldPriceDisplay />
                </Container>
                <Container className="mt-5" style={{ position: "fixed", top: "360px", left: "50%", transform: "translateX(-50%)" }}>
                    <div className="row">
                        <div className="col-md-4 d-flex">
                            <Card className="border border-4 border-darkpink flex-fill" style={{ borderColor: '#FFC0CB' }}>
                                <CardBody>
                                    <CardTitle className="mb-0" style={{ fontWeight: 'bold', fontSize: '1.2rem', background: '#FFC0CB', color: 'white', padding: '10px' }}>Term Duration</CardTitle><br />
                                    <CardText className="text-justify">
                                    The aggregate of 12 fixed / equal EMA easy monthly advance payment you pay monthly can be redeemed upon maturity (at the end of 12th month) with the benefit of NO VA / Making charges.
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-md-4 d-flex">
                            <Card className="border border-4 border-darkpink flex-fill" style={{ borderColor: '#FFC0CB' }}>
                                <CardBody>
                                    <CardTitle className="mb-0" style={{ fontWeight: 'bold', fontSize: '1.2rem', background: '#FFC0CB', color: 'white', padding: '10px' }}>Styling</CardTitle><br />
                                    <CardText className="text-justify">
                                    Everyone has a personal style. You can set your own trend by designing your jewellery at Chit-Gem. Browse through our large selection of designs and create your special piece of jewellery to reflect your unique sense of fashion.                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-md-4 d-flex">
                            <Card className="border border-4 border-darkpink flex-fill" style={{ borderColor: '#FFC0CB' }}>
                                <CardBody>
                                    <CardTitle className="mb-0" style={{ fontWeight: 'bold', fontSize: '1.2rem', background: '#FFC0CB', color: 'white', padding: '10px' }}>Chit</CardTitle><br />
                                    <CardText className="text-justify" style={{ fontFamily: 'Helvetica, sans-serif' }}>
                                    For wedding occasion or light weight wear for career women or ranges for men’s wear anything and everything under one roof  </CardText>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}
