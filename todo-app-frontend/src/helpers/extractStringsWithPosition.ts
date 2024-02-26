export const extractStringsWithPosition = (description: string) => {
    if (!description.includes('*')) {
        return null;
    }

    const parts = description.split('*');

    const result = parts
        .map((part, index) => ({
            position: index,
            string: (index > 0) ? `*${part.trim()}` : part.trim(),
        }))
        .filter(item => item.string !== '')
        .sort((a, b) => a.position - b.position);

    return result;
};