import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import {useHistory} from "react-router-dom";
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Axios from "axios";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.dark
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SubmitTask() {
    const classes = useStyles();

    const [task, setTask] = useState({})
    const [page, setPage] = useState(0)

    let history = useHistory()

    async function submit(e){
        e.preventDefault()
        console.log(e)
        console.log(task)
        try{
            let {data}= await Axios.post("http://127.0.0.1:8000/tasks/create/",task)
            console.log(data)
            // setAuth(true)
            // history.push("/")

        }catch(e){
            console.log(e)
        }
    }

    const handleChange = (prop) => (event) => {
        setTask({ ...task, [prop]: event.target.value });
    };



    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <FastfoodIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Submit Request
                </Typography>
                <form className={classes.form} noValidate onSubmit={submit}>

                    <Grid container spacing={2}>
                        {(page === 0) && (<>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="name_of_task"
                                variant="outlined"
                                required
                                fullWidth
                                id="name_of_task"
                                label="What to buy"
                                autoFocus
                                onChange={handleChange('name_of_task')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="buy_from"
                                variant="outlined"
                                required
                                fullWidth
                                id="where_to_buy"
                                label="Where to Buy"
                                autoFocus
                                onChange={handleChange('buy_from')}
                            />
                        </Grid></>) }

                        {(page === 1) &&
                        <><Grid item xs={12} sm={12}>
                            <TextField
                                name="deliver_to"
                                variant="outlined"
                                required
                                fullWidth
                                id="deliver_to"
                                label="Where to Deliver to"
                                autoFocus
                                onChange={handleChange('deliver_to')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="description_to_buy"
                                label="Description x Amount"
                                name="description_to_buy"
                                autoComplete="description_to_buy"
                                onChange={handleChange('description_to_buy')}
                            />
                        </Grid></>}
                        {(page === 2) && <>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="cost_of_food"
                                label="Cost of Food ($)"
                                name="cost_of_food"
                                autoComplete="cost_of_food"
                                type="number"
                                onChange={handleChange('cost_of_food')}
                            />
                        </Grid>
                            <Grid item xs={12}>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="budget"
                            label="Delivery Fee budget ($)"
                            type="number"
                            id="budget"
                            onChange={handleChange('budget')}
                            />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="phone_number"
                            label="Contact Number"
                            id="phone_number"
                            onChange={handleChange('phone_number')}
                            />
                            </Grid>
                        </> }
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="success"
                        className={classes.submit}
                    >
                        Submit Request
                    </Button>
                </form>
            </div>
        </Container>
    );
}

