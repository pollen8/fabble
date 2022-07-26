import { useState } from 'react';
import {
  IoAddCircleOutline,
  IoCloseCircleOutline,
} from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';

import {
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import { useSelector } from '@xstate/react';

import {
  selectActiveApp,
  selectPages,
  useFabbleMachine,
} from '../App';
import { ListItem } from '../common/ListItem';
import { TPage } from './Composer';

type TEditablePage = TPage & {
  editing?: boolean;
}
export const PageList = () => {
  const { service, send } = useFabbleMachine();
  const app =useSelector(service, selectActiveApp);
  const pages = useSelector(service, selectPages);

  const [editingPages, setEditingPages] = useState<TEditablePage[]>(pages);

  const save = (index: number, name: string) => {
    const pages = editingPages.map((p, i) => i === index ? { ...p, name, editing: false } : { ...p, editing: false });
    send({ type: 'SAVE_APP', app: {
      ...app,
      config: {
        ...app.config,
        pages,
      },
    } });
    return pages;
  };

  const startEditing = (index: number) => setEditingPages(editingPages.map((p, i) => ({ ...p, editing: i === index })));
  const stopEditing = () => setEditingPages(editingPages.map((p, i) => ({ ...p, editing: false })));

  return (
    <>
      <Flex alignItems="center">
        <IconButton
          aria-label="Add page"
          size="sm"
          marginRight={2}
          icon={<IoAddCircleOutline />}
          onClick={() => {
            const newPages: TEditablePage[] = [
              {
                id: uuidv4(),
                editing: true,
                markup: '',
              },
              ...pages,
            ];
            setEditingPages(newPages);
          }}
        />
        <Heading as="h1" size="md">Pages</Heading>
      </Flex>
      {
        editingPages.map((page, index) => <ListItem
          key={page.id}
          onClick={() => send({ type: 'LOAD_PAGE', index })}
          onDoubleClick={() => {
            startEditing(index);
          }}>
          {
            page.editing ?
            <Input
              autoFocus
              defaultValue={page.name}
              onClick={(e) => e.stopPropagation()}
              onKeyUp={(e) => {
                if (e.code === 'Escape') {
                  stopEditing();
                }
                if (e.code === 'Enter') {
                  setEditingPages(save(index, e.currentTarget.value));
                }
              }}/> :
            <Text fontSize="lg">{page.name}</Text>
          }

          <ButtonGroup gap='1'>
            <IconButton
              aria-label="Add page"
              size="sm"

              icon={<IoAddCircleOutline />}
              onClick={(e) => {
                e.stopPropagation();
                const newPages: TEditablePage[] = [
                  ...pages.slice(0, index),
                  {
                    id: uuidv4(),
                    editing: true,
                    markup: '',
                  },
                  ...pages.slice(index),
                ];
                setEditingPages(newPages);
              }}
            />
            <IconButton
              size="sm"
              aria-label="Delete page"
              _hover={{
                bg: 'red.500',
              }}
              icon={<IoCloseCircleOutline />}
              onClick={(e) => {
                e.stopPropagation();
                const newPages = pages.filter((page, i) => i !== index);
                service.send({ type: 'SAVE_APP', app: {
                  ...app,
                  config: {
                    ...app.config,
                    pages: newPages,
                  },
                } });
                setEditingPages(newPages);
              }}
            />
          </ButtonGroup>
        </ListItem>)
      }
    </>
  );
};
