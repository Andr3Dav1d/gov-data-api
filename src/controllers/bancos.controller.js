import { getCache, setCache } from "../cache/memoryCache.js";
import { fetchBancos } from "../services/brasilapi.service.js";

function parsePositiveInt(value, fallback) {

  if (value === undefined) return fallback;

  const n = Number(value);

  if (!Number.isInteger(n) || n <= 0) return fallback;

  return n;

}

export async function listBancos(req, res, next) {

  try {

    const key = "bancos:all";
    let bancos = getCache(key);

    if (!bancos) {

      const raw = await fetchBancos();

      bancos = raw.map((b) => ({
        code: b.code,
        name: b.name,
        fullName: b.fullName ?? null,
        ispb: b.ispb ?? null
      }));

      setCache(key, bancos);

    }

    const q = (req.query.q ?? "").toString().toLowerCase();

    let filtered = bancos;

    if (q) {

      filtered = bancos.filter((b) =>
        (b.name || "").toLowerCase().includes(q)
      );

    }

    const page = parsePositiveInt(req.query.page, 1);
    const limit = Math.min(parsePositiveInt(req.query.limit, 10), 100);

    const total = filtered.length;

    const start = (page - 1) * limit;
    const end = start + limit;

    const data = filtered.slice(start, end);

    res.json({
      query: { q, page, limit },
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      data
    });

  } catch (e) {
    next(e);
  }

}

export async function getBancoByCodigo(req, res, next) {

  try {

    const codigo = Number(req.params.codigo);

    if (!Number.isInteger(codigo) || codigo <= 0) {

      const err = new Error("Código inválido");
      err.status = 400;
      throw err;

    }

    const key = "bancos:all";
    let bancos = getCache(key);

    if (!bancos) {

      const raw = await fetchBancos();

      bancos = raw.map((b) => ({
        code: b.code,
        name: b.name,
        fullName: b.fullName ?? null,
        ispb: b.ispb ?? null
      }));

      setCache(key, bancos);

    }

    const found = bancos.find((b) => b.code === codigo);

    if (!found) {

      const err = new Error("Banco não encontrado");
      err.status = 404;
      throw err;

    }

    res.json({ data: found });

  } catch (e) {
    next(e);
  }

}
