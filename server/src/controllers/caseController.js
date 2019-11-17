import { urlencodedParser } from '../server';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb){
      cb(null, new Date().toISOString() +"-"+ file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  } else {
    console.log
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
  fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

module.exports = function(app, caseDao) {
  // ---Get---

  // Get Homepage
  app.get(
    '/api/importantCases',
    (req: Request, res: Response) => {
      if (!(req.body instanceof Object))
        return res.sendStatus(400);

      caseDao.getHeadersAndPicturesFromImportantCases(
        (status: number, data: Object) => {
          res.status(status);
          res.json({ data: data });
        }
      );
    }
  );

  // Get livefeed
  app.get(
    '/api/livefeed',
    (req: Request, res: Response) => {
      if (!(req.body instanceof Object))
        return res.sendStatus(400);

      caseDao.getNewestCasesForLiveFeed(
        (status: number, data: Object) => {
          res.status(status);
          res.json({ data: data });
        }
      );
    }
  );

  // Get Categories
  app.get(
    '/api/getCategories',
    (req: Request, res: Response) => {
      caseDao.getCategories(
        (status: number, data: Object) => {
          res.status(status);
          res.json({ data: data });
        }
      );
    }
  );

  // Get all cases from one kat
  app.get(
    '/api/cat/:cat',
    (req: Request, res: Response) => {
      if (!(req.body instanceof Object))
        return res.sendStatus(400);

      caseDao.getAllFromOneKat(
        req.params.cat,
        (status: number, data: Object) => {
          res.status(status);
          res.json({
            data: data,
            title: req.params.cat,
            lengde: data.length
          });
        }
      );
    }
  );

  // Get Case
  app.get(
    '/api/case/:id',
    (req: Request, res: Response) => {
      if (!(req.body instanceof Object))
        return res.sendStatus(400);

      caseDao.getOneCase(
        req.params.id,
        (status: number, data: Object) => {
          res.status(status);
          res.json({ data: data });
        }
      );
    }
  );

  // ---Post---

  // Add new case
  app.post('/api/uploadImage', upload.single('caseImage'), (req: Request, res: Response) => {
    console.log('Uploaded successfully: ', req.file.path);
    res.json({ fileName: req.file.path});
  });



  // Add new case
  app.post('/api/reg', (req: Request, res: Response) => {

    let currentdate = new Date();

    let datetime =
      currentdate.getFullYear() +
      '-' +
      (currentdate.getMonth() + 1) +
      '-' +
      currentdate.getDate() +
      ' Kl. ' +
      currentdate.getHours() +
      ':' +
      currentdate.getMinutes();

    let json = {
      // $FlowFixMe
      overskrift: req.body.overskrift,
      // $FlowFixMe
      innhold: req.body.innhold,
      // $FlowFixMe
      bildetekst: req.body.bildetekst,

      tidspunkt: datetime,
      // $FlowFixMe
      bilde: req.body.bilde.fileName,
      // $FlowFixMe
      kategori: req.body.kategori,
      // $FlowFixMe
      viktighet: req.body.viktighet
    };

    caseDao.regNewCase(
      (json: Object),
      (status: number, data: Object) => {
        res.status(status);
      }
    );
  });

  // ---Put---

  // Update case

  app.put(
    '/api/editCase/:id',
    urlencodedParser,
    (req: Request, res: Response) => {
      if (!(req.body instanceof Object))
        return res.sendStatus(400);

      caseDao.editCase(
        req.body,
        req.params.id,
        (status: number, data: Object) => {
          res.status(status);
        }
      );
    }
  );

  // Delete (set aktiv=0)
  app.put(
    '/api/deleteCase/:id',
    (req: Request, res: Response) => {
      if (!(req.body instanceof Object))
        return res.sendStatus(400);

      caseDao.setCaseAsInactive(
        req.params.id,
        (status: number, data: Object) => {
          res.status(status);
        }
      );
    }
  );
};
