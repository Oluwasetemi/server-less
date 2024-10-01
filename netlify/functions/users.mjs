const fetchGitHub = async (name) => {
  const res = await fetch(`https://api.github.com/users/${name}`);
  const final = await res.json();
  return final;
};

export default async (req, context) => {
  console.log(context.geo);
  console.log(context.ip);
  console.log(context.url);
  const search = new URLSearchParams(context.url.search);
  const name = search.get('name');
  const githubDetails = await fetchGitHub(name);

  const response = new Response(JSON.stringify({
    message: "Hello, World!",
    status: "success",
    data: githubDetails,
    city: context.geo.city,
    country: context.geo.country,
    ip: context.ip
  }), {
    headers: { "Content-Type": "application/json" },
    status: 200
  });

  return response;

};
