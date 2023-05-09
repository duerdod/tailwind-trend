import React from 'react';
import { css } from 'linaria';
import { Notifications as Ntf } from '@jetshop/core/components/Notifications';

export function Notifications() {
  return <Ntf className={notificationsStyles} />;
}

const closeAfter = 1600;

const notificationsStyles = css`
  position: fixed;
  right: 1em;
  top: 1em;
  z-index: 99999;

  [data-flight-notification] {
    width: 100%;
    background: white;
    position: relative;
    will-change: max-height opacity transform;
    margin-top: 1em;
    transition: opacity ${closeAfter / 2}ms ease-out,
      transform ${closeAfter / 8}ms ease-in-out,
      max-height ${closeAfter / 4}ms ease-in-out;
    max-height: 300px;
    overflow: hidden;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1);
  }

  [data-flight-notification='summoned'],
  [data-flight-notification='exiting'] {
    transform: translateX(calc(100% + 1em));
  }
  [data-flight-notification='entering'] {
    transform: translateX(0);
  }
  [data-flight-notification='exiting'] {
    opacity: 0;
    max-height: 0;
  }

  [data-flight-notification-inner] {
    padding: 1em;
    padding-right: 2em;
    min-width: 10em;
  }

  [data-flight-notification-dismiss] {
    background: transparent;
    color: black;
    position: absolute;
    right: 0.5em;
    top: 0.5em;
    svg {
      stroke: currentColor;
    }
    :hover {
      svg {
        opacity: 0.6;
      }
    }
  }

  /* The 'type' passed when triggering the notification can be used for styling */

  [data-flight-notification-type='add-to-cart'] {
    [data-flight-notification-inner] {
      padding: 0;
    }
  }
`;
