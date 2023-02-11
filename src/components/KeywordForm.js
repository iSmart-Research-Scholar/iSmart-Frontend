import React, { useState } from "react";
import { Container, TextInput, Button, Radio, Notification } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import List from "./List";
import { IconSearch } from "@tabler/icons";
import axios from "axios";
// import "./css/KeywordForm.css";
// import test from "../test.json";

function KeywordForm() {
    const [keys, setKeys] = useState("");
    const [data, setData] = useState({});
    const [active, setActive] = useState(false);
    const [value, toggle] = useToggle(["True", "False"]);
    const [value1, toggle1] = useToggle(["True", "False"]);
    const [sorter, setSorter] = useState("paperScore");
    const [loading, setLoading] = useState(false);
    async function submitHandler(e) {
        // e.preventDefault();
        // // satyam api
        // await axios({
        //     method: "GET",
        //     url:
        //         "https://ismartranker.herokuapp.com/search/?search_query=" +
        //         keys,
        // }).then((data) => {
        //     setData(data.data);
        //     setActive(true);
        // });
        e.preventDefault();
        console.log("Submitting ...");
        setLoading(true);
        await axios({
            method: "GET",
            url: `http://127.0.0.1:8000/?keywords=${keys}&recent=${value}&citation_weight=${value1}&factor=${sorter}`,
            timeout: 120000,
        })
            .then((res) => {
                setData(res.data);
                setActive(true);
            })
            .catch((err) => console.log(err));
        setLoading(false);
        console.log("Done");
    }
    // 10.14.2.133
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
                    {/* do you want recent research papers? are you interested more in citations than content? */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            width: "70%",
                            justifyContent: "flex-start",
                        }}
                    >
                        <h4>Do you want Recent Research Documents?</h4>
                        <Button
                            style={{ marginLeft: "2%" }}
                            onClick={() => toggle()}
                        >
                            {value === "True" ? "True" : "False"}
                        </Button>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            width: "70%",
                            justifyContent: "flex-start",
                        }}
                    >
                        <h4>
                            Are you more interested in citations that content?
                        </h4>
                        <Button
                            onClick={() => toggle1()}
                            style={{ marginLeft: "2%" }}
                        >
                            {value1 === "True" ? "True" : "False"}
                        </Button>
                    </div>
                    <div style={{ width: "70%" }}>
                        <Radio.Group
                            name="sort"
                            label="Sort By : "
                            value={sorter}
                            onChange={setSorter}
                            size="md"
                            style={{ width: "100%" }}
                        >
                            <Radio value="citing_paper_count" label="Sort By Citations" />
                            <Radio value="publication_year" label="Sort By Publication Year" />
                            <Radio value="paperScore" label="Relevance" />
                        </Radio.Group>
                    </div>
                </div>
            </form>
            {
                active ?
                    <List keywords={keys} data={data} /> :
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

export default KeywordForm;
