import React from 'react';
import type {
  Product,
  Category,
  ContentItem,
  BoolValue,
  StringValue,
} from '@jetshop/core/types';

export type Components = {
  [key: string]: React.FC<any>;
};

const convertPropsToObject = (item: ContentItem) => {
  const props = item.properties.reduce((merged, current) => {
    if (current?.valueType === 'SCALAR') {
      merged[current.name] = {
        type: current.type,
        value: (current?.value as BoolValue | StringValue)?.value,
        __typename: current?.value?.__typename,
      };
    } else {
      merged[current.name] = {
        type: current.type,
        value: current.value as Product | Category,
      };
    }
    return merged;
  }, {} as { [key: string]: { type: string; value: boolean | string | Product | Category; __typename?: string } });

  return props;
};
const renderContent = ({
  items,
  components,
}: {
  items: ContentItem[];
  components: Components;
}): JSX.Element[] =>
  items.map((item, index) => {
    const Component =
      components[item.type.toUpperCase()] || components[item.type];

    const props = convertPropsToObject(item);

    if (Component) {
      return (
        <Component key={`${item.type}-${index}`} {...props}>
          {item?.children && item.children.length > 0
            ? renderContent({ items: item.children, components })
            : null}
        </Component>
      );
    } else return null;
  });

export function ContentRenderer({
  items,
  components,
}: {
  items: ContentItem[];
  components: Components;
}): JSX.Element {
  return <>{renderContent({ items, components })}</>;
}
