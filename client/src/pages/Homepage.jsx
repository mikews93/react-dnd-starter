import React, { useState } from "react";
import { Col } from "../components/Col";
import { DropWrapper } from "../components/DropWrapper";
import { Item } from "../components/item";
import { data, statuses } from "../data";


const Homepage = () => {
    const [items, setItems] = useState(data);

    const onDrop = (item, _, status) => {
        const mapping = statuses.find(statusIndex => statusIndex.status === status)
        
        setItems(prevState => {
            const newItems = prevState
                .filter(prevItem => prevItem.id !== item.id)
                .concat({ ...item, status, icon: mapping.icon });
            return [ ...newItems ];
        })
    }

    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];
        setItems((prevState => {
            const newItems = prevState.filter((_, index) => index !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return [ ...newItems ];
        }))
    }

    return (<div className="row">
        {statuses.map(status =>
            <div key={status.status} className="col-wrapper">
                <h2 className="col-header">{status.status.toUpperCase()}</h2>
                <DropWrapper onDrop={onDrop} status={status.status}>
                    <Col>
                        {
                            items.filter(item => item.status === status.status)
                                .map((item, index) =>
                                    <Item key={item.id} item={item} index={index} moveItem={moveItem} status={status} />
                                )
                        }
                    </Col>
                </DropWrapper>
            </div>
        )}
    </div>)
};

export default Homepage;