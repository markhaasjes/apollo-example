import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Loading from '../components/loading';
import Header from '../components/header';
import LaunchDetail from '../components/launch-detail';
import ActionButton from '../containers/action-button';

import { LAUNCH_TILE_DATA } from './launches';

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($launchId: ID!) {
    launch(id: $launchId) {
      isInCart @client
      site
      rocket {
        type
      }
      ...LaunchTile
    }
  }
  ${LAUNCH_TILE_DATA}
`;

export default function Launch({ launchId }) {
  return (
    <Query query={GET_LAUNCH_DETAILS} variables={{ launchId }}>
      {({ data, loading, error }) => {
        console.log({ data, loading, error });

        if (loading) return <Loading />;
        if (error)
          return (
            <details>
              <summary>ERROR!</summary>
              {JSON.stringify(error)}
            </details>
          );

        return (
          <>
            <Header image={data.launch.mission.missionPatch}>
              {data.launch.mission.name}
            </Header>
            <LaunchDetail {...data.launch} />
            {/* <ActionButton {...data.launch} /> */}
          </>
        );
      }}
    </Query>
  );
}
