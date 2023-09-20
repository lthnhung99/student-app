import axios from "axios";

class StudentService{
    static getStudents(){
        return axios.get('https://js-post-api.herokuapp.com/api/students')
    }

    static getStudent(id){
        return axios.get(`https://js-post-api.herokuapp.com/api/students/${id}`)
    }
    static updateStudent(id,data) {
        return axios.patch(`https://js-post-api.herokuapp.com/api/students/${id}`,data)
    }
    
}

export default StudentService;