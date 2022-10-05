import { useState } from "react";
import {
    AppShell,
    Navbar,
    Header,
    Container,
    NavLink,
    Center,
    TextInput,
} from "@mantine/core";
import {
    IconFileSearch,
    IconSearch,
    IconKeyboard,
    IconPhoto,
} from "@tabler/icons";

const data = [
    {
        icon: IconKeyboard,
        label: "Keyword Search",
        description: "Look for Documents with Specific Keywords.",
    },
    {
        icon: IconFileSearch,
        label: "Document Search",
        description: "Look for document similar to given document.",
    },
];

function App() {
    const [active, setActive] = useState(0);
    const items = data.map((item, index) => (
        <NavLink
            key={item.label}
            active={index === active}
            label={item.label}
            description={item.description}
            rightSection={item.rightSection}
            icon={<item.icon size={16} stroke={1.5} />}
            onClick={() => setActive(index)}
        />
    ));
    return (
        <div className="App">
            <AppShell
                padding="lg"
                navbar={
                    <Navbar width={{ base: 300 }} p="xs">
                        {items}
                    </Navbar>
                }
                header={
                    <Header height={60} pl="xs">
                        <h3>iSmart - Research Scholar</h3>
                    </Header>
                }
                styles={(theme) => ({
                    main: {
                        backgroundColor:
                            theme.colorScheme === "dark"
                                ? theme.colors.dark[8]
                                : theme.colors.gray[0],
                    },
                })}
            >
                <Container size="xl">
                    <Center style={{ width: 800 }}>
                        <TextInput
                            placeholder="Enter space seperated Keywords"
                            label="Keywords"
                            icon={<IconSearch size={18} />}
                            size="lg"
                            style={{ width: 700 }}
                            withAsterisk
                        />
                    </Center>
                </Container>
            </AppShell>
        </div>
    );
}

export default App;
