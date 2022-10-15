import React, { useEffect } from "react";
import { Container, Center, Box, Anchor, Button } from "@mantine/core";
import { Header } from "@mantine/core";
import axios from "axios";
import test from "../test.json";

function List(props) {
    const keywords = "image theory analysis and image";
    const papers = test.articles;
    const total_records = test.total_records;
    const total_searched = test.total_searched;
    useEffect(() => {
        console.log(papers, total_records, total_searched);
    }, [test]);

    async function getAuthorDetails(e) {
        // https://author-profiling.herokuapp.com/?author=37283451200&keywords=image%20theory%20analysis%20and%20image
        let id = 37283451200;
        console.log("Start Profiling");
        await axios({
            method: "GET",
            url: `https://author-profiling.herokuapp.com/?author=${id}&keywords=${keywords}`,
            timeout: 20000
        }).then((data) => { console.log(data.data) });
        console.log("End Profiling");
    }
    return (
        <>
            {papers.map((item, key) => {
                return (
                    <Container key={key} style={{margin: 0}}>
                        <Box
                            style={{backgroundColor: 'white', padding: "12px", borderRadius: "6px", margin: "10px 0 10px 0"}}
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
                                            <Button
                                                style={{ padding: 0, margin: "2px"}}
                                                key={key}
                                                onClick={getAuthorDetails}
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
                                    margin: 0
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
