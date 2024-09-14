window.addEventListener('load', () => {

    const draggables = document.querySelectorAll('.draggable');
    const acceptor = document.getElementById('acceptor');
    let draggedElement = null;

    draggables.forEach(draggable => {

        draggable.addEventListener('mousedown', (e) => {
            // Create a copy of the div
            
            draggedElement = draggable.cloneNode(true);
            draggedElement.style.position = 'absolute';
            draggedElement.style.zIndex = '1000';
            document.body.appendChild(draggedElement);

            moveAt(e.pageX, e.pageY);

            // Attach mousemove listener to move the copy
            function moveAt(pageX, pageY) {
                draggedElement.style.left = pageX - draggedElement.offsetWidth / 2 + 'px';
                draggedElement.style.top = pageY - draggedElement.offsetHeight / 2 + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            document.addEventListener('mouseup', function onMouseUp(event) {
                document.removeEventListener('mousemove', onMouseMove);

                const acceptorRect = acceptor.getBoundingClientRect();
                const draggedRect = draggedElement.getBoundingClientRect();

                if (
                    draggedRect.bottom > acceptorRect.top &&
                    draggedRect.top < acceptorRect.bottom &&
                    draggedRect.right > acceptorRect.left &&
                    draggedRect.left < acceptorRect.right
                ) {
                    acceptor.appendChild(draggedElement);
                    draggedElement.style.position = 'static'; // align within acceptor
                } else {
                    draggedElement.remove();
                }
                draggedElement = null;
                document.removeEventListener('mouseup', onMouseUp);
            });
        });
    });
});