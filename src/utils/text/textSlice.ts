export const checkingTextLength = (text: string) => {
  return text.length > 20 ? text.slice(0, 26) + '...' : text;
}
