import { useEffect, useState } from "react";
import axios from 'axios';
import Table from "./Table";
import { Container, TextInput, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

function Analysis() {
    const [elem, setElem] = useState({});
    const [keywords, setKeys] = useState("");
    const [headers, setHeaders] = useState([]);
    async function submitHandler(e) {
        e.preventDefault();
        const url = "http://127.0.0.1:6500/analyze/";
        await axios({
            method: 'GET',
            //`https://nivas1.pythonanywhere.com/?url=${url}`
            url: url + `?query=${keywords}`,
            timeout: 120000
        }).then((data) => {
            console.log(data);
            setHeaders(data.data.params);
            setElem(data.data.papers);
        })
        // console.log(elem);

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
            {
                headers.length !== 0 ?<Table headers={headers} elements={elem} /> : null
            }
            
        </Container>
    );
}

export default Analysis;