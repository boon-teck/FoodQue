import React, {useEffect, useState} from 'react';
import Axios from "axios";
import {NavLink, useParams} from "react-router-dom";
import {
    MDBCard,
    MDBCardBody, MDBCardFooter,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
    MDBCol,
    MDBContainer,
    MDBRow
} from "mdb-react-ui-kit";




function SingleTaskCard(props) {
    const {id} = useParams();

    const [singleTask, setSingleTask] = useState({})

    useEffect(()=>{
        async function getSingleTask() {
            try {
                let {data} = await Axios.get(`http://127.0.0.1:8000/tasks/show/${id}`,{
                    headers:{
                        Authorization: `Bearer ${localStorage.access}`
                    }
                })
                console.log(data)
                setSingleTask(data)
            } catch (e) {
                console.log(e.response)
            }
        }
        getSingleTask()
    },[id])

    console.log(singleTask)
    // console.log(singleTask.name_of_task)

    return (
        <>
            <MDBContainer fluid>
                <MDBRow className="mb-3">

                        <MDBCol key={singleTask.id} sm="4" className='col-example'>
                            <NavLink to={`/task/show/${singleTask.id}`}>
                                <MDBCard background='success-color-dark' className='text-black mb-3 hover-shadow' alignment='center' style={{ maxWidth: '25rem' }}>
                                    <MDBCardTitle>To: Location </MDBCardTitle>
                                    <MDBCardTitle>From: Location </MDBCardTitle>
                                    <MDBCardImage src='https://mdbcdn.b-cdn.net/img/new/standard/nature/184.jpg' position='top' alt='...' />
                                    <MDBCardBody>
                                        <MDBCardTitle>{singleTask.name_of_task}</MDBCardTitle>
                                        <MDBCardText>{singleTask.description_to_buy}</MDBCardText>
                                        <MDBCardText>Price of food: ${singleTask.budget}</MDBCardText>
                                        <MDBCardText>Budget: ${singleTask.budget}</MDBCardText>
                                        {/*<MDBBtn href='  #'>Accept</MDBBtn>*/}
                                    </MDBCardBody>
                                    <MDBCardFooter className='text-muted'>Date Posted: {singleTask.created_at?.split('T')[0]} Time Posted: {singleTask.created_at?.split('T')[1].split('.')[0]}</MDBCardFooter>
                                </MDBCard>
                            </NavLink>
                        </MDBCol>

                </MDBRow>
            </MDBContainer>
        </>
    );
}

export default SingleTaskCard;
