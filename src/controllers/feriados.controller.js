import { getCache, setCache } from "../cache/memoryCache.js";
import { fetchFeriados } from "../services/brasilapi.service.js";

function parseAno(anoStr) {

  const ano = Number(anoStr);

  if (!Number.isInteger(ano) || ano < 1900 || ano > 2100) {

    const err = new Error("Parâmetro 'ano' inválido");
    err.status = 400;

    throw err;

  }

  return ano;

}

export async function getFeriadosByAno(req, res, next) {

  try {

    const ano = parseAno(req.params.ano);
    const key = `feriados:${ano}`;

    const cached = getCache(key);

    if (cached) {
      return res.json({
        source: "cache",
        year: ano,
        data: cached
      });
    }

    const raw = await fetchFeriados(ano);

    const normalized = raw.map((f) => ({
      date: f.date,
      name: f.name,
      type: f.type
    }));

    setCache(key, normalized);

    res.json({
      source: "upstream",
      year: ano,
      data: normalized
    });

  } catch (e) {
    next(e);
  }

}
