import axios from 'axios';
import { Container, TextInput, Button, Notification } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import React, { useState, useEffect } from 'react';
import { useToggle } from "@mantine/hooks";
import List from './List';

function Clustering() {
    const [keys, setKeys] = useState("");
    const [data, setData] = useState({});
    const [active, setActive] = useState(false);
    const [value, toggle] = useToggle(["True", "False"]);
    const [value1, toggle1] = useToggle(["True", "False"]);
    const [sorter, setSorter] = useState("paperScore");
    const [loading, setLoading] = useState(false);
    const [selector, setSelector] = useState({});
    const [clusterselect, setClusterSelect] = useState(0);

    
    async function submitHandler(e) {
        e.preventDefault();
        console.log("Submitting ...");
        setLoading(true);

        await axios({
            method: "GET",
            url: `http://127.0.0.1:10000/?keywords=${keys}&recent=${value}&citation_weight=${value1}&factor=${sorter}`,
            timeout: 120000,
        }).then((res) => {
            console.log(res);
            setData(res.data);
            setActive(true);
            console.log(res.data["0"])
        }).catch((err) => console.log(err));

        setLoading(false);
        console.log("Done");
    }
    

    return (
        <Container size="xl" style={{ height: '100%', width: '100%' }} >
            <form onSubmit={submitHandler}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        marginLeft: "2.1%",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <TextInput
                            placeholder="Enter Keywords"
                            icon={<IconSearch size={18} />}
                            size="lg"
                            style={{ width: 700 }}
                            onChange={(e) => setKeys(e.target.value)}
                        />
                        <Button
                            type="submit"
                            style={{ marginLeft: "3%", marginRight: "2%" }}
                        >
                            Submit
                        </Button>
                    </div>
                    
                </div>
            </form>
            <div style={{
                marginTop: '15px',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center'
            }}>
                <Button style={{
                    width: '20%',
                    borderRadius: '8px 0 0 8px'
                }}
                onClick={() => setClusterSelect(0)}
                >Cluster 1</Button>
                <Button style={{
                    width: '20%',
                    borderRadius: '0'
                }}
                onClick={() => setClusterSelect(1)}
                >Cluster 2</Button>
                <Button style={{
                    width: '20%',
                    borderRadius: '0'
                }}
                onClick={() => setClusterSelect(2)}
                >Cluster 3</Button>
                {/* <Button style={{
                    width: '20%',
                    borderRadius: '0'
                }}
                onClick={() => setClusterSelect(3)}
                >Cluster 4</Button>
                <Button style={{
                    width: '20%',
                    borderRadius: '0 8px 8px 0'
                }}
                onClick={() => setClusterSelect(4)}
                >Cluster 5</Button> */}
            </div>
            {
                active ?
                    <List keywords={keys} data={data[`${clusterselect}`]} /> :
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
                        null}
        </Container>
    );
}

export default Clustering;