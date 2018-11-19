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

    let json = {
      // $FlowFixMe
      'sak_id': req.body.sak_id,
      // $FlowFixMe
      'brukernavn': req.body.brukernavn,
      // $FlowFixMe
      'kommentar': req.body.kommentar
    };

    commentDao.addComment((json: Object), (status: number, data: Object) => {
      console.log('added comment.');
      res.status(status);
    });
  });


}