import React from 'react';
import ReactDOM from 'react-dom';

function Tour() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Tour Component</div>
                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tour;

if (document.getElementById('tour')) {
    ReactDOM.render(<Tour />, document.getElementById('tour'));
}
