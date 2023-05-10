import { Disclosure, Transition } from '@headlessui/react';
import { Category } from '@jetshop/core/types';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

import { ModalRenderProps } from '../../../../ui/Modal';

function MenuItem({
  category,
  drawer
}: {
  category: Category;
  drawer: ModalRenderProps;
}) {
  if (category.hasSubcategories) {
    return (
      <Disclosure.Button
        className="flex items-center"
        onClick={() => drawer.close(drawer.id)}
      >
        {category.name}
      </Disclosure.Button>
    );
  } else {
    return (
      <Disclosure.Button
        className="flex items-center"
        as={Link}
        to={category.primaryRoute.path}
        onClick={() => drawer.close(drawer.id)}
      >
        {category.name}
      </Disclosure.Button>
    );
  }
}

function MobileMenu({
  categories,
  drawer
}: {
  categories: Category[];
  drawer: ModalRenderProps;
}) {
  return (
    <div className="h-full w-screen max-w-[34rem] overflow-y-auto bg-white">
      <header>
        <h2
          onClick={() => drawer.close(drawer.id)}
          className="text-center text-2xl font-bold text-primary"
        >
          Stäng
        </h2>
      </header>
      <ul className="flex flex-col gap-2 bg-inherit p-4">
        {categories.map(category => {
          if (category.hasSubcategories) {
            return (
              <Disclosure key={category.id}>
                <li className="p-1">
                  <Disclosure.Button className="flex w-full items-center justify-between">
                    {category.name} <span>caret</span>
                  </Disclosure.Button>
                </li>
                <Transition
                  as={Fragment}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform transform-y-0 opacity-0"
                  enterTo="transform transform-y-full opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform transform-y-full opacity-100"
                  leaveTo="transform transform-y-0 opacity-0"
                >
                  <Disclosure.Panel as="ul" className="ml-4">
                    {category.subcategories.map(subcategory => {
                      return (
                        <li key={subcategory.id} className="p-1">
                          <MenuItem category={subcategory} drawer={drawer} />
                        </li>
                      );
                    })}
                  </Disclosure.Panel>
                </Transition>
              </Disclosure>
            );
          } else {
            return (
              <li key={category.id} className="p-1">
                <Disclosure>
                  <MenuItem category={category} drawer={drawer} />
                </Disclosure>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export { MobileMenu };
