import { useProductList } from '@jetshop/core/hooks/ProductList';
import { useProductVariants } from '@jetshop/core/hooks/useProductVariants';
import t from '@jetshop/intl';
import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuItem,
  DropdownMenuItems
} from '@jetshop/ui/DropdownMenu';
import { ReactComponent as Check } from '@jetshop/ui/svg/Check.svg';
import React from 'react';

export function SelectVariant({ product, listId }) {
  const { update } = useProductList(listId);
  const initialVariant = product.variant;

  const { selectedVariant, selectValue, getSelectedValue, validateSelection } =
    useProductVariants(product, {
      initialVariant
    });

  React.useEffect(() => {
    // When a variant is selected, call the update function from useProductList to update the list
    function setVariant(variantArticleNumber) {
      update(product.articleNumber, {
        variantArticleNumber,
        variantToReplace: product.variant?.articleNumber,
        quantity: 1
      });
    }

    const currentArticleNumber = product.variant?.articleNumber;

    if (!selectedVariant) return;

    if (currentArticleNumber !== selectedVariant.articleNumber) {
      setVariant(selectedVariant.articleNumber);
    }
  }, [product.articleNumber, product.variant, selectedVariant, update]);

  return (
    <>
      {product.variants.options.map(option => {
        const selectedValue = getSelectedValue(option);
        return (
          <DropdownMenu key={option.name}>
            <DropdownMenuButton>
              {selectedValue
                ? `${option.name}: ${selectedValue}`
                : t.rich('Select {option}', { option: option.name })}
            </DropdownMenuButton>
            <DropdownMenuItems style={{ zIndex: 9999 }}>
              {option.values.map(value => {
                const validation = validateSelection(value, option);

                return (
                  <DropdownMenuItem
                    key={value}
                    disabled={validation === 'invalid'}
                    closeOnSelect={true}
                    onSelect={() => {
                      selectValue(value, option);
                    }}
                    style={{ opacity: validation !== 'invalid' ? 1 : 0.5 }}
                  >
                    {value}
                    {selectedValue === value && <Check />}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuItems>
          </DropdownMenu>
        );
      })}
    </>
  );
}
