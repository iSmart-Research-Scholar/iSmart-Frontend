import React, { useState } from "react";
import { PickerOverlay } from "filestack-react";
import axios from "axios";

function DocumentForm() {
    const [summary, setSummary] = useState("");
    // const [url, setUrl] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);
    console.log(isUploaded);
    async function getSummary(url) {
        
        console.log("In Summary", "https://isummarizer.herokuapp.com/summarize/?url="+url);
        // if(url!=="")
        await axios({
            method: "GET",
            url: `https://isummarizer.herokuapp.com/summarize/?url=${url}`,
            timeout: 40000,
        })
            .then((data) => {
                console.log(data.data.summary);
                setSummary(data.data.summary);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div>
            {isUploaded ? null : (
                <PickerOverlay
                    apikey={"AO72ws0hXQwinkoUdOPDOz"}
                    onUploadDone={(res) => {
                        console.log(res.filesUploaded[0].url);
                        // setUrl(res.filesUploaded[0].url);
                        setIsUploaded(true);
                        getSummary(res.filesUploaded[0].url);
                    }}
                />
            )}
            <h4>Summary :</h4>
            {summary ? summary : null}
        </div>
    );
}

export default DocumentForm;
