import React, { useState } from "react";
import { Container, Center, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import List from "./List";
import { IconSearch } from "@tabler/icons";
import axios from "axios";
import test from "../test.json";

function KeywordForm() {
    const [keys, setKeys] = useState("");
    const [data, setData] = useState({});
    const [active, setActive] = useState(false);
    async function submitHandler(e) {
        e.preventDefault();
        // satyam api
        await axios({
            method: "GET",
            url:
                "https://ismartranker.herokuapp.com/search/?search_query=" +
                keys,
        }).then((data) => {
            setData(data.data);
            setActive(true);
        });
    }

    return (
        <Container size="xl">
            <form onSubmit={submitHandler}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "2.1%",
                    }}
                >
                    <TextInput
                        placeholder="Enter Keywords"
                        icon={<IconSearch size={18} />}
                        size="lg"
                        style={{ width: 700 }}
                        onChange={(e) => setKeys(e.target.value)}
                    />
                    <Button type="submit" style={{ marginLeft: "3%" }}>
                        Submit
                    </Button>
                </div>
            </form>
            {active ? <List keywords={keys} data={data} /> : null}
        </Container>
    );
}

export default KeywordForm;
