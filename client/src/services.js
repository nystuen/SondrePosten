// @flow

import axios from 'axios';
import { CaseObject, Category, CommentObject, RatingObject } from './components/types/types';

axios.interceptors.response.use(response => response.data);

class CaseService {

  getHeadersAndPicturesFromImportantCases(): Promise<CaseObject[]> {
    return axios.get('/api/importantCases');
  }

  getAllFromOneKat(kat: string): Promise<CaseObject[]> {
    return axios.get('/api/cat/' + kat);
  }

  getCase(id: number): Promise<CaseObject[]> {
    return axios.get('/api/case/' + id);
  }

  getNewestCasesForLiveFeed(): Promise<CaseObject[]> {
    return axios.get('/api/livefeed');
  }

  getComments(id: number): Promise<CommentObject[]> {
    return axios.get('/api/comments/' + id);
  }

  getLikes(id: number): Promise<number[]>{
    return axios.get('/api/likes/' + id);
}

  getDislikes(id: number): Promise<number[]>{
    return axios.get('/api/dislikes/' + id);
  }

  likeCase(rating: RatingObject): Promise<Response> {
    return axios.post('/api/likeCase/' + rating.sak_id, rating.rating);
  }

  dislikeCase(rating: RatingObject): Promise<Response> {
    return axios.post('/api/dislikeCase/' + rating.sak_id, rating.rating);
  }

  addCase(newCase: CaseObject): Promise<Response> {
    return axios.post('/api/reg', newCase);
  }

  editCase(updatedCase: CaseObject): Promise<Response> {
    return axios.put('/api/editCase/' + updatedCase.id, updatedCase);
  }

  addComment(newComment: CommentObject): Promise<Response> {
    return axios.post('/api/addComment/' + newComment.sak_id, newComment);
  }

  deleteOneCase(id: number): Promise<Response> {
    return axios.put('/api/deleteCase/' + id);
  }

  getCategories(): Promise<Category[]>{
    return axios.get('/api/getCategories');
  }
}


export let caseService = new CaseService();


