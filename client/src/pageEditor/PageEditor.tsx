import lz from 'lzutf8';

import {
  Box,
  ChakraProvider,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import {
  Editor,
  Element,
  Frame,
} from '@craftjs/core';
import { useSelector } from '@xstate/react';

import {
  selectActivePageMarkup,
  selectAppTheme,
  useFabbleMachine,
} from '../App';
import { BoxContext } from '../common/BoxContext';
import { ThemSelector } from '../composer/ThemeSelector';
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

export const PageEditor = () => {
  const { service, send } = useFabbleMachine();
  const markup = useSelector(service, selectActivePageMarkup);

  const json = lz.decompress(lz.decodeBase64(markup));

  const theme = useSelector(service, selectAppTheme);

  return (
    <BoxContext>
      <Editor
        onNodesChange={(query) => {
          const json = query.serialize();
          send({ type: 'SET_PAGE_MARKUP', markup: lz.encodeBase64(lz.compress(json)) });
        }}
        resolver={{ Text, Card, Button, CardTop, CardBottom, Container, DataTable }}>
        <Grid templateColumns="200px 1fr 200px"
          rowGap={0}
          templateRows="auto 1fr" columnGap="0.5rem" h="full">
          <GridItem colSpan={3}>
            <Topbar />
          </GridItem>
          <GridItem>
            <Toolbox />
          </GridItem>
          <GridItem>
            <Box bg="gray.500"
              h="full"
              id="pageEditor"
              borderRadius={5}>
              {/* <ChakraProvider theme={theme} cssVarsRoot={'#pageEditor'}> */}
              <Box padding={8}>
                <Frame data={json}>
                  <Element is="div" canvas>
                    {
                      json === '' && <div>
                        <h2>Drag me around</h2>
                      </div>
                    }
                  </Element>
                </Frame>
              </Box>
              {/* </ChakraProvider>  */}
            </Box>
          </GridItem>
          <GridItem>
            <Box padding={4}>
              <ThemSelector />
              <SettingsPanel />
            </Box>

          </GridItem>
        </Grid>
      </Editor>
    </BoxContext>
  );
};
