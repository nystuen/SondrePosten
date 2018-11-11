// @flow
import axios from 'axios';
import { CaseType } from './components/types/CaseType';
import { Comments } from './components/comment/comments';

axios.interceptors.response.use(response => response.data);

class CaseService {

  getHeadersAndPicturesFromImportantCases(): Promise<CaseType[]> {
    return axios.get('/importantCases');
  }

  getAllFromOneKat(kat: string): Promise<CaseType[]> {
    return axios.get('/kat/' + kat);
  }

  getCase(id: number): Promise<CaseType[]> {
    return axios.get('/case/' + id);
  }

  getNewestCasesForLiveFeed(): Promise<CaseType[]> {
    return axios.get('/livefeed');
  }

  getComments(id: number): Promise<Comments[]> {
    return axios.get('/comments/' + id);
  }

  addCase(newCase: CaseType): Promise<Response> {
    return axios.post('/reg', newCase);
  }

  addComment(newComment: Comments): Promise<Response> {
    return axios.post('/addComment/' + newComment.sak_id, newComment);
  }

  deleteOneCase(id: number): Promise<Response> {
    return axios.put('/deleteCase/' + id);
  }
}


export let caseService = new CaseService();


