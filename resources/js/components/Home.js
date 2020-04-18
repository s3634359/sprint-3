import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import MaterialTable from 'material-table';
import { Typography, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
}));

function Home(props) {
    const [users, setUsers] = React.useState(JSON.parse(props.data));
    const classes = useStyles();

    const list = [];
    for (const user of users) {
        list.push({ name: user.name, email: user.email, position: user.position });
    }

    // Account table state
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Email', field: 'email' },
            { title: 'Position', field: 'position' },
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
                            Account
                    </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Welcome
                        </Typography>
                    </Container>
                </div>
                <Container maxWidth="md">
                    <MaterialTable
                        title="Users"
                        columns={state.columns}
                        data={state.data}
                        editable={{
                            onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                        resolve();

                                        axios.post('/accountDelete', {
                                            name: oldData.name,
                                        })
                                            .then(function (response) {
                                                console.log(response.data);
                                                setState((prevState) => {
                                                    const data = [...prevState.data];
                                                    data.splice(data.indexOf(oldData), 1);
                                                    return { ...prevState, data };
                                                });
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                                alert("Only admins can deactivate accounts");
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

export default Home;

if (document.getElementById('home')) {
    var data = document.getElementById('home').getAttribute('data');
    ReactDOM.render(<Home data={data} />, document.getElementById('home'));
}
