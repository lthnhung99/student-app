import axios from "axios";

class StudentService{
    static getStudent(id){
        return axios.get(`https://js-post-api.herokuapp.com/api/students/${id}`)
    }
    static updateStudent(id,data) {
        return axios.patch(`https://js-post-api.herokuapp.com/api/students/${id}`,data)
    }
    static getStudents(currentPage) {
        return axios.get(`https://js-post-api.herokuapp.com/api/students?_page=${currentPage}`);
    }
   
    static postStudent(data) {
        return axios.post('https://js-post-api.herokuapp.com/api/students', data);
    }
    
    static deleteStudent(id) {
        return axios.delete(`https://js-post-api.herokuapp.com/api/students/${id}`)
    }
    
}

export default StudentService;