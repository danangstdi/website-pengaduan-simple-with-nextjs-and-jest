export const GetData = async (api, token = null, cache = false) => {
  const options = {
    method: "GET",
    cache: cache ? "default" : "no-store",
    headers: {}
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(api, options);

  if (!res.ok) {
    return false;
  }

  return res.json();
};