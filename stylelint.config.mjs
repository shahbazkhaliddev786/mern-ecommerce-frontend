/** @type {import("stylelint").Config} */
export default {
    extends: ['stylelint-config-standard', 'stylelint-config-tailwindcss'],
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['tailwind', 'apply', 'layer', 'variants', 'responsive', 'screen', 'theme', 'custom-variant']
            }
        ],
        'no-descending-specificity': null,
        'hue-degree-notation': 'angle',
        'custom-property-empty-line-before': null
    }
}
