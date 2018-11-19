module.exports = function(app, ratingDao) {



  // ---Get---

  // Get likes
  app.get('/api/likes/:id', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);

    ratingDao.getLikesFromCase(req.params.id, (status: number, data: Object) => {
      res.status(status);
      console.log('likesServer: ', data[0].likes);
      res.json({ data: data });
    });
  });

// Get dislikes
  app.get('/api/dislikes/:id', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);

    ratingDao.getDislikesFromCase(req.params.id, (status: number, data: Object) => {
      res.status(status);
      console.log('dislikesServer: ', data[0].dislikes);
      res.json({ data: data });
    });
  });

  


  // ---Post---

  // Like case
  app.post('/api/likeCase/:id', (req: Request, res: Response) => {

    if (!(req.body instanceof Object)) return res.sendStatus(400);

    ratingDao.likeCase((req.params.id), (status: number, data: Object) => {
      res.status(status);
    });
  });

// Dislike case
  app.post('/api/dislikeCase/:id', (req: Request, res: Response) => {

    if (!(req.body instanceof Object)) return res.sendStatus(400);

    ratingDao.dislikeCase((req.params.id), (status: number, data: Object) => {
      res.status(status);
    });
  });


};