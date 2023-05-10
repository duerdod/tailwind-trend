import { Transition, Dialog } from '@headlessui/react';
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

export interface ModalRenderProps {
  open: (id: string) => void;
  close: (id: string) => void;
  toggle: (id: string) => void;
  id: string;
}

const ModalContext = React.createContext<
  | {
      modals: string[];
      open: (id: string) => void;
      close: (id: string) => void;
      toggle: (id: string) => void;
    }
  | undefined
>(undefined);

export const ModalProvider: React.FunctionComponent<{
  children: React.ReactNode;
}> = props => {
  const [modals, setModals] = useState([]);

  const close = useCallback(
    (id: string) => setModals(ms => ms.filter((m: string) => m !== id)),
    [setModals]
  );

  const open = useCallback((id: string) => setModals(ms => [...ms, id]), [
    setModals
  ]);

  const toggle = useCallback(
    (id: string) => (modals.includes(id) ? close(id) : open(id)),
    [modals, close, open]
  );

  return (
    <ModalContext.Provider value={{ modals, close, open, toggle }} {...props} />
  );
};

export const ModalTrigger = ({
  id,
  className,
  children,
  type = 'button'
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit';
}) => {
  const { toggle } = useContext(ModalContext);
  return (
    <button className={className} onClick={() => toggle(id)} type={type}>
      {children}
    </button>
  );
};

type AvailableAnimation = {
  'drawer-left': { [key: string]: string };
  'drawer-right': { [key: string]: string };
  modal: { [key: string]: string };
};

const animation: AvailableAnimation = {
  'drawer-left': {
    enter: 'transition ease-in-out duration-150 transform',
    enterFrom: '-translate-x-full',
    enterTo: 'translate-x-0',
    leave: 'transition ease-in-out duration-150 transform',
    leaveFrom: 'translate-x-0',
    leaveTo: '-translate-x-full',
    className: 'fixed top-0 bottom-0 left-0 z-50 w-auto'
  },
  'drawer-right': {
    enter: 'transition ease-in-out duration-150 transform',
    enterFrom: 'translate-x-full',
    enterTo: 'translate-x-0',
    leave: 'transition ease-in-out duration-150 transform',
    leaveFrom: 'translate-x-0',
    leaveTo: 'translate-x-full',
    className: 'fixed top-0 bottom-0 right-0 z-50 w-auto'
  },
  modal: {
    enterFrom: 'opacity-0',
    enterTo: 'opacity-100',
    leave: 'transition ease-in-out',
    leaveFrom: 'opacity-100',
    leaveTo: 'opacity-0',
    className: 'fixed z-50 flex items-center justify-center inset-0'
  }
};

export function Modal({
  id,
  children,
  className,
  type = 'modal'
}: {
  id: string;
  children?: React.ReactNode | ((props: ModalRenderProps) => React.ReactNode);
  className?: string;
  type?: keyof AvailableAnimation;
}) {
  const { modals, toggle, open, close } = useContext(ModalContext);
  const isDrawer = type.includes('drawer');

  useEffect(() => {
    // Close on unmount
    return () => close(id);
  }, [close, id]);

  return (
    <Transition show={modals.includes(id)} as={Fragment}>
      <Dialog
        onClose={() => close(id)}
        className={`fixed z-30 ${isDrawer ? 'inset-0 overflow-y-auto' : ''}`}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-in duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-30"
          leave="transition-opacity ease-out duration-0"
          leaveFrom="opacity-30"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 z-20 bg-black opacity-30" />
        </Transition.Child>
        <Transition.Child {...animation[type]}>
          <Dialog.Panel className={`${className} ${isDrawer ? 'h-full' : ''}`}>
            {typeof children === 'function'
              ? children({
                  close,
                  open,
                  toggle,
                  id
                } as ModalRenderProps)
              : children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
