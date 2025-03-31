
import React from 'react';
import { Chart } from 'primereact/chart';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

const RadarChart = () => {
    const chartData = {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: 'rgba(179,181,198,0.2)',
                borderColor: 'rgba(179,181,198,1)',
                pointBackgroundColor: 'rgba(179,181,198,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                pointBackgroundColor: 'rgba(255,99,132,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(255,99,132,1)',
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    };

    const lightOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            r: {
                pointLabels: {
                    color: '#495057',
                },
                grid: {
                    color: '#ebedef',
                },
                angleLines: {
                    color: '#ebedef'
                }
            }
        }
    };

    return (

                <div>
                                        
                <div className="p-fluid p-formgrid p-grid">

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
                        <div className="card flex justify-content-center">
                        <Chart type="radar" data={chartData} options={lightOptions} style={{ position: 'relative', width: '40%' }} />
                        </div>

                </div>

    );
}
        
export default RadarChart;