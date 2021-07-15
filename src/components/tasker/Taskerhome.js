import React, {useEffect, useState} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBCardFooter,
    MDBBtn,
    MDBCardImage, MDBContainer, MDBRow, MDBCol
} from 'mdb-react-ui-kit';
import Axios from "axios";
import {NavLink} from "react-router-dom";

function Taskerhome(props) {
    //http://localhost:3000/tasker/home
    console.log(props.auth)
    const [allTasks, setAllTasks] = useState([])

    useEffect(()=> {
        async function getAllTasks() {
            try {
                let {data} = await Axios.get("http://127.0.0.1:8000/tasks/",{
                    headers:{
                        Authorization: `Bearer ${localStorage.access}`
                    }
                })
                console.log(data)
                setAllTasks(data)
            } catch (e) {
                console.log(e.response)
            }
        }

        getAllTasks()
    },[])


    return (
        <>
            <div style={{textAlign:"center", width:"100%"}}><h1>Test</h1></div>

            <MDBContainer fluid>
            <MDBRow className="mb-3">
            {allTasks.map((task) => (
            <MDBCol key={task.id} sm="4" className='col-example'>
                <NavLink to={`/task/show/${task.id}`}>
            <MDBCard background='success-color-dark' className='text-black mb-3 hover-shadow' alignment='center' style={{ maxWidth: '25rem' }}>
                <MDBCardTitle>To: Location </MDBCardTitle>
                <MDBCardTitle>From: Location </MDBCardTitle>
                <MDBCardImage src='https://via.placeholder.com/468x300?text=Map+or+FoodPic+Here' position='top' alt='...' />
                <MDBCardBody>
                    <MDBCardTitle>{task.name_of_task}</MDBCardTitle>
                    <MDBCardText>{task.description_to_buy}</MDBCardText>
                    <MDBCardText>Price of food: ${task.budget}</MDBCardText>
                    <MDBCardText>Budget: ${task.budget}</MDBCardText>
                    {/*<MDBBtn href='  #'>Accept</MDBBtn>*/}
                </MDBCardBody>
                <MDBCardFooter className='text-muted'>Date Posted: {task.created_at.split('T')[0]} Time Posted: {task.created_at.split('T')[1].split('.')[0]}</MDBCardFooter>
            </MDBCard>
                   </NavLink>
            </MDBCol>
            ))}
            </MDBRow>
            </MDBContainer>
        </>
    );
}

export default Taskerhome;
