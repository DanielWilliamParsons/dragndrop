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
        e.dataTransfer.setData('targetId', e.target.id);

        // Passing the parent node classname allows us to track
        // whether the draggable is coming OUT of a droppable or not
        e.dataTransfer.setData('targetParentClass', e.target.parentNode.className);
        e.dataTransfer.setData('targetParentId', e.target.parentNode.id);
        
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

        /**
         * CHECK if a child is already appended to the droppable element.
         * If not, carry out actions to append the draggable to the droppable.
         */
        if(!e.target.firstChild) {
            // get the draggable element
            const id = e.dataTransfer.getData('targetId');
            const draggable = document.getElementById(id);

            /**
             * REMOVE ORIGINAL ELEMENT FROM ITS PARENT IF IS WAS IN A DROPPABLE
             * To remove a draggable from a droppable element
             * before we drop it, check that the draggable is not a child
             * of a droppable by using the data that was transfered
             * If it is a child of a droppable element, remove it from
             * its parent when dropped.
             */
            const originalParentId = e.dataTransfer.getData('targetParentId');
            const originalParent = document.getElementById(originalParentId);
            if (originalParent && originalParent.classList.contains('droppable')) {
                originalParent.removeChild(draggable);
            }

            /**
             * CLONE the element so that it can be appended to the droppable.
             * Add to the draggables array to make sure that ids are correctly updated.
             */
            const clonedElement = draggable.cloneNode(true);
            clonedElement.id = `draggable-${draggables.length + 1}`;
            draggables.push(clonedElement);
            clonedElement.addEventListener('dragstart', dragStart);
            e.target.appendChild(clonedElement);
        }

        
        
    }

    droppables.forEach(droppable => {
        droppable.addEventListener('dragenter', dragEnter);
        droppable.addEventListener('dragover', dragOver);
        droppable.addEventListener('dragleave', dragLeave);
        droppable.addEventListener('drop', drop);
    });

    //document.body.addEventListener('drop', drop);
    

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