import React from 'react';
import ReactDOM from 'react-dom';

function Tour_Type() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>
                        <div className="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tour_Type;

if (document.getElementById('tour_type')) {
    alert("d");
    ReactDOM.render(<Tour_Type />, document.getElementById('tour_type'));
}
