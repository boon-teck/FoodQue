import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Container from "@material-ui/core/Container";
import AddIcon from '@material-ui/icons/Add';
// import Axios from "../../utilz/Axios";
import Axios from 'axios';
import Grid from "@material-ui/core/Grid";

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

export default function RecipeReviewCard() {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const [allTasks, setAllTasks] = useState([])

    useEffect(()=> {
        async function getAllTasks() {
            try {
                let {data} = await Axios.get("http://127.0.0.1:8000/tasks/",{
                    headers: {
                        authorization: `Bearer ${localStorage.access}`
                    }
                })
                console.log(data)
                setAllTasks(data)
            } catch (e) {
                console.log(e)
            }
        }

        getAllTasks()
    },[])




    return (
        <div className={classes.root}>

        <Grid container spacing={3}>
        {allTasks.map((task) => (
            <Grid>
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
                title={task.name_of_task}
                subheader={task.created_at.split('T')[0] +" "+ task.created_at.split('T')[1].split('.')[0]}
            />
            <CardMedia
                className={classes.media}
                image="https://via.placeholder.com/468x300?text=Map+or+FoodPic+Here"
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {task.description_to_buy}
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
                    <Typography paragraph>Details:</Typography>
                    <Typography paragraph>

                    </Typography>
                    <Typography paragraph>
                        Cost of Food: {task.cost_of_food}
                    </Typography>
                    <Typography paragraph>
                        Payment: {task.budget}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
        </Grid>
            ))}
        {/*</Container>*/}
            </Grid>

            </div>

            );
}
