import t from '@jetshop/intl';
import React from 'react';
import { styled } from 'linaria/react';
import Button from '@jetshop/ui/Button';

const ErrorContainer = styled('div')`
  padding: 1em;
  align-items: center;
  line-height: 1.75;
  max-width: 100%;
  width: 80ch;
  margin: 0 auto;
  header {
    text-align: center;
    p {
      text-align: center;
      font-weight: 600;
      color: inherit;
    }
  }
  h1 {
    color: #e82a2a;
  }

  > * + * {
    margin-top: 1em;
    margin-bottom: 0;
    padding: 0;
  }

  p {
    color: #999999;
    text-align: left;
  }
`;

class NotFoundPage extends React.PureComponent {
  render() {
    return (
      <ErrorContainer>
        <header>
          <h1>{t('Whoops')}</h1>
          <p>
            {t(`You have attempted to download a page that does not exist on Jetshop's
          server.`)}
          </p>
        </header>
        <p>
          <strong>{t('This could be due to the following:')}</strong>
        </p>
        <p>
          {t(
            'The address provided is incorrect. Please check the spelling and try again.'
          )}
        </p>
        <p>
          {t(
            'You are trying to use an old address that no longer exists or that may have changed.'
          )}
        </p>
        <p>
          {t(
            'You may have used an old bookmark. If you are sure that you have used the correct address to the site, the problem may be caused by a temporary service disruption. Please try again later.'
          )}
        </p>
        <p>
          {t(
            'NOTE! If you were directed here via a link we are grateful if you inform us as to which link it was so that we can resolve the problem.'
          )}
        </p>
        <Button to="/" anchor={true}>
          {t('HOMEPAGE')}
        </Button>
      </ErrorContainer>
    );
  }
}

export default NotFoundPage;
