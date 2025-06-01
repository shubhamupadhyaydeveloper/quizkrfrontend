function template({ template }, opts, { componentName, jsx }) {
  const plugins = ['jsx'];
  const typeScriptTpl = template.smart({ plugins });

  return typeScriptTpl.ast`
    import React from 'react';
    import Svg, { Path } from 'react-native-svg';

    const ${componentName} = ({ size = 24, color = 'black', ...props }) => (
      <Svg
        width={size}
        height={size}
        fill={color}
        viewBox="0 0 24 24"
        {...props}
      >
        ${jsx.children}
      </Svg>
    );

    export default ${componentName};
  `;
}

module.exports = template;
