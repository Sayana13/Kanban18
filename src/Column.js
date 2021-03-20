import Card from "./Card";

function Column(props) {

    return (
        <div className="col text-capitalize">

            <h3>{props.status.title}</h3>
            {props.card.filter(el => props.status.status === el.status)
                .map(el => <Card card={el}
                                 key={el._id}
                                 nextStatus={props.nextStatus}
                                 columns={props.columns}
                                 priority={props.property}
                />)}
        </div>
    );
};

export default Column;


