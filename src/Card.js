import UpdateCardModal from "./UpdateCardModal";

function Card (props) {

    const {description, name, priority, status} = props.card;

    return (
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{status}</h6>
                <p className="card-text">{description}</p>
                <p className="card-text">Priority: {priority}</p>
                <button type="button" className="btn btn-outline-primary">↑</button>
                <button type="button" className="btn btn-outline-primary">↓</button>
                <button type="button" className="btn btn-outline-primary"
                        disabled={props.card.status===props.columns[0]}
                        onClick={()=>props.nextStatus(props.card, 'left')}
                >←</button>
                <button type="button" className="btn btn-outline-primary"
                        disabled={props.card.status=== props.columns[props.columns.length-1]}
                        onClick={()=>props.nextStatus(props.card, 'right')}>→</button>
                <UpdateCardModal
                    columns={props.columns}
                    priority={props.priority}
                    card={props.card}
                />
                <button type="button" className="btn btn-outline-danger">Delete</button>
            </div>
        </div>

    );
}
 export default Card;


