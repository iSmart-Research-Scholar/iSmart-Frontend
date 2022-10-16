import React, { useState } from "react";
import { Container, TextInput, Button } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import List from "./List";
import { IconSearch } from "@tabler/icons";
import axios from "axios";
// import test from "../test.json";

function KeywordForm() {
    const [keys, setKeys] = useState("");
    const [data, setData] = useState({});
    const [active, setActive] = useState(false);
    const [value, toggle] = useToggle(["True", "False"]);
    const [value1, toggle1] = useToggle(["True", "False"]);

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
        await axios({
            method: "GET",
            url: `https://semantic-scholar-data-ranking.herokuapp.com/?keywords=${keys}&recent=${value}&citation_weight=${value1}`,
            timeout: 120000,
        })
            .then((res) => {
                setData(res.data);
                setActive(true);
            })
            .catch((err) => console.log(err));
        console.log("Done");
    }

    return (
        <Container size="xl">
            <form onSubmit={submitHandler}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        marginLeft: "2.1%",
                    }}
                >
                    <div style={{display: "flex", alignItems: "center"}}>
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
                </div>
            </form>
            {active ? <List keywords={keys} data={data} /> : null}
        </Container>
    );
}

export default KeywordForm;
