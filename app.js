window.addEventListener('load', () => {

    /**
     * TO DO
     * Recompose into a class
     * Recompose into a React element
     * Once all slots are filled, recreate a new acceptor div with 5 new slots
     * and highlight the acceptor div as "complete"
     * Be able to remove draggables from a droppable
     * Figure out passing data to a curriculum model
     */

    const draggables = Array.from(document.querySelectorAll('.draggable'));
    const droppables = document.querySelectorAll('.droppable');

    // On the drag target
    const dragStart = (e) => {
        console.log("drag starts");
        e.dataTransfer.setData('text/plain', e.target.id);
        // The following will make the original element disappear.
        // setTimeout(() => {
        //     e.target.classList.add('hide');
        // }, 0);
        
    }

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    // On the drop target
    const dragEnter = (e) => {
        console.log(e);
        e.preventDefault();
        if(!e.target.firstChild) {
            e.target.classList.add('drag-over-safe');
        } else {
            e.target.classList.add('drag-over-unsafe');
        }
        
    }

    const dragOver = (e) => {
        e.preventDefault();
        if(!e.target.firstChild) {
            e.target.classList.add('drag-over-safe');
        } else {
            e.target.classList.add('drag-over-unsafe');
        }
    }

    const dragLeave = (e) => {
        e.preventDefault();
        e.target.classList.remove('drag-over-safe');
        e.target.classList.remove('drag-over-unsafe');
    }

    const drop = (e) => {
        e.preventDefault();
        e.target.classList.remove('drag-over-safe');
        e.target.classList.remove('drag-over-unsafe');

        // Check if a child is already appended
        if(!e.target.firstChild) {
            // get the draggable element
            const id = e.dataTransfer.getData('text/plain');
            const draggable = document.getElementById(id);

            // Clone the element
            const clonedElement = draggable.cloneNode(true);
            clonedElement.id = `draggable-${draggables.length + 1}`;
            clonedElement.addEventListener('dragstart', dragStart);
            
            // add it to the drop target
            e.target.appendChild(clonedElement);
        }

        
        
    }

    droppables.forEach(droppable => {
        droppable.addEventListener('dragenter', dragEnter);
        droppable.addEventListener('dragover', dragOver);
        droppable.addEventListener('dragleave', dragLeave);
        droppable.addEventListener('drop', drop);
    })
    

    // let draggedElement = null;

    // const handleMouseDown = (e, draggable) => {
    //     // Create a copy of the div
    //     console.log(draggable);
    //     draggedElement = draggable.cloneNode(true);
    //     draggedElement.style.position = 'absolute';
    //     draggedElement.style.zIndex = '1000';
    //     draggedElement.className = 'draggable';
    //     draggedElement.id = "draggable-" + (draggables.length + 1);

    //     document.body.appendChild(draggedElement);

    //     moveAt(e.pageX, e.pageY);

    //     // Attach mousemove listener to move the copy
    //     function moveAt(pageX, pageY) {
    //         draggedElement.style.left = pageX - draggedElement.offsetWidth / 2 + 'px';
    //         draggedElement.style.top = pageY - draggedElement.offsetHeight / 2 + 'px';
    //     }

    //     function onMouseMove(event) {
    //         moveAt(event.pageX, event.pageY);
    //     }

    //     document.addEventListener('mousemove', onMouseMove);

    //     document.addEventListener('mouseup', function onMouseUp(event) {
    //         document.removeEventListener('mousemove', onMouseMove);

    //         const acceptorRect = acceptor.getBoundingClientRect();
    //         const draggedRect = draggedElement.getBoundingClientRect();

    //         if (
    //             draggedRect.bottom > acceptorRect.top &&
    //             draggedRect.top < acceptorRect.bottom &&
    //             draggedRect.right > acceptorRect.left &&
    //             draggedRect.left < acceptorRect.right
    //         ) {
    //             acceptor.appendChild(draggedElement);
    //             //draggedElement.style.position = 'block'; // align within acceptor
    //             console.log(draggedRect.left);
    //             console.log(acceptorRect.left);
    //             //draggedElement.style.left = (draggedRect.left - acceptorRect.left) + 'px';
    //             //draggedElement.style.top = (draggedRect.top - acceptorRect.top) + 'px';
    //         } else {
    //             draggedElement.remove();
    //         }
    //         //draggedElement = null;
    //         document.removeEventListener('mouseup', onMouseUp);
    //     });
    // }

    // draggables.forEach(draggable => {

    //     draggable.addEventListener('mousedown', (e) => handleMouseDown(e, draggable));

    //     // draggable.addEventListener('mousedown', (e) => {
            
    //     // });
    // });
});