export function localhostOnly(req, res, next) {
  const ip = req.ip || req.connection?.remoteAddress || "";
  const isLocal =
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.includes("::ffff:127.0.0.1");

  if (!isLocal) return res.status(403).json({ error: "Forbidden" });
  next();
}
