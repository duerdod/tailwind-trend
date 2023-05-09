# Category page
This folder contains two versions of category pages, of which you would usually select one.

## Classic paginated category page
A category page that uses classic pagination, meaning next/previous buttons to step through pages, showing only one page of products at a time.

## Infinite pagination category page
A more scroll-friendly version of a category page, where new products are appended to the list when you press the "Load more products" button. In order not to lose performance when rendering a large amount of products, it uses a technique called windowing to only render the products that are in view at the moment. This can cause issues if you have product cards of varying height, so make sure that all images and details showed on the product card result in the same overall height for the product card.

## Read more
You can find more information about pagination in the [Flight documentation](https://docs.dev.jetshop.se/pagination).