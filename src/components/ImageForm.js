import React, {useState, useEffect} from 'react';
import { PickerOverlay } from "filestack-react";
import axios from "axios";
import List from './List';
import { Notification } from '@mantine/core';

function ImageForm() {
    const [data, setData] = useState("");
    const [listdata, setListData] = useState({});
    const [isUploaded, setIsUploaded] = useState(false);
    const [keywords, setKeywords] = useState("");
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);

    async function getData(url) {
        console.log(url);
        const data = await axios({
            method: "GET",
            url: `https://nivas1.pythonanywhere.com/?url=${url}`,
            timeout: 120000
        });
        setKeywords(data.data.text);
        console.log(data);
    }

    useEffect(() => {
        async function submitHandler() {
            console.log("Submitting ...");
            setLoading(true);
            await axios({
                method: "GET",
                url: `http://127.0.0.1:8000/?keywords=${keywords}&recent=${"False"}&citation_weight=${"False"}&factor=${"paperScore"}`,
                timeout: 120000,
            })
                .then((res) => {
                    setListData(res.data);
                    setActive(true);
                })
                .catch((err) => console.log(err));
            setLoading(false);
            console.log("Done");
        }
        submitHandler();
    }, [keywords])
    
    return (
        <div>
            {isUploaded ? null : (
                <PickerOverlay
                    apikey={process.env.REACT_APP_FILESTACK_API_KEY}
                    onUploadDone={(res) => {
                        console.log(res.filesUploaded[0].url);
                        setIsUploaded(true);
                        getData(res.filesUploaded[0].url);
                    }}
                />
            )}
        {
            active ?
            <List keywords={keywords} data={listdata} /> :
            loading ?
            <div style={{ height: '100%', width: '100%', diplay: "flex", justifyContent: "center", alignItems: "center" }}>
                {/* <div style={{ position: 'relative', top: '10%', left: "45%" }} className="lds-hourglass"></div> */}
                <Notification
                    style={{width: 'fit-content', height: 'fit-content', position: 'absolute', bottom: '10px', right: '10px'}}
                    loading
                    title="Uploading data to the server"
                    disallowClose
                >
                    Please wait until data is uploaded, you cannot close this notification yet
                </Notification>
            </div> :
            null
            }
        
        
        </div>
    );
}

export default ImageForm;
