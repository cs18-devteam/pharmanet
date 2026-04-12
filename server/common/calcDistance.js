exports.calculateDistanceKM = (clientLat, clientLng, pharmacyLat, pharmacyLng)=> {
  const R = 6371; // Earth radius in kilometers

  const toRad = (value) => (value * Math.PI) / 180;

  const dLat = toRad(pharmacyLat - clientLat);
  const dLng = toRad(pharmacyLng - clientLng);

  const lat1 = toRad(clientLat);
  const lat2 = toRad(pharmacyLat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // distance in KM
}
