import { useRef } from "react";
import { createPortal } from "react-dom";
import { useEffect } from "react";  
export default function Modal({children, onClose, open, className = ''}) {  // Modal component to display content in a dialog box
    // This component uses a dialog element to create a modal that can be opened and closed.
    // It uses the createPortal function from react-dom to render the dialog in a specific part of the DOM.
    // The component accepts children to display inside the modal, an onClose function to handle closing the modal,
    // an open boolean to control the visibility of the modal, and an optional className for styling.
    const dialog = useRef();    // Create a ref to access the dialog element
    // The dialog ref is used to control the modal's visibility and to call the showModal and close methods on the dialog element.
    // The useRef hook is used to create a mutable object that persists for the lifetime of the component.
    // The useRef hook is used to create a reference to the dialog element, allowing direct manipulation of the DOM element.
    useEffect(() => {  // useEffect hook to handle the modal's visibility based on the open prop
        // The useEffect hook is used to perform side effects in function components, such as manipulating the DOM.
        // The effect runs whenever the open prop changes, showing or closing the dialog accordingly.
        // The effect runs when the component mounts and whenever the open prop changes.
        if (open) {   // If the open prop is true, show the modal
            dialog.current.showModal();  // Call the showModal method on the dialog element to display the modal
        }  
        return () => {   // Cleanup function to close the modal when the component unmounts or when open changes to false
            if (dialog.current) {   // Check if the dialog ref is set before calling close
                dialog.current.close();  // Call the close method on the dialog element to hide the modal
            }
        };

    }, [open]);  // The effect depends on the open prop, so it will run whenever open changes.
    return(
        createPortal(   // createPortal is used to render the modal in a different part of the DOM tree
            <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>{children}</dialog>,  // Render the dialog element with the ref, className, and children
            document.getElementById("modal")   // The modal is rendered into a specific DOM element with the id "modal" to ensure it appears above other content on the page.
        )
    );
}