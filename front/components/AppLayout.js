import React from 'react';
import PropTpyes from 'prop-types';

const AppLayout = ({children}) => {
    return (
    <div>
        <div>공통메뉴</div>
        {children}
    </div>)
}
AppLayout.prototype = {
    children: PropTpyes.node.isRequired,

};

export default AppLayout;