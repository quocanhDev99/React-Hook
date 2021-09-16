import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

PostFilterForms.propTypes = {
    onSubmit: PropTypes.func,
};

PostFilterForms.defaultProps = {
    onSubmit: null,
}

function PostFilterForms(props) {

    const {onSubmit} = props
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimeOutRef = useRef(null);

    function handleSearchTerm(e) {
        const value = e.target.value;
        setSearchTerm(value);
        
        if(!onSubmit) return;

        // SET -- 100 -- CLEAR, SET -- 300 --> SUBMIT
        if(typingTimeOutRef.current){
            clearTimeout(typingTimeOutRef.current);
        };

        typingTimeOutRef.current = setTimeout(() => {
            const formValues = {
                searchTerm: value,
            };
            onSubmit(formValues);
        }, 300);   
    }

    return (
        <form>
            <input 
                type="text" 
                value={searchTerm} 
                onChange={handleSearchTerm}
            />
        </form>
    );
}

export default PostFilterForms;