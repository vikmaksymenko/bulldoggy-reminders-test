export const suffix = () => {
    return `_${(Math.random() + 1).toString(36).substring(7)}`;
}