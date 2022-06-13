import './App.css';

import { useState } from 'react';

import {
  Canvas,
  Editor,
  Element,
  Frame,
} from '@craftjs/core';

import { Button } from './components/Button';
import {
  Card,
  CardBottom,
  CardTop,
} from './components/Card';
import { Container } from './components/Container';
import { SettingsPanel } from './components/SettingsPanel';
import { Text } from './components/Text';
import { Toolbox } from './components/Toolbox';
import { Topbar } from './components/TopBar';

const App = () => {
  return (
    <div>
      <Editor resolver={{Text, Card, Button, CardTop, CardBottom, Container}}>
      <Topbar />
        <div style={{display: 'grid', gridTemplateColumns: "1fr 300px"}}>
        <Frame>
          <Element is="div" canvas>
          <Button text="Boo" />
          <h2>Drag me around</h2> 
          <Text text="I'm already rendered here" />
          <Card />
          </Element>
        </Frame>
        <div>
      <Toolbox />
          <SettingsPanel />
        </div>
      </div>
      </Editor>
    </div>
  )
}
export default App
