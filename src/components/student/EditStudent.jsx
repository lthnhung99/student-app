/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Link, useNavigate, useParams } from "react-router-dom";
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
        .min(6, "Age phải hơn 6")
        .max(25, "Age phải nhỏ hơn 25")
        .typeError("Không hợp lệ")
})
const EditStudent = ({ studentList, setStudentList }) => {
    const [studentEdit, setStudentEdit] = useState({})
    const { studentId } = useParams()

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
        resolver: yupResolver(studentSchema),
     

    })
    useEffect(() => {
        try {
            async function getData() {
                let studentRes = await StudentService.getStudent(studentId)
                setStudentEdit(studentRes.data)
            }
            getData()
        } catch (error) {

        }
    }, [studentId])
    const handleSave = async (values) => {
        try {
            await StudentService.updateStudent(studentId, values);
            setStudentEdit(values);
        } catch (error) {

        }
    };

    return (
        <div className="container d-flex justify-content-center">
            <div className="row col-6 md-6">
                <h1>Form edit</h1>
                <form onSubmit={handleSubmit(handleSave)} className="mx-3">
                    <div className="form-group mb-3">
                        <label className="lable-form">Name</label>
                        <input type="text" className="form-control" {...register('name')} defaultValue={studentEdit.name}  />
                        <span className="text-danger">{errors?.name?.message}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label className="lable-form">Gender</label>
                        <select className="form-select" {...register('gender')} defaultValue={studentEdit.gender}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <label className="lable-form">Age</label>
                        <input type="number" className="form-control" {...register('age')} defaultValue={studentEdit.age} />
                        <span className="text-danger">{errors?.age?.message}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label className="lable-form">City</label>
                        <input type="text" className="form-control" {...register('city')} defaultValue={studentEdit.city}  />
                        <span className="text-danger">{errors?.city?.message}</span>
                    </div>
                    <div className="form-group mb-3">
                        <label className="lable-form">Mark</label>
                        <input type="text" className="form-control" {...register('mark')} defaultValue={studentEdit.mark}/>
                        <span className="text-danger">{errors?.mark?.message}</span>
                    </div>
                    <div className="form-group mb-3">
                        <button type="submit" className="btn btn-primary me-3">Update</button>
                        <button type="button" className="btn btn-danger">Cancel</button>
                    </div>
            
                </form>
            </div>
        </div>
    )
}
export default EditStudent;