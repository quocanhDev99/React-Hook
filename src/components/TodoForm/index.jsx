import React, {useState} from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onsubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onsubmit:null,
}

function TodoForm(props) {
    
    const {onsubmit} = props;
    const [value, setValue] = useState('');

    function handleValueChange(e) {
        console.log(e.target.value);
        setValue(e.target.value);
    }

    function handleSubmit(e) {
        // Prevent reloading browser
        e.preventDefault();
        if(!onsubmit) return;

        const formValue = {
            title: value,
        };
        onsubmit(formValue);

        // Reset form
        setValue('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={value} 
                onChange={handleValueChange}
            />
        </form>
    );
}

export default TodoForm;