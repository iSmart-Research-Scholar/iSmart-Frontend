import { Table } from '@mantine/core';

function Tab(props) {
    const {elements, headers} = props;
    
  const rows = elements.map((element) => (

    <tr key={element.title}>
      <td><a href={element.url}>{element.title}</a></td>
      {
        element.values.map((v, idx) => {
                return (
                    <td key={idx}>{v==1 ? "Yes": "No"}</td>
                );
        })
    }
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
            <th>Papers</th>
          {
            headers.map((h, idx) => {
                return (
                    <th key={idx}><strong>{h}</strong></th>
                );
            })
          }
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default Tab;