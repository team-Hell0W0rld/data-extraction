import styles from './DropZone.module.css'

import { useCallback } from "react";
import {useDropzone} from 'react-dropzone'

const DropZone = ({type, addFiles}) => {
    let accept;
    if(type=='pdf')
        accept = {'application/pdf':[]}
    else
        accept = {'image/*': []}

    const onDrop = useCallback(addFiles,[]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept});
    return (
        <div {...getRootProps()} className={styles.Container}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
};

export default DropZone;