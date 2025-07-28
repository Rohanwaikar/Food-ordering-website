export default function Input({label, id, ...props}){  // Input component to render a label and an input field
    return(
        <p className="control"> 
            <label htmlFor={id}>{label}</label>  {/* Label for the input field */}
            <input id={id} name={id} required {...props} />  {/* Input field with id and name set to the id prop, and other props spread onto it */}
            {/* The input field is required, meaning it must be filled out before form submission */}
        </p>
    );
}