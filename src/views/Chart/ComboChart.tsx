
import React from 'react';
import { Chart } from 'primereact/chart';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

const ComboChart = () => {
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            type: 'line',
            label: 'Dataset 1',
            borderColor: '#42A5F5',
            borderWidth: 2,
            fill: false,
            tension: .4,
            data: [
                50,
                25,
                12,
                48,
                56,
                76,
                42
            ]
        }, {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: '#66BB6A',
            data: [
                21,
                84,
                24,
                75,
                37,
                65,
                34
            ],
            borderColor: 'white',
            borderWidth: 2
        }, {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: '#FFA726',
            data: [
                41,
                52,
                24,
                74,
                23,
                21,
                32
            ]
        }]
    };

    const lightOptions = {
        maintainAspectRatio: false,
        aspectRatio: .6,
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
                    <div className="card">
                            <Chart type="bar" data={chartData} options={lightOptions} />
                        </div>
                </div>


    )
}
export default ComboChart;                