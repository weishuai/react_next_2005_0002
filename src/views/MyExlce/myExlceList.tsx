// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';

// const ExcelImporter = () => {
//   const [excelData, setExcelData] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const data = e.target.result;
//       const workbook = XLSX.read(data, { type: 'binary' });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const dataFromSheet = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//       setExcelData(dataFromSheet);
//     };
//     reader.readAsBinaryString(file);
//   };

//   return (
//     <div>
//       <h1>Excel Importer</h1>
//       <input type="file" accept=".xlsx" onChange={handleFileChange} />
//       {excelData && (
//         <table>
//           <thead>
//             <tr>
//               {excelData[0].map((cell, index) => <th key={index}>{cell}</th>)}
//             </tr>
//           </thead>
//           <tbody>
//             {excelData.slice(1).map((row, index) => (
//               <tr key={index}>
//                 {row.map((cell, index) => <td key={index}>{cell}</td>)}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ExcelImporter;
import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelExporter = () => {
  const [data, setData] = useState([
    ['Name', 'Age', 'Gender'],
    ['John', 25, 'Male'],
    ['Jane', 30, 'Female'],
    ['Bob', 35, 'Male'],
  ]);

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'data.xlsx');
  };

  return (
    <div>
       <button onClick={handleExport}>Export to Excel</button>
      <h1>Excel Exporter</h1>
     
    </div>
  );
};

export default ExcelExporter;
