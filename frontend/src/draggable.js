const interact = require('interactjs')

interact('.draggable')
    .draggable({
        inertia: {
            resistance: 20,
        },
        // keep the element within the area of it's parent
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            }),
            interact.modifiers.snap({
                targets: [interact.snappers.grid({
                    x: 50,
                    y: 50
                })]
            })
        ],

        listeners: {
            //this runs as the user is dragging the object:
            move: dragMoveListener,
            //this runs when the user lets go of the object:
            end(event) {
                //Using a custom event to tell the component it moved, and also send the new data-x and data-y values
                const onTileMoveEvent = new CustomEvent("onTileMove", {
                    detail: {
                        x: event.target.getAttribute('data-x'),
                        y: event.target.getAttribute('data-y')
                    },
                    bubbles: true
                });
                event.target.dispatchEvent(onTileMoveEvent);
            }
        },
    }
)

function dragMoveListener(event) {
    const target = event.target
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseInt(target.getAttribute('data-x')) || 0) + event.dx
    const y = (parseInt(target.getAttribute('data-y')) || 0) + event.dy
    console.log(event.dx, event.dy)
    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
    // update the position attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener