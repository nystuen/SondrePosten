// @flow

import axios from 'axios';
import { CaseObject, Category, CommentObject, RatingObject } from './components/types/types';

axios.interceptors.response.use(response => response.data);

class CaseService {

  getHeadersAndPicturesFromImportantCases(): Promise<CaseObject[]> {
    return axios.get('/importantCases');
  }

  getAllFromOneKat(kat: string): Promise<CaseObject[]> {
    return axios.get('/kat/' + kat);
  }

  getCase(id: number): Promise<CaseObject[]> {
    return axios.get('/case/' + id);
  }

  getNewestCasesForLiveFeed(): Promise<CaseObject[]> {
    return axios.get('/livefeed');
  }

  getComments(id: number): Promise<CommentObject[]> {
    return axios.get('/comments/' + id);
  }

  getLikes(id: number): Promise<number[]>{
    return axios.get('/likes/' + id);
}

  getDislikes(id: number): Promise<number[]>{
    return axios.get('/dislikes/' + id);
  }

  likeCase(rating: RatingObject): Promise<Response> {
    return axios.post('/likeCase/' + rating.sak_id, rating.rating);
  }

  dislikeCase(rating: RatingObject): Promise<Response> {
    return axios.post('/dislikeCase/' + rating.sak_id, rating.rating);
  }

  addCase(newCase: CaseObject): Promise<Response> {
    return axios.post('/reg', newCase);
  }

  addComment(newComment: CommentObject): Promise<Response> {
    return axios.post('/addComment/' + newComment.sak_id, newComment);
  }

  deleteOneCase(id: number): Promise<Response> {
    return axios.put('/deleteCase/' + id);
  }

  getCategories(): Promise<Category[]>{
    return axios.get('/api/kat');
  }
}


export let caseService = new CaseService();


