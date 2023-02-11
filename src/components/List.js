import React, { useEffect, useState } from "react";
import { Container, Box, Anchor, Button, Modal } from "@mantine/core";
import axios from "axios";
// import test from "../test.json";

function List(props) {
    const { keywords, data, selector, setSelector } = props;
    const test = data;
    const papers = test;

    console.log(data);
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
        // await axios({
        //     method: "GET",
        //     url: `http://127.0.0.1:8000/?author=${papers[0].authors.authors[globalId].id}&keywords=${keywords}`,
        //     timeout: 400000,
        // }).then((data) => {
        //     setModal(data.data[0]);
        // });
        setModal(papers[0].authors.authors[globalId]);
        console.log("End Profiling");
        setOpened(true);
    }

    function runUserSearch(title, abstract) {
        setSelector({
            title, 
            abstract
        })
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
                                    href={`${item.pdf_url}`}
                                    target="_blank"
                                >
                                    {item.title}
                                </Anchor>
                            </h5>
                            {item.abstract &&
                            item.abstract !== "" &&
                            item.abstract !== " " ? (
                                <div>
                                <div style={{ padding: "0 3% 0 3%" }}>
                                    <h5>
                                        <summary style={{ fontWeight: 400 }}>
                                            {item.abstract.slice(0, 150)}{" "}
                                            {"..."}
                                        </summary>
                                        <details>{item.abstract}</details>
                                    </h5>
                                </div>
                                
                                </div>
                            ) : null}
                            <div>
                                    Sentiment Analysis : <span style={{
                                        backgroundColor: item.sentiment_analysis == "Positive" ? "#42f57b" : 
                                                         item.sentiment_analysis == "Neutral" ? "#6a9cf7":
                                                         "#f54242",
                                        padding: '4px',
                                        borderRadius: '8px',
                                        border: 'none'
                                    }}>{item.sentiment_analysis}</span>
                                </div>
                            <div>
                                Authors :
                                {item.authors.authors.map((author, key) => {
                                    console.log(author)
                                    return (
                                        <>
                                            <Modal
                                                opened={opened}
                                                onClose={() => setOpened(false)}
                                                title="Author Details"
                                            >
                                                <h5>Name: {modal.full_name}</h5>
                                                <h5>Author id: {modal.id}</h5>
                                                <h5>
                                                    Citation Count :{" "}
                                                    {modal.citations}
                                                </h5>

                                                <h5>
                                                    Publication Count:{" "}
                                                    {modal.paperCount}
                                                </h5>

                                                <h5>
                                                    H-Index : {modal.hIndex}
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
                                    {" "}
                                    Citations : {item.citing_paper_count}
                                </h5>
                                {" | "}
                                <h5 style={{ margin: 0, padding: 0 }}>
                                    Journal :{" "}
                                    {item.journal !== ""
                                        ? item.journal
                                        : "Unknown"}
                                </h5>
                                { " | "}
                                <h5 style={{ margin: 0, padding: 0 }}>
                                    Publication Year: {item.publication_year}
                                </h5>
                            </div>
                            {
                                selector ?
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center'
                                }}><Button onClick={() => runUserSearch(item.title, item.abstract)}>Show Similar Results</Button>
                                    <Button onClick={() => {}}>Show Similar Results by Co-Authors</Button>
                                </div>:
                                null

                            }
                        </Box>
                    </Container>
                );
            })}
        </>
    );
}

export default List;
