import React, {useState, useEffect} from 'react';
import { PickerOverlay } from "filestack-react";
import axios from "axios";

function ImageForm() {
    const [data, setData] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);
    const [keywords, setKeywords] = useState("");

    async function getData(url) {
        console.log(url);
        const data = await axios({
            method: "GET",
            url: `https://nivas1.pythonanywhere.com/?url=${url}`,
            timeout: 120000
        });
        setKeywords(data.text);
        console.log(data);
    }

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
            <h4>Data :</h4>
        { null}
        </div>
    );
}

export default ImageForm;
