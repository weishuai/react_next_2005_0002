// MyTestList.js
import React, { useState,useRef } from 'react';
// import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';


const PdfExporter= () => {

 

    // 更新组件状态
 
  ///导入PDF
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Custom PDF',
  //   pageStyle: `
  //   @page {
  //     size: A4 portrait;
  //     margin: 1cm;
  //   }
  // `,
 // 这里设置为 A4 尺寸
  pageStyle: `
    @page {
      size: 69mm 50mm;  
      // margin: 1cm;
      margin-top: 1.5cm;
      margin-right: 2cm;
      margin-bottom: 1.5cm;
      margin-left: 2cm; 
      
      /* 隐藏页眉和页脚 */
      @top-left {
        content: none;
      }
      @top-center {
        content: none;
      }
      @top-right {
        content: none;
      }
      @bottom-left {
        content: none;
      }
      @bottom-center {
        content: none;
      }
      @bottom-right {
        content: none;
      } 

    }
  `,

    onAfterPrint: () => {
      //alert('PDF generated and downloaded!');
    },
  });

  React.useEffect(() => {
  
  }, []);




  return (
    <div style={{ height: '400px', position: 'relative' }} >
     <div style={{ clear: 'both' }} />
     
      <button onClick={handlePrint}>Export to PDF</button>
       <div ref={componentRef} style={{ color:'blue' }}>
       <div>
      111
       <h1 style={{ color:'blue' }}>Excel Exporter</h1>
       </div>
       <div>
       222
       <h1 style={{ color:'blue' }}>Excel Exporter</h1>
       </div>
       <div>
       333
       <h1 style={{ color:'blue' }}>Excel Exporter</h1>
       </div>
       <div>
       4444
       <h1 style={{ color:'blue' }}>Excel Exporter</h1>
       </div>
       </div>

    </div>
  );
};

export default PdfExporter;


