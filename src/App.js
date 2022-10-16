import React, { useState } from "react";
import {
    AppShell,
    Navbar,
    Header,
    NavLink
} from "@mantine/core";
import KeywordForm from "./components/KeywordForm";
import {
    IconFileSearch,
    IconKeyboard,
} from "@tabler/icons";
// import test from './test.json';
import DocumentForm from "./components/DocumentForm";


const data = [
    {
        icon: IconKeyboard,
        label: "Keyword Search",
        description: "Look for Documents with Specific Keywords.",
    },
    {
        icon: IconFileSearch,
        label: "Research Paper Summary",
        description: "Generate Summary for uploaded Research Paper",
    },
];



function App() {
    const [active, setActive] = useState(0);

    // console.log(test);
    // console.log(test.articles);
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
    

    function getWhich(idx) {
        switch (idx) {
            case 0:
                return <KeywordForm />;
            case 1:
                return <DocumentForm />;
            default:
                return null;
        }
    }
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
                        margin: 0
                    },
                })}
            >
                {
                    getWhich(active)
                }
                {/* <KeywordForm /> */}
            </AppShell>
        </div>
    );
}

export default App;
