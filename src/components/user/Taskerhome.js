import React, {useEffect, useState} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBCardFooter,
    MDBBtn,
    MDBCardImage
} from 'mdb-react-ui-kit';
import Axios from "axios";
import {Row} from "react-bootstrap";

function Taskerhome(props) {
    //http://localhost:3000/tasker/home
    console.log(props.auth)
    const [allTasks, setAllTasks] = useState([])

    useEffect(()=> {
        async function getAllTasks() {
            try {
                let {data} = await Axios.get("http://127.0.0.1:8000/tasks/")
                console.log(data)
                setAllTasks(data)
            } catch (e) {
                console.log(e)
            }
        }

        getAllTasks()
    },[])


    return (
        <>
            <Row>
            {allTasks.map((task) => (
            <MDBCard background='warning' className='text-black mb-3' alignment='center' style={{ maxWidth: '15rem' }}>
                <MDBCardTitle>To: Location </MDBCardTitle>
                <MDBCardTitle>From: Location </MDBCardTitle>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/new/standard/nature/184.jpg' position='top' alt='...' />
                <MDBCardBody>
                    <MDBCardTitle>{task.name_of_task}</MDBCardTitle>
                    <MDBCardText>{task.description_to_buy}</MDBCardText>
                    <MDBCardText>Price of food: ${task.budget}</MDBCardText>
                    <MDBCardText>Budget: ${task.budget}</MDBCardText>
                    <MDBBtn href='#'>Accept</MDBBtn>
                    <div><MDBBtn href='#'>More details</MDBBtn></div>
                </MDBCardBody>
                <MDBCardFooter className='text-muted'>Date Posted: {task.created_at.split('T')[0]} Time Posted: {task.created_at.split('T')[1].split('.')[0]}</MDBCardFooter>
            </MDBCard>
            ))}
            </Row>
        </>
    );
}

export default Taskerhome;
