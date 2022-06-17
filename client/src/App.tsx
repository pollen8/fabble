import './App.css';

import {
  createContext,
  useContext,
  useState,
} from 'react';

import {
  Box,
  Grid,
} from '@chakra-ui/react';
import {
  Editor,
  Element,
  Frame,
} from '@craftjs/core';
import { useInterpret } from '@xstate/react';

import { Button } from './components/Button';
import {
  Card,
  CardBottom,
  CardTop,
} from './components/Card';
import { Container } from './components/Container';
import { DataTable } from './components/DataTable';
import { SettingsPanel } from './components/SettingsPanel';
import { Text } from './components/Text';
import { Toolbox } from './components/Toolbox';
import { Topbar } from './components/TopBar';
import {
  fabbleMachine,
  Service,
} from './fabble.machine';

type MachineContext = {
  service: Service,
}
export const FabbleMachineContext = createContext({} as MachineContext);

export const useFabbleMachine = () => useContext(FabbleMachineContext);



const App = () => {
  const service = useInterpret(fabbleMachine, {
    services: {
      loadPage: async () => ({ page: '' }),
    },

  });
  console.log(service);
  return (
    <FabbleMachineContext.Provider value={{ service }}>
      <Editor resolver={{ Text, Card, Button, CardTop, CardBottom, Container, DataTable }}>
        <Topbar />
        <Grid templateColumns="1fr 300px">
          <Box bg="gray.100" padding={8}>
            <Frame>
              <Element is="div" canvas>
                <Button text="Boo" />
                <h2>Drag me around</h2>
                <Text text="I'm already rendered here" />
                <Card />
              </Element>
            </Frame>
          </Box>
          <Box padding={4}>
            <Toolbox />
            <SettingsPanel />
          </Box>
        </Grid>
      </Editor>
    </FabbleMachineContext.Provider>
  )
}
export default App
