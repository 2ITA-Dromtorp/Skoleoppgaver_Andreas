import React, { createContext, useState, useContext } from 'react';

const BulletAmountContext = createContext({});
const BulletAmountProvider = ({ children }) => {
    const [bulletAmount, setBulletAmount] = useState("");
    return (
        <BulletAmountContext.Provider value={{bulletAmount, setBulletAmount}}>
            {children}
        </BulletAmountContext.Provider>
    );
};



export { BulletAmountContext, BulletAmountProvider};