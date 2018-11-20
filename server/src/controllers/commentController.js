module.exports = function(app, commentDao) {

  // ---Get---

  app.get('/api/comments/:id', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);

    commentDao.getComments(parseInt(req.params.id), (status: number, data: Object) => {
      res.status(status);
      res.json({ data: data });
    });
  });


  // ---Post---

  app.post('/api/addComment/:id', (req: Request, res: Response) => {

    if (!(req.body instanceof Object)) return res.sendStatus(400);

    commentDao.addComment(req.body, (status: number, data: Object) => {
      res.status(status);
    });
  });


}