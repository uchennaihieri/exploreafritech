import React from 'react';
import Header from '../components/layout/Header';

const StartupLayout = ({ children }) => (
    <>
        <Header navPosition="right" className="reveal-from-bottom" />
        <main className="site-content">
            {children}
        </main>

    </>
);

export default StartupLayout;  