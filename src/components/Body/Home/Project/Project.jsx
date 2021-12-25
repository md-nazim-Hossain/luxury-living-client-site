import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { Bounce } from 'react-reveal';
import location from '../../../../Image_Icon/Icon/location.png';

const Project = ({project}) => {

    const {projectName,projectLocation,projectImg} = project;

    return (
        <Col className='mb-4'>
            <Card className='h-100 border-0'>
                <Bounce left><Card.Img variant="top" src={projectImg} /></Bounce>
                <Card.Body>
                <Bounce bottom>
                    <Card.Title><p className='project-name'>{projectName}</p></Card.Title>
                </Bounce>
                <Bounce bottom>
                    <Card.Text>
                        <div>
                            <Image src={location} className='me-2'/>
                            {projectLocation}
                        </div>
                    </Card.Text>
                </Bounce>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Project;