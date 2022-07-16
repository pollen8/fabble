import { useSelector } from '@xstate/react';

import { useFabbleMachine } from '../App';

export const Data = () => {
  const { service } = useFabbleMachine();
  const isData = useSelector(service, (state) => state.matches('authenticated.data'));


  if (!isData) {
    return null;
  }
  return (
    <>
      <h1>data</h1>
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
    </>
  );
};
