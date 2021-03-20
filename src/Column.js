import Card from "./Card";

function Column(props) {
    return (
        <div className="col text-capitalize">
            <h3>{props.status.title}</h3>
            {props.cards
                .filter(el => props.status.status === el.status)
                .map(el => <Card
                    cards={el}
                    key={el._id}
                    nextStatus={props.nextStatus}
                    columns={props.columns}
                    priority={props.priority}
                />)}
        </div>
    );
}

export default Column;


