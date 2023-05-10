import React from 'react';
import { Link } from 'react-router-dom';
import { useChannels } from '@jetshop/core/hooks/useChannels';
import { useQuery } from 'react-apollo';
import PagesQuery from './PagesQuery.gql';

function Pages() {
  const result = useQuery(PagesQuery);

  if (result.loading) {
    return null;
  }

  return result?.data?.pages.map(page => (
    <li key={page.id}>
      <Link
        to={page.primaryRoute.path}
        className="text-xs text-black lg:text-sm"
      >
        {page.name}
      </Link>
    </li>
  ));
}

function Footer() {
  const { selectedChannel } = useChannels();

  return (
    <footer className="mt-auto bg-background-900">
      <div className=" flex flex-col flex-wrap items-center justify-center gap-4 py-10 px-4 text-sm text-white md:flex-row md:items-start md:justify-around">
        <div>
          <h2 className="text-center text-black font-semibold md:text-left">
            {selectedChannel.name}
          </h2>
          <ul className="flex flex-col items-center md:items-start">
            <Pages />
          </ul>
        </div>
        <div>
          <h2 className="text-center font-semibold text-black">Adress</h2>
          <span className=" text-xs lg:text-sm text-black">
            Sten Sturegatan 42-44
          </span>
        </div>
        <div className="text-sx flex flex-col lg:text-sm text-black">
          <h2 className="font-semibold text-black">
            {' '}
            Prenumerera på nyhetsbrev
          </h2>
          <input
            className=" text-sx md:w-78 mt-2 h-auto rounded border border-solid py-2 px-4 text-sm"
            type="email"
            placeholder="Ange e-postadress"
          />
          <div className="mt-4 justify-end text-xs text-black">
            <a href="https://www.norce.io">Powered by Norce</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
