// MyTestList.js
import React, { useState,useRef } from 'react';
// import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import DraggableComponent from './DraggableComponent';

const MyTestList = () => {
  const [components, setComponents] = useState([
    { id: 'component1', content: 'component1', position: { x: 50, y: 50 } },
    // { id: 'component2', content: 'Component 2', position: { x: 50, y: 100 } },
    // { id: 'component3', content: 'Component 3', position: { x: 50, y: 150 } },
  ]);

  const handleDrop = (id) => {
    // 找到被拖动的组件
    const draggedComponent = components.find((component) => component.id === id);
    // 找到被拖动组件的索引
    const draggedIndex = components.findIndex((component) => component.id === id);

    // 更新组件的顺序
    const updatedComponents = [...components];
    updatedComponents.splice(draggedIndex, 1); // 先删除被拖动的组件
    updatedComponents.push(draggedComponent); // 再将被拖动的组件添加到末尾

    // 更新每个组件的位置
    const numberedComponents = updatedComponents.map((component, index) => ({
      ...component,
      position: {
        x: 50,
        y: 50,
      },
    }));

    // 更新组件状态
    setComponents(numberedComponents);
  };
  const handleAddComponent = () => {
    const newComponent = {
      id: `component${components.length + 1}`,
      content: `component${components.length + 1}`,
      position: { x:50, y: 50 },
    };
    setComponents([...components, newComponent]);

    
  };

  const handleAddComponent_show = () => {
    console.info('mycomponents:'+JSON.stringify(components)); 

  };
  const handleITEMSComponent_show = () => {
    console.info('childCoordinates:'+JSON.stringify(childCoordinates)); 

  };
  const handleFHITEMSComponent_show = () => {
    console.info('FHchildCoordinates:'+JSON.stringify(fhchildCoordinates)); 

  };
  
  
  ///导入PDF
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Custom PDF',
    onAfterPrint: () => {
      //alert('PDF generated and downloaded!');
    },
  });

  React.useEffect(() => {
  
  }, []);
  const [mypositionx, setmypositionx] = useState(0);
  const [mypositiony, setmypositiony] = useState(0);
  const [myid, setmyid] = useState("component1");
  const [childCoordinates, setChildCoordinates] = useState({});
  const updateChildCoordinates = (childId, coordinates) => {
    setChildCoordinates({
      ...childCoordinates,
      [childId]: coordinates
    });
  };

  const [fhchildCoordinates, setfhChildCoordinates] = useState({});
  const updatefhChildCoordinates = (childId, coordinates) => {
    setfhChildCoordinates({
      ...fhchildCoordinates,
      [childId]: coordinates
    });
  };


//  let  mypositionx=0;
//  let  mypositiony=0;

  return (
    <div style={{ height: '400px', position: 'relative' }} >
       <div ref={componentRef}>
      {components.map((component) => (
        <DraggableComponent
          key={component.id}
          id={component.id}
          FHonChange={(id,mypositionx,mypositiony) => {
            //console.log('e_ok:' +JSON.stringify(e));
            updateChildCoordinates(id,{mypositionx,mypositiony});
            setmypositionx(mypositionx);
            setmypositiony(mypositiony);
          }}

          FHonChangeOK={(id,mypositionx,mypositiony) => {
            //console.log('e_ok:' +JSON.stringify(e));
            updatefhChildCoordinates(id,{mypositionx,mypositiony});
            // setmypositionx(mypositionx);
            // setmypositiony(mypositiony);
          }}

          // content={`${component.content}-${myid}- 位置: (${mypositionx}, ${mypositiony})`}
          
          initialPosition={component.position}
        />
      ))}
       </div>
      <div style={{ clear: 'both' }} />
      <button onClick={handleAddComponent}>Add Component</button>
      {/* <span>|</span>
      <button onClick={handleAddComponent_show}>Show Component</button> */}
      <span>|</span>
      <button onClick={handleITEMSComponent_show}>所有项目</button>
      <span>|</span>
      <button onClick={handleFHITEMSComponent_show}>隐藏项目</button>   
      <span>|</span>
      <button onClick={handlePrint}>Export to PDF</button>
    </div>
  );
};

export default MyTestList;
