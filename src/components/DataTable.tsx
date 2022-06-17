import { FC } from 'react';

import {
  Alert,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  useNode,
  UserComponent,
} from '@craftjs/core';

type Props = {
  data?: Array<Record<string, any>>;
  caption?: string;
  source?: string;
}

export const DataTable: UserComponent<Props> = ({
  data = [
    { name: 'bob', age: 21 },
  ],
  caption,
}) => {
  const { connectors: { connect, drag } } = useNode();
  if (data.length === 0) {
    return <Alert>No data</Alert>
  }
  const headings = Object.keys(data[0]);
  return (
    <TableContainer
      ref={ref => ref && connect(drag(ref))}>
      <Table variant='simple'>
        {
          caption &&
          <TableCaption>{caption}</TableCaption>
        }
        <Thead>
          <Tr>
            {
              headings.map((heading) => <Th key={heading}>{heading}</Th>)
            }
          </Tr>
        </Thead>
        <Tbody>
          {
            data.map((row, i) => <Tr key={i}>
              {
                headings.map((heading) => <Td key={`${heading}-${i}`}>{row[heading]}</Td>)
              }
            </Tr>)
          }
        </Tbody>
      </Table>
    </TableContainer>
  )
}



const DataTableSettings = () => {
  const { actions: { setProp }, source } = useNode((node) => ({
    source: node.data.props.source
  }));

  return (
    <>
      <label >Data Source</label>
      <Select
        defaultValue={source}

        onChange={(e) => {
          setProp((props: Props) => props.source = e.target.value);
        }}
      >
        <option value="infosum:datasets">Infosum: datasets</option>
        <option value="shopify:customers">Shopify: customers</option>
      </Select>
    </>
  )
}

DataTable.craft = {
  props: {
    source: 'infosum:datasets',
  },
  related: {
    settings: DataTableSettings
  }
}
