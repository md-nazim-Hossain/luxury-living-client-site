import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './Projects.css';
import { Fade, Roll} from 'react-reveal';
import { useState } from 'react';
import { useEffect } from 'react';
import Project from '../Project/Project';

const Projects = () => {

    const [projects,setProjects] = useState([]);

    useEffect(() =>{
        fetch('https://floating-cliffs-41974.herokuapp.com/projects')
        .then(res => res.json())
        .then(data => setProjects(data))
      },[]);

    return (
        <div className='py-5' id='projects'>
            <Fade top><p className='sm-tag'>Projects</p></Fade>
            <p className='common-title text-color'>
                <Roll left>Discover the latest Interior Design</Roll>
                <Roll right>available today</Roll>
            </p> 
            <Container className='py-5'>
                <Row xs={1} sm={2} md={3}>
                    {
                        projects.map(project => <Project
                            key={project._id}
                            project={project}
                        ></Project>)
                    }
                </Row>
            </Container>
        </div>
    );
};

export default Projects;