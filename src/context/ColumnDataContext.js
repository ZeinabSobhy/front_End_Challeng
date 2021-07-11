import React, { createContext, useEffect, useState } from 'react'
import axiosInstance from '../services/axiosInstance';


const ColumnsDataContext = createContext([{}, () => { }]);

const ColumnsDataProvider = ({ children }) => {
  const [ChartData, setChartData] = useState([])
  const [loaded, setLoaded] = useState(false)
  
  let data = {}
  if (localStorage.getItem('activDimension') && localStorage.getItem('activMeasure')) {
    data = {
      "dimension": JSON.parse(localStorage.getItem('activDimension'))[0],
      "measures": JSON.parse(localStorage.getItem('activMeasure'))
    }
  }

  useEffect(() => {
    axiosInstance().post('data', data)
      .then(res => {
        setChartData(res.data)
        setLoaded(true)
      }).catch(err => {
        console.log(err)
        setLoaded(false)
      })


  }, [])
  const value = [ChartData, loaded]
  return (
    <ColumnsDataContext.Provider value={value}>
      {children}
    </ColumnsDataContext.Provider>
  );
}

export { ColumnsDataProvider, ColumnsDataContext }

