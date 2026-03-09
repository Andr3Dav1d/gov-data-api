const BASE_URL = "https://brasilapi.com.br/api";

async function httpGetJson(url) {

  const resp = await fetch(url);

  if (!resp.ok) {

    const text = await resp.text();

    const err = new Error(`Upstream error: ${resp.status}`);
    err.status = 502;
    err.details = text;

    throw err;

  }

  return resp.json();

}

export async function fetchFeriados(ano) {
  return httpGetJson(`${BASE_URL}/feriados/v1/${ano}`);
}

export async function fetchBancos() {
  return httpGetJson(`${BASE_URL}/banks/v1`);
}
