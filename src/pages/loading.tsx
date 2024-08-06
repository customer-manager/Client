import React, {  useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

const Loading = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const elem = document.querySelector('.loader') as HTMLElement;
        let fadeInInterval: any;
        let fadeOutInterval: any;

        const fadeIn = (timing: number) => {
            let newValue = 0;
            elem.style.display = 'flex';
            elem.style.opacity = '0';
            fadeInInterval = setInterval(() => {
                if (newValue < 1) {
                    newValue += 0.01;
                } else if (newValue === 1) {
                    clearInterval(fadeInInterval);
                }
                elem.style.opacity = String(newValue);
            }, timing);
        };

        const fadeOut = (timing: number) => {
            let newValue = 1;
            elem.style.opacity = '1';
            fadeOutInterval = setInterval(() => {
                if (newValue > 0) {
                    newValue -= 0.01;
                } else if (newValue < 0) {
                    elem.style.opacity = '0';
                    elem.style.display = 'none';
                    clearInterval(fadeOutInterval);
                }
                elem.style.opacity = String(newValue);
            }, timing);
        };

        if (isLoading) {
            clearInterval(fadeInInterval);
            clearInterval(fadeOutInterval);
            fadeIn(3);
            setTimeout(() => {
                clearInterval(fadeInInterval);
                clearInterval(fadeOutInterval);
                fadeOut(3);
            }, 4000);
        }

        // Cleanup function
        return () => {
            clearInterval(fadeInInterval);
            clearInterval(fadeOutInterval);
        };
    }, [isLoading]);

    return (
        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Body>
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {isLoading && (
                <div className="loader">
                    <div className="p-4 text-center">
                        <div className="custom-loader"></div>
                        <h2 className="my-3 f-w-400">Loading..</h2>
                        <p className="mb-0">Please wait while we get your information from the web</p>
                    </div>
                </div>
            )}

        </React.Fragment>
    )
}




export default Loading