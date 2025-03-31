import React from 'react';
import { Chart } from 'primereact/chart';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

const FHPolarAreaChart = () => {
    const chartData = {
        datasets: [{
            data: [
                11,
                16,
                7,
                3,
                14
            ],
            backgroundColor: [
                "#42A5F5",
                "#66BB6A",
                "#FFA726",
                "#26C6DA",
                "#7E57C2"
            ],
            label: 'My dataset'
        }],
        labels: [
            "Red",
            "Green",
            "Yellow",
            "Grey",
            "Blue"
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
                <div className="card flex justify-content-center">
                        <Chart type="polarArea" data={chartData} options={Option} style={{ position: 'relative', width: '40%' }} />
                    </div>


            </div>


    );
}
export default FHPolarAreaChart;