import { css, cx } from 'linaria';
import React from 'react';

const styles = css`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  flex: 1 1 auto;
`;

export const ThemeSwitch = React.createContext(undefined);

export default function Container(props) {
  const [theme, setTheme] = React.useState('');

  function toggleTheme() {
    setTheme(() => (theme === '' ? 'theme-alt' : ''));
  }

  return (
    <ThemeSwitch.Provider value={toggleTheme}>
      <div {...props} className={cx(styles, theme)} />
    </ThemeSwitch.Provider>
  );
}
