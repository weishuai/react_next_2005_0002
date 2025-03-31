
import React, { useContext, useEffect, useState,useRef  } from 'react';
import { useReactToPrint } from 'react-to-print';
import {Chart} from 'primereact/chart';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
const FHBarChart = () => {
    const basicData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: '#42A5F5',
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                backgroundColor: '#FFA726',
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };



    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        let horizontalOptions = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        let stackedOptions = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        let multiAxisOptions = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                },
                tooltips: {
                    mode: 'index',
                    intersect: true
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                        color: '#ebedef'
                    },
                    ticks: {
                        min: 0,
                        max: 100,
                        color: '#495057'
                    }
                }
            }
        };

        return {
            basicOptions,
            horizontalOptions,
            stackedOptions,
            multiAxisOptions
        }
    }

    const { basicOptions, horizontalOptions, multiAxisOptions, stackedOptions } = getLightTheme();
  ///导入PDF
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Custom PDF',
    onAfterPrint: () => {
        //alert('PDF generated and downloaded!');
    },
  });
        return (
            <div>
            {/* <button onClick={handlePrint}>Export to PDF</button> */}
            <div height="20px"></div>
             <div ref={componentRef}>
        
          <div className="p-fluid p-formgrid p-grid" >
         
         <table width="98%">
         <thead>
         </thead>
             <tbody>
             <tr>
                <td width="2%"></td>
                 <td width="45%" >
                 <div className="p-field ">
            <label htmlFor="firstname1">客户</label>
            <InputText id="username" />
          </div>
                 </td>
                 <td width="2%">
                 </td>
                 <td width="45%">
                 <div className="p-field">
            <label htmlFor="firstname1">公司</label>
            <InputText id="username"   /> 
          </div>                   
                 </td>
             </tr>
             <tr>
                <td >
                 </td>            
                 <td>
                 <div className="p-field">
            <label htmlFor="firstname1">开始时间</label>
            <Calendar
              placeholder='starts'
            
              onChange={(e) => {
                if (e.value != null) {
                  console.log('e.value' + e.value);
                }
              }}
            />
          </div>
                 </td>
                 <td >
                 </td>
                 <td>
                 <div className="p-field">
            <label htmlFor="firstname1">结束时间</label>
            <Calendar
              placeholder='ends'
              onChange={(e) => {
                if (e.value != null) {
                  console.log('e.value' + e.value);
                }
              }}
            />
          </div>
          </td>
             </tr>             
        </tbody>
        </table>
        <hr></hr>
          </div>
                <div className="card">          
                    <Chart type="bar" data={basicData} options={horizontalOptions} />
                </div>
            </div>
            </div>
        );
    }


export default FHBarChart;