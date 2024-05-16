import React from "react";
import { Card, CardBody, CardTitle, CardText,Container} from 'reactstrap'
import { useAuth } from "../../Context/AuthrorizeContext"
import img from '../homeimg/Jewellery_Banner_AH_1920.jpg'
import LiveGoldPriceDisplay from "./LiveGoldPriceDisplay"
import '../../index.css'
export default function Home() {
    const { user } = useAuth()

    return (
        <>
            <Container style={{ paddingTop: "50px" }}>
                <LiveGoldPriceDisplay />
            </Container>
            <div>
                {/* <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "370px" }}>
                    <img src={img} alt="Jewellery Banner" className="banner-image" style={{ width: "100vw" }} />
                </Container> */}
            </div>
            <div>
            <Container className="container mt-5">
    <div className="row">
        <div className="col-md-4 d-flex">
            <Card className="border border-4 border-darkpink flex-fill" style={{ borderColor: '#FFC0CB'}}>
                <CardBody>
                <CardTitle className="mb-0" style={{ fontWeight: 'bold', fontSize: '1.2rem', background: '#FFC0CB', color: 'white', padding: '10px' }}>Term Duration</CardTitle><br/>
                <CardText className="text-justify">
                        11 months, Easy Monthly Advance (EMA) minimum of Rs.5,000/- (Rupees Five thousand) or above (in multiples of thousand) thereof for 11 months. The aggregate of EMA payment can be redeemed at the end of 11th month with full benefit on bhimagold.com. The member can purchase BIS Hallmarked 22karat Gold Jewellery/ Gold Coins with benefit of NO value addition / Making charge. GST applicable. Free gold coin is given on minimum enrollment of every Rs.8000.
                    </CardText>
                </CardBody>
            </Card>
        </div>
        <div className="col-md-4 d-flex">
            <Card className="border border-4 border-darkpink flex-fill" style={{ borderColor: '#FFC0CB' }}>
                <CardBody>
                <CardTitle className="mb-0" style={{ fontWeight: 'bold', fontSize: '1.2rem', background: '#FFC0CB', color: 'white', padding: '10px' }}>Term Duration</CardTitle><br/>
                <CardText className="text-justify">
                        The aggregate of eleven fixed / equal EMA easy monthly advance payment you pay monthly can be redeemed upon maturity (at the end of 11th month) with the benefit of NO VA / Making charges.
                    </CardText>
                </CardBody>
            </Card>
        </div>
        <div className="col-md-4 d-flex">
            <Card className="border border-4 border-darkpink flex-fill" style={{ borderColor: '#FFC0CB' }}>
                <CardBody>
                <CardTitle className="mb-0" style={{ fontWeight: 'bold', fontSize: '1.2rem', background: '#FFC0CB', color: 'white', padding: '10px' }}>Term Duration</CardTitle><br/>
<CardText className="text-justify" style={{ fontFamily: 'Helvetica, sans-serif' }}>
    The aggregate of eleven fixed / equal EMA easy monthly advance payment you pay monthly can be redeemed upon maturity (at the end of 11th month) with the benefit of NO VA / Making charges.
</CardText>
                </CardBody>
            </Card>
        </div>
    </div>
</Container>
</div>
</>
    );
}
