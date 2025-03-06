export function searchEngine(data, searchTerm) {
  const results = data.filter(item => {
    const itemString = JSON.stringify(item).toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    return itemString.includes(searchTermLower);
  });

  const suggestions = results.slice(0, 5); // Limit to top 5 suggestions
  const closeMatches = results.slice(5, 10); // Limit to next 5 close matches

  return { suggestions, closeMatches };
}
