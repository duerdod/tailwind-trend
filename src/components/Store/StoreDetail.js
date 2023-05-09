import React, { PureComponent } from 'react';

export default class StoreDetail extends PureComponent {
  render() {
    const { store } = this.props;

    return (
      <div>
        <h1>{store.name}</h1>
        {store.address1 && (
          <addr>
            <div dangerouslySetInnerHTML={{ __html: store.address1 }} />
            {store.address2 && (
              <div dangerouslySetInnerHTML={{ __html: store.address2 }} />
            )}
            {store.city && <div>{store.city}</div>}
          </addr>
        )}
      </div>
    );
  }
}
