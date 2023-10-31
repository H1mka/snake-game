import PropType from 'prop-types';

import './Overlay.scss';

const Overlay = ({ children }) => {
    return (
        <>
            <div className='overlay'></div>
            {children}
        </>
    );
};

Overlay.propTypes = {
    children: PropType.node,
};

export default Overlay;
