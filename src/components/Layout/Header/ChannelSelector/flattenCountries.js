// Flatten countries to an array ordered by name for display purposes.
// When a country is selected, look up the channel ID and pass the result to
// ChannelSelector's onSelect method.
const flattenCountries = channels => {
  return channels.reduce((chans, chan) => {
    // Add channel ID to each country object
    const channelCountries = chan.countries.map(c => {
      return {
        ...c,
        channel: chan,
        currencies: chan.currencies,
        languages: chan.languages
      };
    });

    // Return all countries sorted by name
    return [...chans, ...channelCountries].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, []);
};
export default flattenCountries;
