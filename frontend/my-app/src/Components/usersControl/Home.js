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
                <Container className="mt-5" style={{ position: "fixed", top: "420px", left: "50%", transform: "translateX(-50%)" }}>
                    <div className="row">
                        <div className="col-md-4 d-flex">
                            <Card className="border border-4 border-darkpink flex-fill" style={{ borderColor: '#FFC0CB' }}>
                                <CardBody>
                                    <CardTitle className="mb-0" style={{ fontWeight: 'bold', fontSize: '1.2rem', background: '#FFC0CB', color: 'white', padding: '10px' }}>Term Duration</CardTitle><br />
                                    <CardText className="text-justify">
                                       The member can purchase BIS Hallmarked 22karat Gold Jewellery/ Gold Coins with benefit of NO value addition / Making charge. GST applicable.
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-md-4 d-flex">
                            <Card className="border border-4 border-darkpink flex-fill" style={{ borderColor: '#FFC0CB' }}>
                                <CardBody>
                                    <CardTitle className="mb-0" style={{ fontWeight: 'bold', fontSize: '1.2rem', background: '#FFC0CB', color: 'white', padding: '10px' }}>Term Duration</CardTitle><br />
                                    <CardText className="text-justify">
                                        The aggregate of eleven fixed / equal EMA easy monthly advance payment you pay monthly can be redeemed upon maturity (at the end of 11th month) with the benefit of NO VA / Making charges.
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-md-4 d-flex">
                            <Card className="border border-4 border-darkpink flex-fill" style={{ borderColor: '#FFC0CB' }}>
                                <CardBody>
                                    <CardTitle className="mb-0" style={{ fontWeight: 'bold', fontSize: '1.2rem', background: '#FFC0CB', color: 'white', padding: '10px' }}>Term Duration</CardTitle><br />
                                    <CardText className="text-justify" style={{ fontFamily: 'Helvetica, sans-serif' }}>
                                        The aggregate of eleven fixed / equal EMA easy monthly advance payment you pay monthly can be redeemed upon maturity (at the end of 11th month) with the benefit of NO VA / Making charges.
                                    </CardText>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}
