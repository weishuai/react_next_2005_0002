
import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';

export const FileUploadDemo = () => {
    const [totalSize, setTotalSize] = useState(0);
    const toast = useRef(null);
    const fileUploadRef = useRef(null);

    const onUpload = () => {
        console.info('上传之中。。。。。。');
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }


    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    }


    const onBasicUpload = () => {
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
    }

    const onBasicUploadAuto = () => {
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
    }



    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)'}}></i>
                <span style={{'fontSize': '1.2em', color: 'var(--text-color-secondary)'}} className="my-5">Drag and Drop Image Here</span>
            </div>
        )
    }

    const chooseOptions = {icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined'};
    const uploadOptions = {icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'};
    const cancelOptions = {icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};

    return (
        <div>
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn"   content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn"   content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn"   content="Clear" position="bottom" />

            <div className="card">
                <h5>Advanced</h5>
                <FileUpload name="pic" url="http://127.0.0.1:3009/uploadmany/doAdd" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000}
                   emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />

                <h5>Basic</h5>
                <FileUpload mode="basic"  name="pic" url="http://127.0.0.1:3009/upload/doAdd" accept="image/*" maxFileSize={1000000} onUpload={onBasicUpload} />

                <h5>Basic with Auto</h5>
                <FileUpload mode="basic"  name="pic" url="http://127.0.0.1:3009/upload/doAdd" accept="image/*" maxFileSize={1000000} onUpload={onBasicUploadAuto} auto chooseLabel="Browse" />
            </div>
        </div>
    )
}
                 