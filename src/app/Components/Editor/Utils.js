export function getSelectionRange() {
	const selection = window.getSelection();
	if (selection.rangeCount === 0) return null;
	return selection.getRangeAt(0);
};

export function getSelectedBlockElement(range) {
	let node = range.startContainer;

	do {
		const nodeIsDataBlock = node.getAttribute
			? node.getAttribute('data-block')
			: null;

		if (nodeIsDataBlock) return node;
		node = node.parentNode;
	} while (node !== null);

	return null;
};
