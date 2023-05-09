/*
 * TODO This is temporary, delete before merging
 *
 */
import React from 'react';
import { useContext } from 'react';
import { ProductListContext } from '@jetshop/core/hooks/ProductList/ProductListContext';
import { Link } from 'react-router-dom';
import useAuth from '@jetshop/core/components/AuthContext/useAuth';

export default function Lister() {
  const { state, createList, deleteList } = useContext(ProductListContext);
  const { loggedIn } = useAuth();
  return (
    <>
      <h2>Product lists</h2>
      {loggedIn ? (
        <button onClick={() => createList('BOOM')}>
          Create a list a new list called BOOM
        </button>
      ) : (
        <></>
      )}

      <br />

      <ul>
        {Array.from(state.lists.entries()).map(([listId, obj]) => (
          <li key={listId} style={{ padding: '0.5em' }}>
            <Link to={`/favourites/${listId || ''}`}>
              {listId === null ? 'Default list' : obj.name}
            </Link>
            {listId === null ? (
              <></>
            ) : (
              <button onClick={() => deleteList(listId)}>DELETE</button>
            )}
          </li>
        ))}
      </ul>
      <hr />
    </>
  );
}
