import { Listbox } from '@headlessui/react';
import type { ReactElement, JSXElementConstructor, ElementType } from 'react';

interface OptionRenderPropArg {
  active: boolean;
  selected: boolean;
  disabled: boolean;
}

interface CommonProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
}

interface ContainerProps extends CommonProps {
  multiple?: boolean;
  value?: any[];
  as?: ElementType<any>;
  onChange?: (value: any) => void;
}

interface OptionProps extends Omit<CommonProps, 'children'> {
  value: any;
  onClick?: () => void;
  disabled?: boolean;
  children?:
    | React.ReactNode
    | ((
        props: OptionRenderPropArg
      ) => ReactElement<any, string | JSXElementConstructor<any>>);
}

function DropdownMenu({ className, ...rest }: ContainerProps) {
  return (
    <div className={`relative ${className}`}>
      <Listbox {...rest} />
    </div>
  );
}

function DropdownButton(props: CommonProps) {
  return (
    <Listbox.Button
      {...props}
      className={`flex items-center justify-between rounded border border-solid bg-white py-2 px-2 text-sm ${props.className}`}
    />
  );
}

function Options(props: CommonProps) {
  return (
    <Listbox.Options
      {...props}
      className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5"
    />
  );
}

function Option(props: OptionProps) {
  return (
    <Listbox.Option
      {...props}
      className={`flex items-center justify-between ${props.className}`}
    />
  );
}

export const Dropdown = {
  Menu: DropdownMenu,
  Button: DropdownButton,
  Options,
  Option,
};