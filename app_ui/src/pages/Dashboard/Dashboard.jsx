import styles from './Dashboard.module.css'

import Modal from '../../components/Modal/Modal'
import InputBox from '../../components/InputBox/InputBox'
import Button from '../../components/Button/Button'
import DropZone from '../../components/DropZone/DropZone'
import Document from '../../components/Document/Document'

import axios from '../../baseAxios';

import { useEffect, useState } from 'react';

const Dashboard = () => {
    const [user, changeUser] = useState({});
    const [document, setDocument]=useState([]);
    const [modal, displayModal] = useState(false);

    useEffect( () => {
        (async () =>{
            const res=await axios.get('/api/users');
            changeUser(res.data.user);
        })();
    }, []);

    const addFile = (acceptedFile) => {
        document.push(acceptedFile[0]);
        const documents = document;
        setDocument(documents);
        console.log(documents)
    };

    const saveFile = async () => {
        if(document[0].mimetype==="application/pdf"){
            setDocument()
        }

        const data = new FormData();
        document.forEach(file => {
            data.append("images", file);
        });

        try{
            const res = await axios.post('/api/users/addDocument', data);
            console.log(res);
        }catch(err){
            console.log(err);
        }       
    }

    return (
        <div className={styles.Container}>
            <div className={styles.Header}>
                <h1>{`Welcome, ${user.name}`}</h1>
                <button className={styles.logOut}>Log out</button>
            </div>

            <Modal modal={modal} hideModal={() => displayModal(false)}>
                <div className={styles.modal}>
                    <div style={{display:"flex"}}>
                        <InputBox></InputBox>
                    </div>
                    <DropZone addFiles={addFile}></DropZone>
                    <div style={{display:"flex"}}>
                        <Button style={{width:"150px", backgroundColor:"#00ab41"}} text="Save" onClick={saveFile}></Button>
                        <Button style={{width:"150px", backgroundColor:"#ff2c2c"}} text="Discard"  onClick={(e) => {displayModal(false)}}></Button>
                    </div>
                </div>
            </Modal>
            
            <div className={styles.documents}>
                {
                    user.document?user.documents.map(el => {
                        return <Document image={"image"} text={el.name}></Document>
                    }):null
                }
                <Document image={"image"} text="Add new document." handleClick={e => displayModal(true)}></Document>
            </div>
        </div>
    )
}

export default Dashboard