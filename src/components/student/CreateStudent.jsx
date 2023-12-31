import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../layout/Spiner";
import Swal from 'sweetalert2'
import StudentService from "../../services/StudentService";

const studentSchema = yup.object({
    name: yup.string()
        .required("Name là bắt buộc")
        .min(5, "Tên phải từ 5 ký tự!"),
    city: yup.string().required("City là bắt buộc"),
    gender: yup.string().required(),
    mark: yup.number()
        .required("Mark bắt buộc phải nhập")
        .min(0, "Mark phải lớn hơn hoặc 0")
        .max(10, "Mark phải nhỏ hơn hoặc bằng 10")
        .typeError("Không hợp lệ")
    ,
    age: yup.number()
        .required()
        .min(6,"Age phải hơn 6")
        .max(25, "Age phải nhỏ hơn 25")
        .typeError("Không hợp lệ")
})
const CreateStudent = () => {
    const [studentCreate,setStudentCreate]= useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(studentSchema)
    })

    const createStudent = async (data) => {
        setLoading(true)
        try {
            await StudentService.postStudent(data)
            setStudentCreate(data);
            reset();
            Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Thêm thành công',
                        showConfirmButton: false,
                        timer: 1500
                      })
            navigate("/")
            setLoading(false)
        } catch (error) {

        }
    }
    return (
        <div className="container d-flex justify-content-center">
            <div className="row col-6 md-6">
                <h1>Form create</h1>
                {loading ? <Spinner /> : (
                    <form onSubmit={handleSubmit(createStudent)} className="mx-3">
                        <div className="form-group mb-3">
                            <label className="lable-form">Name</label>
                            <input type="text" className="form-control" {...register('name')}/>
                            <span className="text-danger">{errors?.name?.message}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label className="lable-form">Gender</label>
                            <select className="form-select" {...register('gender')}>

                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label className="lable-form">Age</label>
                            <input type="number" className="form-control" {...register('age')} />
                            <span className="text-danger">{errors?.age?.message}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label className="lable-form">City</label>
                            <input type="text" className="form-control" {...register('city')} />
                            <span className="text-danger">{errors?.city?.message}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label className="lable-form">Mark</label>
                            <input type="text" className="form-control" {...register('mark')} />
                            <span className="text-danger">{errors?.mark?.message}</span>
                        </div>
                        <div className="form-group mb-3">
                            <button type="submit" className="btn btn-primary me-3">Save</button>
                            <button type="button" className="btn btn-danger" onClick={() => reset()}>Cancel</button>
                        </div>
                        <div>
                            <Link className="btn btn-outline-primary mt-5" to={'/'}>
                                <i className="fa fa-arrow-left me-2" />
                                Back to student list
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
export default CreateStudent;