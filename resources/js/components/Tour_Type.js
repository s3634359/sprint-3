import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Slide,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Toolbar,
    Typography,
} from "@material-ui/core";
import DeleteOutline from "@material-ui/icons/Delete";
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    container: {
        width: '30%',
        justifyContent: "center",
        alignItems: "center",
        marginRight: "auto",
        marginLeft: "auto",
        textAlign: "center",
        paddingTop: theme.spacing(4),
    },
    table: {
        marginTop: theme.spacing(4),
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Tour_Type(props) {
    const classes = useStyles();
    const [tour_id, set_tour_id] = React.useState(props.data);
    const [types, setTypes] = React.useState(JSON.parse(props.type));
    const [type_list, set_type_list] = React.useState(JSON.parse(props.type_list));
    const [type_id, set_type_id] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleChange = (event) => {
        for (const selected of type_list) {
            if (selected.id == event.target.value) {
                for (const type of types) {
                    if (type.id == event.target.value) {
                        alert("Already included!");
                        return false;
                    }
                }
                types.push(selected);
            }
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const modalHandleOpen = (event) => {
        set_type_id(event.currentTarget.value);
        setModalOpen(true);
    };

    const modalHandleClose = () => {
        setModalOpen(false);
    };

    const handleCancel = () => {
        window.location.href = "/tour";
    };

    const handleSave = (event) => {
        event.preventDefault();
        if (types.length == 0) {
            handleCancel();
        }
        for (const type of types) {
            axios.post('/tourSubmitType', {
                id: tour_id,
                type_id: type.id,
            })
                .then(function (response) {
                    console.log(response.data);
                    setLoading(true);
                    handleCancel();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    };

    const handleDelete = (event) => {
        event.preventDefault();
        axios.post('/tourDeleteType', {
            id: tour_id,
            type_id: type_id,
        })
            .then(function (response) {
                console.log(JSON.parse(response.config.data).location_id);

                setTypes(types.filter(type => type.id != JSON.parse(response.config.data).type_id));
            })
            .catch(function (error) {
                console.log(error);
            });

        modalHandleClose();
    };

    const type_items = [];
    for (const type of type_list) {
        type_items.push(<MenuItem value={type.id}>{type.name}</MenuItem>);
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
                        <InputLabel id="demo-controlled-open-select-label">Types</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={type_id}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {type_items}
                        </Select>
                    </FormControl>
                    <Button autoFocus color="inherit" onClick={handleSave}>
                        save
                        </Button>
                </Toolbar>
            </AppBar>
            <div className={classes.container}>
                <Typography variant="h4" className={classes.title}>Tour Types</Typography>
                {loading === true ? <CircularProgress /> : (
                    <Paper>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="center">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {types.map(({ id, name }) => (
                                    <TableRow key={id}>
                                        <TableCell component="th" scope="row">
                                            {name}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton value={id} onClick={modalHandleOpen}>
                                                <DeleteOutline />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>)}
            </div>
            <Dialog
                open={modalOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={modalHandleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Are you sure to delete the type?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={modalHandleClose} color="secondary">
                        Cancel
                            </Button>
                    <Button onClick={handleDelete} color="primary">
                        Yes
                            </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default Tour_Type;

if (document.getElementById('tour_type')) {
    var data = document.getElementById('tour_type').getAttribute('tour_id');
    var type = document.getElementById('tour_type').getAttribute('type');
    var type_list = document.getElementById('tour_type').getAttribute('type_list');
    ReactDOM.render(<Tour_Type data={data} type={type} type_list={type_list} />, document.getElementById('tour_type'));
}
