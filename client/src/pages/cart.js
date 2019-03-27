import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { Header, Loading } from '../components';
import { CartItem, BookTrips } from '../containers';
import { QueryManager } from 'apollo-client/core/QueryManager';

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

export default function Cart() {
  return (
    <Query query={GET_CART_ITEMS}>
      {({ data, loading, error }) => {
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
            <Header>My Cart</Header>
            {!data.cartItems || !data.cartItems.length ? (
              <p data-testid="empty-message">No items in your cart</p>
            ) : (
              <>
                {data.cartItems.map(launchId => (
                  <CartItem key={launchId} launchId={launchId} />
                ))}
                <BookTrips cartItems={data.cartItems} />
              </>
            )}
          </>
        );
      }}
    </Query>
  );
}
