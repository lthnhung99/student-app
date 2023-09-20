import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StudentService from './../../services/StudentService';
import Spinner from "../layout/Spiner";

const StudentDetail = () => {
    const { studentId } = useParams();
    const [studenDetail, setStudentDetail] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        try {
            setLoading(true)
            async function getData() {
                let studentRes = await StudentService.getStudent(studentId)
                setStudentDetail(studentRes.data)
                setLoading(false)
            }
            getData()

        } catch (error) {

        }
    }, [studentId])
    const { name, gender, age, city, mark } = studenDetail
    return (
        <div className="text-center">
            <section>
                <h1 className="mt-3">Student Detail</h1>

            </section>
            <section>
                {loading ? <Spinner /> : (
                    <div>
                        <div className="card text-white bg-secondary mb-3 mx-auto mt-3" style={{ width: "30rem" }}>
                            <div className="card-header">Name: {name}</div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Gender: {gender}</li>
                                <li className="list-group-item">Age: {age}</li>
                                <li className="list-group-item">City: {city}</li>
                                <li className="list-group-item">Mark: {mark}</li>
                            </ul>

                        </div>
                        <div>
                            <Link className="btn btn-outline-primary mt-5" to={'/'}>
                                <i className="fa fa-arrow-left me-2" />
                                Back to student list
                            </Link>
                        </div>
                    </div>
                )}
            </section>
        </div>


    )
}
export default StudentDetail;