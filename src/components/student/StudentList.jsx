import React, { useState, useEffect } from "react";
import Spinner from './../layout/Spiner';
import { Link } from "react-router-dom";
const StudentList = () => {
    const [studentList, setStudentList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [action, setAction] = useState('next')
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        try {
            setLoading(true)
            async function getPost() {
                let response = await fetch(`https://js-post-api.herokuapp.com/api/students?_page=${currentPage}`)
                let json = await response.json();
                setStudentList(json.data);
                setTotalPage(Math.ceil(Number(json.pagination._totalRows) / Number(json.pagination._limit)))
                setLoading(false)
            }
            getPost();
        } catch (error) {

        }
    }, [currentPage])

    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
            setAction('next')
        }
    }
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setAction('previous')
        }
    }
    const handleFirstPage = () => {
        setCurrentPage(1);
        setAction('first')
    }
    const handleLastPage = () => {
        setCurrentPage(totalPage);
        setAction('last')
    }

    const handleRemove = async (studentRemove) => {
        let confirm = window.confirm(`Bạn có chắc chắn muốn xóa không?`);
        if (!confirm) return;
        try {
            await fetch(`https://js-post-api.herokuapp.com/api/students/${studentRemove.id}`, {
                method: 'DELETE'
            });
            setStudentList((prevStudentList) => prevStudentList.filter((item) => item !== studentRemove));
        } catch (error) {

        }
    };

    return (
        <div className="container">
            <h1>Student List</h1>
            <Link className="btn btn-outline-primary" to={'/student/create'}>
                <i className="fa fa-plus me-2" />
                Add Student
            </Link>
            {loading ? <Spinner /> : (
                <div>
                    <table className="table table-bordered mt-3 table-danger table-hover ">
                        <thead className="table-success">
                            <tr className="text-center">
                                <th>#</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>City</th>
                                <th>Mark</th>
                                <th colSpan={3}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList.length && studentList.map((student) => (
                                <tr>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.gender}</td>
                                    <td>{student.age}</td>
                                    <td>{student.city}</td>
                                    <td>{student.mark}</td>
                                    <td className="text-center">
                                        <Link className="btn btn-warning me-3" to={`/student/detail/${student.id}`}>
                                            <i className="fa-solid fa-eye"></i>
                                        </Link>
                                        <Link className="btn btn-success me-3" to={`/student/edit/${student.id}`}>
                                            <i className="fa-solid fa-user-pen"></i>
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => handleRemove(student)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table >

                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className={`${currentPage === 1 ? 'page-item disabled' : 'page-item '} ${action === 'first' ? 'active' : ''}`}>
                                <button className="page-link" onClick={handleFirstPage}>First</button>
                            </li>

                            <li className={`${currentPage <= 1 ? 'page-item disabled' : 'page-item '} ${action === 'previous' ? 'active' : ''}`}>
                                <button className="page-link" onClick={handlePreviousPage}>
                                    Previous
                                </button>
                            </li>
                            <li className={`${currentPage >= totalPage ? 'page-item disabled' : 'page-item '} ${action === 'next' ? 'active' : ''}`}>
                                <button className="page-link" onClick={handleNextPage}>
                                    Next
                                </button>
                            </li>
                            <li className={`${currentPage >= totalPage ? 'page-item disabled' : 'page-item '} ${action === 'last' ? 'active' : ''}`}>
                                <button className="page-link" onClick={handleLastPage}>
                                    Last
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    )
}
export default StudentList;