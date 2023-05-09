import React from 'react';
import { styled } from 'linaria/react';
import { Shortcodes } from '@jetshop/flight-shortcodes';
import MaxWidth from '../../Layout/MaxWidth';
import { Link } from 'react-router-dom';

const Container = styled('div')`
  margin: 2rem 0;
  background: #fff;
  padding: 2rem;

  a {
    color: #5c5c5c;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      color: #000;
    }
  }

  ul,
  ol {
    margin-block-start: 1em;
    margin-block-end: 1em;
    padding-inline-start: 2rem;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  li {
    margin: 0.5rem 0;
  }

  p {
    margin: 1rem 0;
  }
`;

const internalUrlRegex = /^\/[^/]/;

const CustomLink = ({ href, children, ...rest }) => {
  if (internalUrlRegex.test(href)) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    );
  } else {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
};

export const StartPageHTMLContent = props => {
  if (!props || !props.html || !props.html.value) return null;

  return (
    <MaxWidth>
      <Container>
        <Shortcodes
          content={props.html.value}
          components={{
            a: CustomLink
          }}
        />
      </Container>
    </MaxWidth>
  );
};

export default StartPageHTMLContent;
