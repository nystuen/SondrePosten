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
    tidspunkt: number;
    viktighet: number;

}

class CaseService {

    getHeadersAndPicturesFromImportantCases(): Promise<Case[]> {
        return axios.get('/importantCases');
    }

    getAllFromOneKat(cat: string): Promise<Case[]> {
        return axios.get('/cat/' + cat);
    }

    getCase(id: string): Promise<Case[]>{
        return axios.get('case/' + id);
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


