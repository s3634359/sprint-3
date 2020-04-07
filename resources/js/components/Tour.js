import React from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { fade, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import InputBase from '@material-ui/core/InputBase';
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
    ListItemSecondaryAction,
    Checkbox
} from "@material-ui/core";


import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import RootRef from "@material-ui/core/RootRef";
import LocationOn from "@material-ui/icons/LocationOn";
import DeleteOutline from "@material-ui/icons/Delete";
import SearchIcon from '@material-ui/icons/Search';
import Tour_Item from './Tour_Item';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    typeButton: {
        height: '40%',
        margin: theme.spacing(0.3),
        background: 'white',
    },
}));

// fake data generator
const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        primary: `item ${k}`,
        secondary: k % 2 === 0 ? `Whatever for ${k}` : undefined
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    // styles we need to apply on draggables
    ...draggableStyle,

    ...(isDragging && {
        background: "rgb(235,235,235)"
    })
});

const getListStyle = isDraggingOver => ({
    //background: isDraggingOver ? 'lightblue' : 'lightgrey',
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Tour(props) {
    const [tours, setTours] = React.useState(JSON.parse(props.data));
    const [types, setTypes] = React.useState(JSON.parse(props.type));
    const [locations, setLocations] = React.useState(JSON.parse(props.location));
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [items, setItems] = React.useState(getItems(10));

    //const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const handleClickOpen = (id) => {
        setOpen(true);
        window.location.href = "/tour_item?id=" + id;
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const i = reorder(
            items,
            result.source.index,
            result.destination.index
        );
        setItems(i);

    };



    return (
        <React.Fragment>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Tour
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Something short and leading about the collection below—its contents, the creator, etc.
                            Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                            entirely.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Main call to action
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        Secondary action
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {tours.map((tour) => (
                            <Grid item key={tour.id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {tour.name} ({tour.min_time} sec.)
                                        </Typography>
                                        {types.map((type) => type.tour_id = tour.id ? (<Button variant="contained" className={classes.typeButton}>{type.name}</Button>) : NULL)}
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => window.location.href = "/tour_item?id=" + tour.id} >
                                            View
                                        </Button>
                                        <Button size="small" color="primary" onClick={() => window.location.href = "/tour_type?id=" + tour.id} >
                                            Type
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}

export default Tour;

if (document.getElementById('tour')) {
    var data = document.getElementById('tour').getAttribute('data');
    var type = document.getElementById('tour').getAttribute('type');
    var location = document.getElementById('tour').getAttribute('location');
    ReactDOM.render(<Tour data={data} type={type} location={location} />, document.getElementById('tour'));
}
