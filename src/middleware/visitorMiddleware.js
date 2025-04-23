export default (req, res, next) => {
    if (req.isVisitor && req.method !== 'GET') {
      return res.status(403).json({ message: 'Visitantes só podem visualizar o conteúdo' });
    }
    next();
  };