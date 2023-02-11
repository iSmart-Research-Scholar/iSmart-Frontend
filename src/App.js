import React, { useState } from "react";
import {
    AppShell,
    Navbar,
    Header,
    NavLink
} from "@mantine/core";
import KeywordForm from "./components/KeywordForm";
import ImageForm from "./components/ImageForm";
import DocumentForm from "./components/DocumentForm";
import Analysis from "./components/Analysis";
import UserSpecificSearch from "./components/UserSpecificSearch";
import Clustering from "./components/Clustering";
import {
    IconFileSearch,
    IconKeyboard,
    IconAlbum,
    IconGraph
} from "@tabler/icons";
// import CitationGraph from "./components/CitationGraph";
// import test from './test.json';


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
    {
        icon: IconAlbum,
        label: "OCR Image Search",
        description: "Look for Documents with keywords in the uploaded image."
    },
    {
        icon: IconFileSearch,
        label: "Critical Analysis",
        description: "Critical Analysis of research papers."
    },
    {
        icon: IconFileSearch,
        label: "User Specific Search",
        description: "Get User Specific Search Results with a click."
    },
    // {
    //     icon: IconGraph,
    //     label: "Research Paper Citation Graph",
    //     description: "Get Paper Citation graph."
    // },
    {
        icon: IconGraph,
        label: "Ranking with Clustering",
        description: "Search papers with clustered ranked results."
    }
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
            case 2:
                return <ImageForm />;
            case 3:
                return <Analysis />;
            case 4:
                return <UserSpecificSearch />
            // case 5:
            //     return <CitationGraph />
            case 5:
                return <Clustering />
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
                        margin: 0,
                        background: 'linear-gradient( 95.2deg, rgba(173,202,234,1) 26.8%, rgba(192,229,246,1) 64% )',
                        // backgroundRepeat: 'repeat',
                        // backgroundImage: 'url("/doodle.png")',
                        // opacity: '0.5'
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
