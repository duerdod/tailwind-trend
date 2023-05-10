import { Popover as Flyout, Transition } from '@headlessui/react';

interface PopoverProps {
  children?: React.ReactNode;
  /** This element will be wrapped inside a button, so make sure not to pass a HTML button as PopoverButtonContent */
  PopoverButtonContent: React.ReactNode;
  popoverPanelClassName?: string;
  relativeToParent?: boolean;
}

function Popover({
  children,
  PopoverButtonContent,
  popoverPanelClassName,
  relativeToParent = false,
}: PopoverProps) {
  return (
    <Flyout>
      <Flyout.Button>{PopoverButtonContent}</Flyout.Button>

      <Flyout.Overlay className="fixed inset-0 z-10 bg-black opacity-10" />

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="fixed z-20"
      >
        <Flyout.Panel
          className={`${
            popoverPanelClassName ? popoverPanelClassName : ''
          } absolute`}
        >
          {children}
        </Flyout.Panel>
      </Transition>
    </Flyout>
  );
}

export { Popover };
