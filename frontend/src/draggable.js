const interact = require('interactjs');

interact('.draggable')
    .draggable({
        inertia: {
            resistance: 10,
        },
        // keep the element within the area of it's parent
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            }),
        ],
        listeners: {
            //this runs as the user is dragging the object:
            move: dragMoveListener,
            //this runs when the user lets go of the object:
            end(event) {
                //Snap to grid
                const newPos = snapTile(event.target);
                //create a custom event to tell the component it moved, and also send the new data-x and data-y values
                const onTileMoveEvent = new CustomEvent("onTileMove", {
                    detail: {
                        x: newPos.x,
                        y: newPos.y
                    },
                    bubbles: true
                });
                //send the event
                event.target.dispatchEvent(onTileMoveEvent);
            }
        },
    }
)

function dragMoveListener(event) {
    //calculate new x and y
    const x = (parseFloat(event.target.getAttribute('data-x')) || 0) + (event.dx / window.innerWidth * 100);
    const y = (parseFloat(event.target.getAttribute('data-y')) || 0) + event.dy;
    //move to new x and y
    moveTile(event.target, x, y);
    snapTile(event.target, true);
}

function moveTile(target, x, y) {
    // translate the to the new position
    target.style.transform = 'translate(' + x + 'vw, ' + y + 'px)';
    // update the position data attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

function snapTile(target, preview = false) {
    const snapGridSizeX = 25;
    const snapGridSizeY = 200;
    //snap x and y to grid size
    const oldX = parseFloat(target.getAttribute('data-x')) || 0;
    const oldY = parseFloat(target.getAttribute('data-y')) || 0;
    const x = Math.round(oldX / snapGridSizeX) * snapGridSizeX;
    const y = Math.round(oldY / snapGridSizeY) * snapGridSizeY;
    //move tile to snapped pos
    if (preview) {
        target.style.boxShadow = `${x - oldX}vw ${y - oldY}px 2px 2px rgba(200, 200, 200, 0.5)`;
    } else {
        target.style.boxShadow = ``;
        moveTile(target, x, y);
    }
    //return new x and y
    return {x: x, y: y};
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;