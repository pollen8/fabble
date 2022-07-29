import {
  FC,
  useEffect,
  useState,
} from 'react';

import {
  Button,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useSelector } from '@xstate/react';

import {
  selectActiveAppDataConfig,
  useFabbleMachine,
} from '../App';
import { BoxContext } from '../common/BoxContext';
import { Card } from '../common/Card';
import { ListItem } from '../common/ListItem';
import { MeshEditor } from './MeshEditor';

type NoticeProps = {
  isOpen: boolean;
}
const Notice: FC<NoticeProps> = ({
  isOpen,
}) => {
  const toast = useToast();
  if (isOpen) {
    if (!toast.isActive('saving')) {
      toast({ title: 'API saved', id: 'saving', duration: 2000 });
    }
  }
  return null;
};
export const Data = () => {
  const { service, send } = useFabbleMachine();
  const value = useSelector(service, selectActiveAppDataConfig);
  const isSaving = useSelector(service, (state) => state.matches('authenticated.editingApp.data.saving'));
  const isSaved = useSelector(service, (state) => state.matches('authenticated.editingApp.data.saved'));
  const [script, setScript] = useState(value);
  useEffect(() => {
    setScript(value);
  }, [value]);

  return (
    <BoxContext paddingTop={4}>
      <Notice isOpen={isSaved} />
      <h1>data</h1>
      <Card>
        <ListItem>
        Primsa
        </ListItem>
      </Card>
      <p>Data connectors are things like API's, grpc web services etc.
        In GraphQL mesh we have the following https://www.graphql-mesh.com/docs/handlers/handlers-introduction

        To start with we should focus on @graphql-mesh/openapi

        The UI should allow a user to create a new source

        type (@graphql-mesh/openapi)
        name
        source (openAPI json file)

        A test mesh example can be found here
         https://codesandbox.io/s/github/Urigo/graphql-mesh/tree/master/examples/openapi-javascript-wiki?file=/example-queries/wikipedia-metrics.graphql:0-272

        Need to work out where the mesh.rc file will be stored
      </p>
      <h1>Queries</h1>
      <p>Once we have a data connector defined we
        can CRUD queries, the out put of queries can be used to display data in the app's pages.
        For PC lets go with a simple textarea, submit button
        and json preview of results. OR maybe we can find an off the shelf graph QL UI
      </p>
      {

      }
      <MeshEditor
        value={script}
        onChange={(v) => {
          setScript(v);
        }}
      />
      <Button
        disabled={isSaving}
        leftIcon={ isSaving ? <Spinner speed="0.65s"
          size="sm" /> : undefined}
        onClick={() => send({ type: 'SET_APP_DATA_CONFIG', config: script })}
      >
       Save
      </Button>
    </BoxContext>
  );
};
