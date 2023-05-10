import React from 'react';
import { Price as IPrice } from '@jetshop/core/types';
import { usePrice } from '@jetshop/core/hooks/usePrice';

export interface PriceProps {
  style?: {};
  className?: string;
  /**Base price */
  price: IPrice;
  /**Previous Price */
  previousPrice?: IPrice;
  /**Optional formatter to format currency */
  formatter?(price: number, currencyCode?: string, culture?: string): string;
  /** Override the channel settings for includeVat */
  includeVat?: boolean;
  /** Currency to use instead of selected channel */
  currency?: {
    code: string;
    culture: string;
  };
  negative?: boolean;
  as?: React.ElementType<any>;
  hidePrice?: boolean;
  OnHidePriceComponent?: React.ElementType<any>;
  /** Only applicable when discounted */
  discountedClassName?: string;
}

export interface PriceCompound {
  Wrapper?: React.ReactNode;
  Old?: React.ReactNode;
  New?: React.ReactNode;
  Normal?: React.ReactNode;
}

const PriceComponent: React.FC<PriceProps> & PriceCompound = ({
  className,
  style,
  negative,
  OnHidePriceComponent,
  discountedClassName,
  ...props
}) => {
  const { hasDiscount, formattedPricing, hidePrice } = usePrice(props);

  if (hidePrice) {
    if (OnHidePriceComponent) {
      return <OnHidePriceComponent {...props} />;
    } else {
      return null;
    }
  }

  return (
    <div className={`price ${className}`} style={style}>
      <span
        className={`current font-semibold ${
          discountedClassName && hasDiscount ? discountedClassName : ''
        }`}
      >
        {formattedPricing.price}
      </span>
      {hasDiscount && (
        <span className={hasDiscount ? 'line-through' : ''}>
          {formattedPricing.previousPrice}
        </span>
      )}
    </div>
  );
};

export default PriceComponent;
