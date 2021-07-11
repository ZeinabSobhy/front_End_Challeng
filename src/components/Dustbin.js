import { useEffect, useState } from 'react';
import { DropTarget } from 'react-dnd';

const ItemTypes = {
    BOX: 'box',
}
const style = {
    height: '12rem',
    width: '100%',
    padding: '1rem',

};
const Dustbin = ({ canDrop, isOver, connectDropTarget }) => {
    const isActive = canDrop && isOver;
    
    let backgroundColor = '#FFF';
    if (isActive) {
        backgroundColor = 'green';
    }
    else if (canDrop) {
        backgroundColor = 'darkkhaki';
    }
   
    const handleClear = (name) => {
        localStorage.setItem(name, "")
        window.location.reload()
        
    }
    return (
        <div ref={connectDropTarget} style={{ ...style }} role="Dustbin">
            <div className="form-control" >
                <label htmlFor="">Dimention</label>
                <input style={{ backgroundColor }} value={ localStorage.getItem('activDimension') && JSON.parse(localStorage.getItem('activDimension'))} />
                <button onClick={()=>handleClear("activDimension")}>Clear</button>
            </div>
            <div className="form-control">
                <label htmlFor="">measures</label>
                <input style={{ backgroundColor }} value={localStorage.getItem('activMeasure') && JSON.parse(localStorage.getItem('activMeasure'))} />
                <button onClick={()=>handleClear("activMeasure")}>Clear</button>
            </div>
            {/* {isActive ? 'Release to drop' : 'Drag a box here'} */}
        </div>
    );
};
export default DropTarget(ItemTypes.BOX, {
    drop: () => ({ name: 'Dustbin' }),
}, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))(Dustbin);
