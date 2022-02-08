import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';

function TileEditOverlay(props) {
    return (
        <CloseButton className="CloseButton" onClick={() => {props.deleteFunction()}} />
    );
}

export default TileEditOverlay;