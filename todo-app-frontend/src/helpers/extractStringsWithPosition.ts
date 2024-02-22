export const extractStringsWithPosition = (description: string) => {
    if (!description.includes('*')) {
        return null;
    }

    const regex = /(\*[^.]*\.|\S+)/g;
    const matches = description.match(regex);

    if (matches) {
        const result = matches.map((match, index) => ({
            position: index,
            string: match.trim(),
        }));
        return result
    }
};
