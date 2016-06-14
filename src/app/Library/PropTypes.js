export function Iteratable(props, propName, componentName) {
	const value = props[propName];
	if (!value || typeof value.map !== 'function') {
		return new Error(`${propName} in ${componentName} must be iteratable.`);
	}

	return null;
}
