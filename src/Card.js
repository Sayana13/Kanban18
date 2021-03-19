

function Card (props) {

    const {description, status, name, priority} = props.card;
    return (
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{status}</h6>
                <p className="card-text">{description}</p>
                <p className="card-text">Priority: {priority}</p>
                <button type="button" className="btn btn-outline-primary">↑</button>
                <button type="button" className="btn btn-outline-primary">↓</button>
                <button type="button" className="btn btn-outline-primary">←</button>
                <button type="button" className="btn btn-outline-primary">→</button>
                <button type="button" className="btn btn-outline-primary">Update</button>
                <button type="button" className="btn btn-outline-danger">Delete</button>
            </div>
        </div>

    );
}
 export default Card;


