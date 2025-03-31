import React from 'react';
import HtmlDocx from 'html-docx-js/dist/html-docx';

class WordExporter extends React.Component {
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
  }

  handleExportClick = () => {
    const content = this.componentRef.current.innerHTML;
    const converted = HtmlDocx.asBlob(content);

    const url = URL.createObjectURL(converted);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'exported-content.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  render() {
    return (
      <div>
        <button onClick={this.handleExportClick}>Export to Word</button>
        <div ref={this.componentRef} style={{ color:'blue' }}>
        
        <div style={{ color:'blue' }}>999999</div>
        <h1 style={{ color:'blue' }}>Excel Exporter</h1>
         
        </div>
      </div>
    );
  }
}

export default WordExporter;
