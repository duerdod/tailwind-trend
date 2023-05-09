import { LoadingLine } from '@jetshop/ui/Loading/LoadingLine';
import { styled } from 'linaria/react';
import React from 'react';
import UIMaxWidth from '../Layout/MaxWidth';
import { ContentRenderer } from '@jetshop/ui/ContentRenderer';
import {
  MobileNavigation,
  DesktopNavigation,
  shouldDisplayNavigation
} from './SubPageNavigation';
import { css } from 'linaria';
import Breadcrumbs from '@jetshop/ui/Breadcrumbs';

const Content = styled('div')`
  padding-bottom: 1rem;

  p {
    margin-bottom: 1rem;
  }
`;

const container = css`
  display: flex;
  flex-direction: row;
`;

const sidebar = css`
  max-width: 288px;
  flex: 1 1 auto;
  border-right: 1px solid #dedede;
  margin-right: 2rem;
  padding: 2rem 0;

  @media (max-width: 799px) {
    display: none;
  }
`;

const content = css`
  max-width: 60rem;
  flex: 1 1 auto;
  padding: 2rem 0;

  h1 {
    margin-bottom: 1rem;
  }
`;

const body = css`
  margin-top: 1rem;
`;

const components = {
  HTML: props => {
    return (
      <Content
        dangerouslySetInnerHTML={{
          __html: props.html.value.value
        }}
      />
    );
  }
};

function ContentPage({ page, result }) {
  return (
    <UIMaxWidth className={container}>
      {page && shouldDisplayNavigation(page) && (
        <aside className={sidebar}>
          <DesktopNavigation page={page} />
        </aside>
      )}
      <article className={content}>
        <Breadcrumbs
          parents={result.data?.route?.parents || []}
          breadcrumbs={result.data?.route?.breadcrumbs || []}
        />
        <h1>
          {page ? page.name : <LoadingLine heightPx={27} widthRem={15} />}
        </h1>
        <MobileNavigation page={page} />
        <div className={body}>
          {page ? (
            page.data ? (
              <ContentRenderer
                items={page.data.items}
                components={components}
              />
            ) : (
              <Content dangerouslySetInnerHTML={{ __html: page.content }} />
            )
          ) : (
            <LoadingLine
              heightPx={14}
              widthRem={30}
              randomizeWidthBy={10}
              count={10}
              style={{
                marginBottom: '12px'
              }}
            />
          )}
        </div>
      </article>
    </UIMaxWidth>
  );
}

export default ContentPage;
