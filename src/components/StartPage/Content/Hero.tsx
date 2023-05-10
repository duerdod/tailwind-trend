import React from 'react';
import { MaxWidth } from '../../Layout/MaxWidth';
import { Link } from 'react-router-dom';
import Image from '../../../ui/Image';

function Hero({ imageSrc, header, isAboveFold, text, buttonLink, buttonText }) {
  return (
    <MaxWidth className="mb-4">
      <div className="relativ h-[550px] w-full md:h-auto">
        <Image
          fillAvailableSpace={true}
          src={imageSrc.value}
          critical={isAboveFold?.value}
          sizes="1"
          aspect={'2:1'}
          alt=""
          className="aspect-video w-full object-cover"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-white lg:text-4xl  ">
              {header.value}
            </h2>
            <p className="lg:text-md m-2 text-center text-sm text-white">
              {text.value}
            </p>
            <Link
              className="mt-2 flex min-w-[166px] items-center justify-center"
              href="a"
              to={buttonLink.value}
            >
              {buttonText.value}
            </Link>
          </div>
        </Image>
      </div>
    </MaxWidth>
  );
}

export { Hero };
