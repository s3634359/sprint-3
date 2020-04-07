import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    IconButton,
    ListItemSecondaryAction,
    Checkbox
} from "@material-ui/core";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import RootRef from "@material-ui/core/RootRef";
import LocationOn from "@material-ui/icons/LocationOn";
import DeleteOutline from "@material-ui/icons/Delete";

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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
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

function Tour_Item(props) {
    const classes = useStyles();
    const [tour_id, set_tour_id] = React.useState(props.data);
    const [locations, setLocations] = React.useState(JSON.parse(props.location));
    const [location_list, set_location_list] = React.useState(JSON.parse(props.location_list));
    const [open, setOpen] = React.useState(false);
    const [location_id, set_location_id] = React.useState('');
    const [total, setTotal] = React.useState(locations.length);

    const handleChange = (event) => {
        for (const selected of location_list) {
            if (selected.id == event.target.value) {
                for (const location of locations) {
                    if (location.id == event.target.value) {
                        alert("Already included!");
                        return false;
                    }
                }
                locations.push(selected);
                
                setTotal(total + 1);

                let index = 1;
                for (const location of locations) {
                    location.order = index;
                    index += 1;
                }
            }
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        window.location.href = "/tour";
    };

    const handleSave = (event) => {
        event.preventDefault();

        for (const location of locations) {
            axios.post('/tourSubmitLocation', {
                id: tour_id,
                location_id: location.id,
                location_order: location.order,
            })
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        //window.location.href = "/tour";
    };

    const handleDelete = (event) => {
        // axios.post('/tourDeleteLocation', {
        //     id: tour_id,
        //     location_id: event.currentTarget.value,
        // })
        //     .then(function (response) {
        //         console.log(response.data);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        let backup = locations;
        let number = 0;
        for (const location of backup) {
            if (location.id == event.currentTarget.value) {
                backup.splice(number, 1);
            }
            number += 1;
        }
        // let index = 1;
        // for (const location of backup) {
        //     location.order = index;
        //     index += 1;
        // }
        //setLocations(backup);

    };

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const tempLocations = reorder(
            locations,
            result.source.index,
            result.destination.index
        );

        let index = 1;
        for (const location of tempLocations) {
            location.order = index;
            index += 1;
        }
        setLocations(tempLocations);
    };

    const location_items = [];
    for (const location of location_list) {
        location_items.push(<MenuItem value={location.id}>{location.name}</MenuItem>);
    }

    return (
        <React.Fragment>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleCancel} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>Tour Detail</Typography>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-controlled-open-select-label">Locations</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={location_id}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {location_items}
                        </Select>
                    </FormControl>
                    <Button autoFocus color="inherit" onClick={handleSave}>
                        save
                        </Button>
                </Toolbar>
            </AppBar>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <RootRef rootRef={provided.innerRef}>
                            <List style={getListStyle(snapshot.isDraggingOver)}>
                                {locations.map((location, index) => (
                                    <Draggable key={location.id} draggableId={location.name} index={index}>
                                        {(provided, snapshot) => (
                                            <ListItem
                                                ContainerComponent="li"
                                                ContainerProps={{ ref: provided.innerRef }}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                            >
                                                <ListItemIcon>
                                                    <LocationOn />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={location.name}
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton value={location.id} onClick={handleDelete}>
                                                        <DeleteOutline />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </List>
                        </RootRef>
                    )}
                </Droppable>
            </DragDropContext>
        </React.Fragment>
    );
}

export default Tour_Item;

if (document.getElementById('tour_item')) {
    var data = document.getElementById('tour_item').getAttribute('tour_id');
    var type = document.getElementById('tour_item').getAttribute('type');
    var location = document.getElementById('tour_item').getAttribute('location');
    var location_list = document.getElementById('tour_item').getAttribute('location_list');
    var type_list = document.getElementById('tour_item').getAttribute('type_list');
    ReactDOM.render(<Tour_Item data={data} type={type} location={location} location_list={location_list} type_list={type_list} />, document.getElementById('tour_item'));
}
