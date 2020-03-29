import React from 'react';
import ReactDOM from 'react-dom';

function Location() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Location Component</div>
                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Location;

if (document.getElementById('location')) {
    ReactDOM.render(<Location />, document.getElementById('location'));
}
