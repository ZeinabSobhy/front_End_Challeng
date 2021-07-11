import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import './components/style.css'
import { Chart } from 'primereact/chart';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Box from "./components/Box";
import Dustbin from "./components/Dustbin";
import { ColumnsContext } from "./context/ColumnsContext";
import { ColumnsDataContext } from "./context/ColumnDataContext";


function App() {
  const Columns = useContext(ColumnsContext)
  // const setActiveDimention = useContext(ColumnsContext)
  const [ChartData] = useContext(ColumnsDataContext)
  const loaded = useContext(ColumnsDataContext)

  
  // let dimentions = Columns.filter(col => col.function == "dimension");
  // let measures = Columns.filter(col => col.function == "measure");
  console.log(Columns)
  
  useEffect(() => {
    !window.localStorage.getItem("activMeasure")
    && window.localStorage.setItem("activMeasure", '');
    
    !window.localStorage.getItem("activDimension")
    && window.localStorage.setItem("activDimension", ['']);
  }, [])

  // Chart Data
  let basicData
  if (ChartData.length > 0) {
    basicData = {
      labels: ChartData[0].values,
      datasets: [
        {
          label: ChartData[1].name,
          data: ChartData[1].values,
          fill: false,
          borderColor: '#42A5F5',
          tension: 0
        }

      ]
    };
  }


  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>

        <div className="content d-flex">
          {/* Sidebar  */}
          <div title="sidebar" aria-label="side bar" className="sidebar">
            <h3>Columns</h3>
            <hr></hr>
            {Columns.length > 0
            ?<ul>
              {Columns.map(col => (
                <li><Box name={col.name} function={col.function} ></Box></li>
              ))}
              </ul>
              :<p>Loading Columns...</p> 
              
          }
          </div>
          {/* Main Content  */}
          <div className="main-content">
            {/* Drop Zone */}
            <Dustbin />

            {/* Chart */}
            {loaded[1]
              ? <Chart type="line" data={basicData} />
              : <p className="no-data">No Data Loaded</p>

            }
          </div>
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
