import React from 'react';
import { Category } from '@jetshop/core/types';
import { MaxWidth } from '../MaxWidth';
import { Link } from 'react-router-dom';
import { Above } from '../../../ui/Breakpoints/Breakpoints';
import { Modal, ModalTrigger } from '../../../ui/Modal';
import { MobileMenu } from './MobileMenu/MobileMenu';
import useAuth from '@jetshop/core/components/AuthContext/useAuth';
import { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ReactComponent as Logo } from './trend-logo.svg';
import { useQuery } from 'react-apollo';
import homeCategoriesQuery from './HomeCategoriesQuery.gql';
import { Notifications } from '../Notifications';
import { CategoryLink } from '../../../ui/Links/CategoryLink';

function MyPagesLink({ className }: { className?: string }) {
  const { loggedIn } = useAuth();
  return (
    <Link className={className} to={loggedIn ? '/my-pages' : '/login'}>
      <span>person</span>
    </Link>
  );
}

function Logotype() {
  return (
    <Link to="/">
      <Logo />
    </Link>
  );
}

function Categories({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState<number | null>(null);
  if (!categories) {
    return <div className="p-4" />;
  }

  return (
    <div>
      <ul className="relative m-0 flex flex-wrap items-center justify-center border-t bg-white p-0">
        {categories.map(category => (
          <li
            key={category.id}
            onMouseEnter={
              category.hasSubcategories
                ? () => setActive(category.id)
                : undefined
            }
            onMouseLeave={
              category.hasSubcategories ? () => setActive(null) : undefined
            }
          >
            <CategoryLink
              category={category}
              className="inline-block p-4 no-underline"
            >
              {category.name}
            </CategoryLink>
            <Transition
              show={active === category.id}
              as="div"
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 -translate-y-10 z-[0]"
              to="opacity-100 translate-y-0 z-[100]"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
              className="absolute left-0 z-[999] w-full bg-white"
            >
              <ul className="m-0 flex max-h-64 flex-wrap items-center justify-center overflow-y-auto border-t bg-white p-0">
                {category?.subcategories.map(sub => {
                  return (
                    <li key={sub.id}>
                      <CategoryLink
                        onClick={() => setActive(null)}
                        category={sub}
                        className="inline-block p-4 text-sm no-underline"
                      >
                        {sub.name}
                      </CategoryLink>
                    </li>
                  );
                })}
              </ul>
            </Transition>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  const result = useQuery(homeCategoriesQuery, {
    variables: {
      levels: 1
    }
  });

  const { loggedIn } = useAuth();
  return (
    <header className="relative overflow-visible border-b bg-white">
      <Above breakpoint="md">
        {matches =>
          matches ? (
            <>
              <MaxWidth>
                <div className="flex h-20 items-center justify-between">
                  <div className="flex grow basis-0">
                    <Logotype />
                  </div>
                  <div className="flex-start relative flex h-8 grow basis-0 justify-center">
                    <input type="text" placeholder="search" />
                  </div>
                  <div className="relative flex grow basis-0 items-center justify-end space-x-2">
                    <MyPagesLink />
                  </div>
                </div>
              </MaxWidth>
              <Categories categories={result?.data?.categories as Category[]} />
            </>
          ) : (
            <MaxWidth>
              <div className="flex h-20 items-center justify-between">
                <div className="flex grow basis-0">
                  <ModalTrigger id="mobile-menu" className="p-2">
                    <Menu />
                  </ModalTrigger>
                  <Modal id="mobile-menu" type="drawer-left">
                    {drawer => (
                      <MobileMenu
                        drawer={drawer}
                        categories={result?.data?.categories as Category[]}
                      />
                    )}
                  </Modal>
                  <button
                    className="p-2"
                    onClick={() => setOpen(state => !state)}
                  >
                    <span>search</span>
                  </button>
                </div>
                <div className="flex grow basis-0">
                  <Logotype />
                </div>
                <div className="relative flex grow basis-0 items-center justify-end">
                  {loggedIn && (
                    <>
                      <MyPagesLink className="p-1" />

                      <ModalTrigger id="cart-modal" className="p-1">
                        <span>cart</span>
                      </ModalTrigger>
                      <Modal id="cart-modal" type="drawer-right">
                        {drawer => null}
                      </Modal>
                    </>
                  )}
                </div>
              </div>
              {open && (
                <div className="mb-1 -mt-5 flex w-full justify-center">
                  <input type="text" placeholder="search" />
                </div>
              )}
            </MaxWidth>
          )
        }
      </Above>
      <Notifications />
    </header>
  );
}

export { Header };
