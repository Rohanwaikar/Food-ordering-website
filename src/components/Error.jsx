
export default function Error({ title, message }) {  // Error component to display error messages
    return(
        <div className="error"> {/* Container for the error message */}
            <h2>{title}</h2>  {/* Display the error title */}
            <p>{message}</p>  {/* Display the error message */}
        </div>
    );
}