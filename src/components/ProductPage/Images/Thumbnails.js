import React from 'react';
import { styled } from 'linaria/react';

const Wrapper = styled('div')`
  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    li {
      margin: 0.5rem;
      height: 6rem;
      width: 5rem;
      background-size: cover;
      cursor: pointer;
      :hover {
        opacity: 0.9;
      }
    }
  }
`;

/**
 * @param {array} {images} Array of prod images
 */
const Thumbnails = ({ images, selectImage }) => {
  // sizes[]:  height, url, width

  const prodImages = images || [];

  return prodImages.length > 0 ? (
    <Wrapper>
      <ul>
        {prodImages.map((img, i) => (
          <li
            key={img.sizes && img.sizes[0] && img.sizes[0].url}
            onClick={() => selectImage(i)}
            style={{
              background: `url(${
                img.sizes && img.sizes[1] ? img.sizes[1].url : null
              }) center center no-repeat`
            }}
          />
        ))}
      </ul>
    </Wrapper>
  ) : null;
};

export default Thumbnails;
