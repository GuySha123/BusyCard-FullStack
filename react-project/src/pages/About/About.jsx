import React, { useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { ThemeContext } from '../../context/ThemeContext';

export default function About() {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <div className={`page-container body-${theme} h-100`}>
                <div className={`page-content-container my-4`}>
                    <div
                        className={`page-title-area mb-5 components-${theme} `}
                    >
                        <div className={`title-grid-holder ms-3`}>
                            <div className={'page-title p-0'}>
                                <h1 className={'m-0'}>About us</h1>
                            </div>
                        </div>
                    </div>
                    <div className={`p-4 components-${theme} `}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Possimus voluptas molestiae voluptatem quas
                            alias praesentium quia eveniet laboriosam atque rem
                            earum omnis deserunt, porro nobis velit. Distinctio
                            quia incidunt commodi magnam modi atque unde? Odio
                            est, minus voluptatibus quos aliquam nihil commodi
                            laudantium vitae enim ipsa veritatis deserunt
                            exercitationem officiis!
                        </p>
                        <Accordion className={`p-3`}>
                            <Accordion.Item eventKey='0'>
                                <Accordion.Header>
                                    Accordion Item #1
                                </Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor inci
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey='1'>
                                <Accordion.Header>
                                    Accordion Item #2
                                </Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididu
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    );
}
