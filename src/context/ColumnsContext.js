import React, { createContext, useEffect, useState } from 'react'
import axiosInstance from '../services/axiosInstance';


const ColumnsContext = createContext([{}, () => { }]);

const ColumnsProvider = ({ children }) => {
    const [Columns, setColumns] = useState([]) 

    useEffect(() => {
        axiosInstance().get('columns')
            .then(res => {
                setColumns(res.data)
            }).catch(err =>
                console.log(err)
            )
    }, [])
    return (
        <ColumnsContext.Provider value={Columns}>
            {children}
        </ColumnsContext.Provider>
    );
}

export { ColumnsProvider, ColumnsContext }

