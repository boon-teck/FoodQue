import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import Axios from "axios";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import SIngleMessage from "./SIngleMessage";
import {Paper} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function SingleTask(props) {
    const {id} = useParams();
    console.log(id)

    const [singleTask, setSingleTask] = useState({})
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
            <div style={{ display:'flex', justifyContent:'center' }}>
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="task" className={classes.avatar}>
                        A
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={singleTask.name_of_task}
                subheader={singleTask.created_at?.split('T')[0] +" "+ singleTask.created_at?.split('T')[1].split('.')[0]}
            />
            <CardMedia
                className={classes.media}
                image="https://via.placeholder.com/468x300?text=Map+or+FoodPic+Here"
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {singleTask.description_to_buy}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">

                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Cost of Food: {singleTask.cost_of_food}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Payment: {singleTask.budget}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="add">
                    <AddIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Comments:</Typography>
                    <SIngleMessage />
                    <SIngleMessage />

                </CardContent>

            </Collapse>
        </Card>
            </div>


        </>
    );
}

export default SingleTask;
