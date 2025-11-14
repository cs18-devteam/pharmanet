function readCookies(req){
  const cookieHeader = req.headers.cookie; // raw cookie string
  if (!cookieHeader) return {};

  const cookies = {};
  const cookiePairs = cookieHeader.split(";");

  for (const pair of cookiePairs) {
    const [key, value] = pair.trim().split("=");
    cookies[key] = decodeURIComponent(value);
  }

  return cookies;
}


module.exports  = readCookies;