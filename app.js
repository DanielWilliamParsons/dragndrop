window.addEventListener('load', () => {

    const draggables = Array.from(document.querySelectorAll('.draggable'));
    const acceptor = document.querySelector('#acceptor');

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
        e.target.classList.add('drag-over');
    }

    const dragOver = (e) => {
        e.preventDefault();
        e.target.classList.add('drag-over');
    }

    const dragLeave = (e) => {
        e.preventDefault();
        e.target.classList.remove('drag-over');
    }

    const drop = (e) => {
        e.preventDefault();
        e.target.classList.remove('drag-over');

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

    acceptor.addEventListener('dragenter', dragEnter);
    acceptor.addEventListener('dragover', dragOver);
    acceptor.addEventListener('dragleave', dragLeave);
    acceptor.addEventListener('drop', drop);

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