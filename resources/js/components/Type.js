import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import MaterialTable from 'material-table';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
}));

function Type(props) {
    const [types, setTypes] = React.useState(JSON.parse(props.data));
    const classes = useStyles();

    const list = [];
    for (const type of types) {
        list.push({ id: type.id, name: type.type });
    }


    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
        ],
        data: list,
    });

    return (
        <React.Fragment>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Type
                    </Typography>
                    </Container>
                </div>
                <Container maxWidth="md">
                    <MaterialTable
                        title="Types"
                        columns={state.columns}
                        data={state.data}
                        editable={{
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();

                                        axios.post('/typeRemove', {
                                            id: oldData.id,
                                            name: oldData.name,
                                        })
                                            .then(function (response) {
                                                console.log(response.data);
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            });

                                        setState((prevState) => {
                                            const data = [...prevState.data];
                                            data.splice(data.indexOf(oldData), 1);
                                            return { ...prevState, data };
                                        });
                                    }, 600);
                                }),
                            onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();

                                        axios.post('/typeSubmit', {
                                            name: newData.name,
                                        })
                                            .then(function (response) {
                                                console.log(response.data);
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            });

                                        setState((prevState) => {
                                            const data = [...prevState.data];
                                            data.push(newData);
                                            return { ...prevState, data };
                                        });
                                    }, 600);
                                }),
                        }}
                    />
                </Container>
            </main>
        </React.Fragment>
    );
}

export default Type;

if (document.getElementById('type')) {
    var data = document.getElementById('type').getAttribute('data');
    ReactDOM.render(<Type data={data} />, document.getElementById('type'));
}
