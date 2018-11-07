// @flow
import axios from 'axios';

axios.interceptors.response.use(response => response.data);

class Student {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

class Case {
    id: number;
    overskrift: string;
    innhold: string;
    kategori: string;
    viktighet: number;
}

class Comment {
    sak_id: number;
    brukernavn: string;
    kommentar: string;
}

class CaseService {

    getHeadersAndPicturesFromImportantCases(): Promise<Case[]> {
        return axios.get('/importantCases');
    }

    getAllFromOneKat(cat: string): Promise<Case[]> {
        return axios.get('/cat/' + cat);
    }

    getCase(id: number): Promise<Case[]>{
        return axios.get('/case/' + id);
    }

    getNewestCasesForLiveFeed(): Promise<Case[]>{
        return axios.get('/livefeed');
    }


    getComments(id: number): Promise<Comment[]>{
        return axios.get('/comments/' + id);
    }

    addCase(newCase: Case): Promise<Response>{
        return axios.post('/reg', newCase);
    }

    addComment(newComment: Comment): Promise<Response>{
        return axios.post('/addComment/' + newComment.sak_id, newComment);
    }
}

class StudentService {
    getStudents(): Promise<Student[]> {
        return axios.get('/students');
    }

    getStudent(id: number): Promise<Student> {
        return axios.get('/students/' + id);
    }

    updateStudent(student: Student): Promise<void> {
        return axios.put('/students', student);
    }
}

export let caseService = new CaseService();


