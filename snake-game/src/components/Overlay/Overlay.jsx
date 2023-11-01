import PropType from 'prop-types';

import './Overlay.scss';

const Overlay = ({ children }) => {
    return (
        <>
            <div className='overlay'>{children}</div>
        </>
    );
};

Overlay.propTypes = {
    children: PropType.node,
};

export default Overlay;
