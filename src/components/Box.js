import { useContext } from 'react';
import { DragSource } from 'react-dnd';
import { ColumnsContext } from '../context/ColumnsContext';


const style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
};
const ItemTypes = {
    BOX: 'box',
  }
const Box = ({ name, isDragging, connectDragSource }) => {
    const opacity = isDragging ? 0.4 : 1;
    const [ActiveDimention, setActiveDimention] = useContext(ColumnsContext)
    // const [ActiveMeasure, setMeasure] = useContext(ColumnsContext)
    
    return (
        <div ref={connectDragSource} role={'Box'} data-testid={`box-${name}`} style={{ ...style, opacity }}>
			{name}
        </div>
    );
};

export default DragSource(ItemTypes.BOX,
    {
    
    beginDrag: (props) => {
        return { name: props.name ,function: props.function };
    },
    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        console.log(props)
        if (dropResult) {            
            if (item.function == "dimension") {              
                localStorage.setItem("activDimension", JSON.stringify([item.name]))
                
            } else if (item.function == "measure") {
                localStorage.setItem("activMeasure", JSON.stringify([item.name]))
                
                
            }

        }
        window.location.reload();
    },
}, (connect, monitor) => {

    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
})(Box);
