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
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogTitle';

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
    const [newTour, setNewTour] = React.useState('');
    const [modalOpen, setModalOpen] = React.useState(false);
    const [tour_id, set_tour_id] = React.useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (event) => {
        axios.post('/deleteTour', {
            id: tour_id,
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        modalHandleClose();

        setTours(tours.filter(tour => tour.id != tour_id));
        //window.location.reload();
    };

    const modalHandleOpen = (event) => {
        set_tour_id(event.currentTarget.value);
        setModalOpen(true);
    };

    const modalHandleClose = () => {
        setModalOpen(false);
    };

    const createNewTour = () => {
        axios.post('/newTourSubmit', {
            name: newTour,
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        handleClose();

        setTours([...tours, {
            id: tours[tours.length - 1].id + 1,
            name: newTour,
            min_time: 0,
        }])
        //window.location.reload();
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
                            Built in 1879 for Melbourne’s first International Exhibition, it was chosen as the venue for the opening of the first Commonwealth Parliament of Australia on 9 May 1901, and recently became Australia’s first World Heritage Listed building.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={handleOpen}>
                                        Add a new tour
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {tours.map((tour, index) => (
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
                                        {types.map((type) => type.tour_id === tour.id ? <Button variant="contained" className={classes.typeButton}>{type.name}</Button> : "")}
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => window.location.href = "/tour_item?id=" + tour.id} >
                                            View
                                        </Button>
                                        <Button size="small" color="primary" onClick={() => window.location.href = "/tour_type?id=" + tour.id} >
                                            Type
                                        </Button>
                                        <Button size="small" color="secondary" value={tour.id} onClick={modalHandleOpen} >
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            <Dialog
                open={modalOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={modalHandleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Are you sure to delete the tour?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={modalHandleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Tour</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Locations can be added after creating a new tour.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Tour Name"
                        type="text"
                        value={newTour}
                        onChange={(e) => setNewTour(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={createNewTour} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
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
