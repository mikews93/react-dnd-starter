import React, { useState } from "react";
import { Col } from "../components/Col";
import { DropWrapper } from "../components/DropWrapper";
import { Item } from "../components/item";
import { data, data2, statuses } from "../data";


const Homepage = () => {
    const [items, setItems] = useState({ open: data, 'in progress': data2 });

    const onDrop = (item, _, status) => {
        const mapping = statuses.find(statusIndex => statusIndex.status === status)
        
        setItems(prevState => {
            if (!prevState[status].length) {
                return {
                    ...prevState,
                    [state]: [{ ...item, status, icon: mapping.icon }]
                }
            } else {
                return prevState;
            }
        })
    }

    const moveItem = (dragIndex, hoverIndex, itemProp, currentColumnStatus) => {
        const itemStatus = itemProp.status;
        const mapping = statuses.find(statusIndex => statusIndex.status === currentColumnStatus)
        console.log('getting in...')
        setItems((prevState => {
            if (itemStatus === currentColumnStatus) {
                const item = items[itemStatus][dragIndex];
                const newItems = prevState[itemStatus].filter((_, index) => index !== dragIndex);
                newItems.splice(hoverIndex, 0, item);
                return { ...prevState, [itemStatus]: [ ...newItems ]};
            } else {
                const newItem = { ...itemProp, status: currentColumnStatus, icon: mapping.icon }
                console.log({hoverIndex})
                const newItems = prevState[currentColumnStatus].filter(({id}) => id !== itemProp.id);
                newItems.splice(hoverIndex, 0, newItem);
                return {
                    ...prevState,
                    [currentColumnStatus]: [ ...newItems ],
                    [itemStatus]: prevState[itemStatus].filter(prevItem=> prevItem.id !== itemProp.id)
                }
            }
        }))
    }

    return (<div className="row">
        {/* {statuses.map(status => */}
            <div className="col-wrapper">
                <h2 className="col-header">TODO</h2>
                <DropWrapper onDrop={onDrop} status="open">
                    <Col>
                        {
                            items['open']
                                .map((item, index) =>
                                    <Item key={item.id} item={item} index={index} moveItem={moveItem} status="open" />
                                )
                        }
                    </Col>
                </DropWrapper>
            </div>
            <div className="col-wrapper">
                <h2 className="col-header">IN PROGRESS</h2>
                <DropWrapper onDrop={onDrop} status="open">
                    <Col>
                        {
                            items['in progress']
                                .map((item, index) =>
                                    <Item key={item?.id} item={item} index={index} moveItem={moveItem} status="in progress" />
                                )
                        }
                    </Col>
                </DropWrapper>
            </div>
        {/* )} */}
    </div>)
};

export default Homepage;