import React from 'react';
import { useQuery } from 'react-apollo';
import { styled } from 'linaria/react';
import MaxWidth from '../Layout/MaxWidth';
import StoreDetail from './StoreDetail';
import StoreQuery from './StoreQuery.gql';
import { useParams } from 'react-router';

const Wrapper = styled(MaxWidth)`
  margin: 2rem;
`;

function Store() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(StoreQuery, { variables: { id } });

  if (loading) {
    return <Wrapper>Loading…</Wrapper>;
  } else if (error) {
    return 'Something went wrong';
  } else {
    const { store } = data;

    return (
      <Wrapper>
        {!store ? 'No store found!' : <StoreDetail store={store} />}
      </Wrapper>
    );
  }
}

export default Store;
