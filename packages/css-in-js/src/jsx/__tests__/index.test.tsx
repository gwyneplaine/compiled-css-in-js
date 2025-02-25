import '@compiled/css-in-js';
import React from 'react';
import { render } from '@testing-library/react';
import '@compiled/jest-css-in-js';

describe('css prop', () => {
  it('should create css from object literal', () => {
    const { getByText } = render(<div css={{ fontSize: '15px' }}>hello world</div>);

    expect(getByText('hello world')).toHaveCompiledCss('font-size', '15px');
  });

  it('should use string literal with identifier', () => {
    const fontSize = 12;
    const { getByText } = render(
      <div
        css={`
          font-size: ${fontSize}px;
        `}>
        hello world
      </div>
    );

    expect(getByText('hello world')).toHaveCompiledCss('font-size', '12px');
  });

  it('should create css from string literal', () => {
    const { getByText } = render(
      <div
        css={`
          font-size: 12px;
        `}>
        hello world
      </div>
    );

    expect(getByText('hello world')).toHaveCompiledCss('font-size', '12px');
  });

  it('should not type error with nested selectors', () => {
    <div
      css={{
        color: 'currentColor',
        textDecoration: 'none',
        position: 'relative',
        ':before': {
          opacity: 0,
          content: '⚓',
          position: 'absolute',
          left: '-5rem',
          fontSize: '3rem',
        },
        ':hover': {
          ':before': {
            opacity: 1,
          },
        },
      }}>
      hello world
    </div>;
  });

  it('should create css from string', () => {
    const { getByText } = render(<div css="font-size: 12px">hello world</div>);

    expect(getByText('hello world')).toHaveCompiledCss('font-size', '12px');
  });

  it('should create css from object reference', () => {
    const base = { fontSize: 12 };
    const { getByText } = render(<div css={base}>hello world</div>);

    expect(getByText('hello world')).toHaveCompiledCss('font-size', '12px');
  });

  it('should create css from object reference in templatel literal', () => {
    const base = { fontSize: 12 };
    const { getByText } = render(
      <div
        css={`
          ${base}
        `}>
        hello world
      </div>
    );

    expect(getByText('hello world')).toHaveCompiledCss('font-size', '12px');
  });

  it('should create css from arrow func in templatel literal', () => {
    const base = () => ({ fontSize: 12 });
    const { getByText } = render(
      <div
        css={`
          ${base()}
        `}>
        hello world
      </div>
    );

    expect(getByText('hello world')).toHaveCompiledCss('font-size', '12px');
  });

  it('should create css from arrow function', () => {
    const base = () => ({ fontSize: 12 });
    const { getByText } = render(<div css={{ ...base() }}>hello world</div>);

    expect(getByText('hello world')).toHaveCompiledCss('font-size', '12px');
  });

  it('should create css from array', () => {
    const base = { fontSize: 12 };
    const next = ` font-size: 15px; `;
    const { getByText } = render(<div css={[base, next]}>hello world</div>);

    expect(getByText('hello world')).toHaveCompiledCss('font-size', '15px');
  });
});
