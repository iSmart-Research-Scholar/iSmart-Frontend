import React, { useEffect, useState } from "react";
import { Container, Center, Box, Anchor, Button, Modal } from "@mantine/core";
import { Header } from "@mantine/core";
import axios from "axios";
// import test from "../test.json";

function List(props) {
    const { keywords, data } = props;
    const test = data;
    const papers = test.articles;

    console.log(data)
    useEffect(() => {
        console.log(papers);
    }, [papers]);

    const [globalId, setglobalId] = useState(0);
    const [modal, setModal] = useState({});
    const [opened, setOpened] = useState(false);

    function keyValue(key) {
        setglobalId(key);
        console.log(globalId);
        return getAuthorDetails();
    }

    async function getAuthorDetails(e) {
        // https://author-profiling.herokuapp.com/?author=37283451200&keywords=image%20theory%20analysis%20and%20image
        console.log("Start Profiling");
        await axios({
            method: "GET",
            url: `http://127.0.0.1:8000/?author=${papers[0].authors.authors[globalId].id}&keywords=${keywords}`,
            timeout: 400000,
        }).then((data) => {
            setModal(data.data[0]);
        });
        console.log("End Profiling");
        setOpened(true);
    }
    return (
        <>
            {papers.map((item, key) => {
                return (
                    <Container key={key} style={{ margin: 0 }}>
                        <Box
                            style={{
                                backgroundColor: "white",
                                padding: "12px",
                                borderRadius: "6px",
                                margin: "10px 0 10px 0",
                            }}
                        >
                            <h5>
                                <Anchor
                                    href={`${item.html_url}`}
                                    target="_blank"
                                >
                                    {item.title}
                                </Anchor>
                            </h5>
                            <div>
                                Authors :
                                {item.authors.authors.map((author, key) => {
                                    return (
                                        <>
                                            <Modal
                                                opened={opened}
                                                onClose={() => setOpened(false)}
                                                title="Author Details"
                                            >
                                                <h5>Name: {modal.name}</h5> 
                                                <h5>Citation Count : {modal.citation_count}</h5>
                                                
                                                <h5>
                                                    Publication Count: {modal.publication_count}
                                                </h5>
                                                
                                                <h5>
                                                    Publication Topics : {modal.publication_topics_list}
                                                </h5>
                                            </Modal>
                                            <Button
                                                style={{
                                                    padding: 0,
                                                    margin: "2px",
                                                }}
                                                key={key}
                                                onClick={() => keyValue(key)}
                                                variant={"subtle"}
                                            >
                                                {author.full_name}
                                            </Button>{" "}
                                        </>
                                    );
                                })}
                            </div>
                            <h5>{item.publication_title}</h5>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    margin: 0,
                                }}
                            >
                                <h5 style={{ margin: 0, padding: 0 }}>
                                    Publisher : {item.publisher}
                                </h5>
                                {" | "}
                                <h5 style={{ margin: 0, padding: 0 }}>
                                    {" "}
                                    Year : {item.publication_year}
                                </h5>
                                {" | "}
                                <h5 style={{ margin: 0, padding: 0 }}>
                                    Date : {item.publication_date}
                                </h5>
                            </div>
                        </Box>
                    </Container>
                );
            })}
        </>
    );
}

export default List;
