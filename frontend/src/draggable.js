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

                var newPos;
                const snapToGrid = event.target.getAttribute('data-snaptogrid');
                const x = parseFloat(event.target.getAttribute('data-x')) || 0;
                const y = parseFloat(event.target.getAttribute('data-y')) || 0;


                if (snapToGrid === "true") {
                    //Snap to grid
                    newPos = snapTile(x, y);
                } else {
                    newPos = {
                        x: x,
                        y: y
                    }
                }

                moveTile(event.target, newPos.x, newPos.y);

                //remove snap preview
                const snapPreview = document.querySelector('.tileSnapPreview');
                if (snapPreview) snapPreview.remove();

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
    //preview snapping
    if (target.getAttribute('data-snaptogrid') === "true") {
        const snapPos = snapTile(x, y);
        let snapPreview = document.querySelector('.tileSnapPreview');
        if (!snapPreview) {
            snapPreview = document.createElement("div");
            snapPreview.classList.add("tileSnapPreview");
            target.appendChild(snapPreview);
        }
        snapPreview.style.left = `${snapPos.x - x}vw`;
        snapPreview.style.top = `${snapPos.y - y}px`;
    }
}

function snapTile(x, y) {
    const snapGridSizeX = 25;
    const snapGridSizeY = 200;
    //snap x and y to grid size
    const roundedX = Math.round( x / snapGridSizeX) * snapGridSizeX;
    const roundedY = Math.round( y / snapGridSizeY) * snapGridSizeY;
    //return new x and y
    return {
        x: roundedX,
        y: roundedY
    };
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;