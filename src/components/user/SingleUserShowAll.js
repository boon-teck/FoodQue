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
import Axios from "../../utilz/Axios";
import {NavLink} from "react-router-dom";

function SingleUserShowAll(props) {
    console.log(props.auth)
    const [userAllTasks, setUserAllTasks] = useState([])

    useEffect(()=> {
        async function singleUserAllTasks() {
            try {
                let {data} = await Axios.get("http://127.0.0.1:8000/tasks/user")
                console.log(data)
                setUserAllTasks(data)
            } catch (e) {
                console.log(e.response)
            }
        }

        singleUserAllTasks()
    },[])

    // let us = user && props.user.username
    console.log(props.user)


    return (
        <>
            <div style={{textAlign:"center", width:"100%"}}><h2>{props.username}'s tasks</h2></div>
            <MDBContainer fluid>
                <MDBRow className="mb-3">
                    {userAllTasks.map((task) => (
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

export default SingleUserShowAll;
