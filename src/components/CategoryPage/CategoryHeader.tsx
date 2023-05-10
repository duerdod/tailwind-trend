import React from 'react';
// import Breadcrumbs from '@lib/ui/Breadcrumbs';
import Image from '../../ui/Image';

function CategoryHeader({ breadcrumbs, category }) {
  if (category?.images[0]?.url) {
    return (
      <header className="relative h-[390px] mb-4">
        <Image
          sizes={[1 / 1]}
          fillAvailableSpace
          src={category.images[category.images.length - 1].url}
          alt={category.name}
          aspect="21:9"
        />
        <div className="absolute top-1/2 w-full translate-y-[-50%]">
          <div className=" flex flex-col items-center bg-[#ffffff50]  p-1 text-white lg:p-5">
            <h1 className="text-[2.5rem] font-semibold lg:text-[3rem]">
              {category.name}
            </h1>
            {/* <Breadcrumbs
              parents={route?.parents}
              breadcrumbs={route.breadcrumbs}
              hideLast
            /> */}
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header className=" flex flex-col items-center p-5">
        <h2 className="text-[2rem] font-semibold text-black">
          {category.name}
        </h2>
        {/* <Breadcrumbs
          parents={route?.parents}
          breadcrumbs={route.breadcrumbs}
          hideLast
          className="flex justify-center"
        /> */}
      </header>
    );
  }
}
export { CategoryHeader };
