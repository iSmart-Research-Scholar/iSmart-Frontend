import React from "react";
import { Container, Center, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import List from "./List";
import { IconSearch } from "@tabler/icons";

function KeywordForm() {
    return (
        <Container size="xl" style={{margin: 0}}>
            <form>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <TextInput
                        placeholder="Enter Keywords"
                        icon={<IconSearch size={18} />}
                        size="lg"
                        style={{ width: 700 }}
                    />
                    <Button style={{marginLeft: "3%"}}>Submit</Button>
                </div>
            </form>
            <List />
        </Container>
    );
}

export default KeywordForm;
