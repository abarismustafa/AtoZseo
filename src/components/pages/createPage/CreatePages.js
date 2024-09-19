import { Formik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Breadcrumbs from "../../../common/breadcrumb/Breadcrumbs";
import CustomInputField from "../../../common/CustomInputField";
import JoditEditor from "jodit-react";
import DatePicker from "react-datepicker";  // assuming you use this for Posted Date
import "react-datepicker/dist/react-datepicker.css";

function CreatePages() {
    const breadCrumbsTitle = {
        title_1: "Create New Page",
    };

    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        title: "",
        name: "",
        url: "",
        postedDate: new Date(),
        metaDescription: "",
        metaKeywords: "",
        access: "all",  // default option for access
        allLanguageUsers: false,
        status: "active",  // assuming 'active' and 'inactive'
        sortOrder: 0,
        showOnHeader: false
    });
    const params = useParams();

    const validate = (values) => {
        let errors = {};
        if (!values.title) {
            errors.title = "Page title is required";
        }
        if (!values.name) {
            errors.name = "Page name is required";
        }
        if (!values.url) {
            errors.url = "Page URL is required";
        }
        if (!values.metaDescription) {
            errors.metaDescription = "Meta description is required";
        }
        if (!values.metaKeywords) {
            errors.metaKeywords = "Meta keywords are required";
        }
        return errors;
    };

    const toastSuccessMessage = () => {
        toast.success(`${params?.id ? "Update" : "Add"} Page Successfully.`, {
            position: "top-center",
        });
    };

    const submitForm = async (values) => {
        try {
            // Placeholder for the API call
            console.log("Submitted Values: ", values);
            toastSuccessMessage();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <Breadcrumbs breadCrumbsTitle={breadCrumbsTitle} />
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={submitForm}
                enableReinitialize
                className="tbl-captionn"
            >
                {(formik) => {
                    const {
                        values,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        errors,
                        touched,
                        handleBlur,
                        isValid,
                        dirty,
                    } = formik;
                    return (
                        <div className="row m-4">
                            <div className="col-xl-12">
                                <div className="card">
                                    <div className="card-body p-0">
                                        <div className="table-responsive active-projects style-1">
                                            <div className="tbl-caption tbl-caption-2">
                                                <h4 className="heading mb-0">{params?.id ? "Edit Page" : "Create New Page"}</h4>
                                            </div>
                                            <form className="tbl-captionn" onSubmit={handleSubmit}>

                                                {/* Page Title */}
                                                <div className="col-xl-12 mb-3">
                                                    <CustomInputField
                                                        type="text"
                                                        value={values.title}
                                                        hasError={errors.title && touched.title}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        errorMsg={errors.title}
                                                        id="title"
                                                        name="title"
                                                        placeholder="Page Title"
                                                    />
                                                </div>

                                                {/* Page Name */}
                                                <div className="col-xl-12 mb-3">
                                                    <CustomInputField
                                                        type="text"
                                                        value={values.name}
                                                        hasError={errors.name && touched.name}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        errorMsg={errors.name}
                                                        id="name"
                                                        name="name"
                                                        placeholder="Page Name"
                                                    />
                                                </div>

                                                {/* Page URL */}
                                                <div className="col-xl-12 mb-3">
                                                    <CustomInputField
                                                        type="text"
                                                        value={values.url}
                                                        hasError={errors.url && touched.url}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        errorMsg={errors.url}
                                                        id="url"
                                                        name="url"
                                                        placeholder="Page URL"
                                                    />
                                                </div>

                                                {/* Posted Date */}
                                                <div className="col-xl-12 mb-3">
                                                    <label className="m-2"><b>Posted Date</b></label>
                                                    <DatePicker
                                                        selected={values.postedDate}
                                                        onChange={(date) => setFieldValue('postedDate', date)}
                                                        dateFormat="yyyy-MM-dd"
                                                        className="form-control"
                                                    />
                                                </div>

                                                {/* Meta Description */}
                                                <div className="col-xl-12 mb-3">
                                                    <CustomInputField
                                                        type="text"
                                                        value={values.metaDescription}
                                                        hasError={errors.metaDescription && touched.metaDescription}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        errorMsg={errors.metaDescription}
                                                        id="metaDescription"
                                                        name="metaDescription"
                                                        placeholder="Meta Description"
                                                    />
                                                </div>

                                                {/* Meta Keywords */}
                                                <div className="col-xl-12 mb-3">
                                                    <CustomInputField
                                                        type="text"
                                                        value={values.metaKeywords}
                                                        hasError={errors.metaKeywords && touched.metaKeywords}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        errorMsg={errors.metaKeywords}
                                                        id="metaKeywords"
                                                        name="metaKeywords"
                                                        placeholder="Meta Keywords (separated with commas)"
                                                    />
                                                </div>

                                                {/* Who can access this page? */}
                                                <div className="col-xl-12 mb-3">
                                                    <label className="m-2"><b>Who can access this page?</b></label>
                                                    <select
                                                        className="form-select"
                                                        name="access"
                                                        onChange={handleChange}
                                                        value={values.access}
                                                    >
                                                        <option value="all">All Users</option>
                                                        <option value="admin">Admin Only</option>
                                                        <option value="registered">Registered Users</option>
                                                    </select>
                                                </div>

                                                {/* Show the page for all language users? */}
                                                <div className="col-xl-12 mb-3">
                                                    <label className="m-2">
                                                        <input
                                                            type="checkbox"
                                                            name="allLanguageUsers"
                                                            checked={values.allLanguageUsers}
                                                            onChange={handleChange}
                                                        />
                                                        {" "}Show the page for all language users?
                                                    </label>
                                                </div>

                                                {/* Status */}
                                                <div className="col-xl-12 mb-3">
                                                    <label className="m-2"><b>Status</b></label>
                                                    <select
                                                        className="form-select"
                                                        name="status"
                                                        onChange={handleChange}
                                                        value={values.status}
                                                    >
                                                        <option value="active">Active</option>
                                                        <option value="inactive">Inactive</option>
                                                    </select>
                                                </div>

                                                {/* Sort Order */}
                                                <div className="col-xl-12 mb-3">
                                                    <CustomInputField
                                                        type="number"
                                                        value={values.sortOrder}
                                                        hasError={errors.sortOrder && touched.sortOrder}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        errorMsg={errors.sortOrder}
                                                        id="sortOrder"
                                                        name="sortOrder"
                                                        placeholder="Sort Order"
                                                    />
                                                </div>

                                                {/* Display the page link on header menu bar */}
                                                <div className="col-xl-12 mb-3">
                                                    <label className="m-2">
                                                        <input
                                                            type="checkbox"
                                                            name="showOnHeader"
                                                            checked={values.showOnHeader}
                                                            onChange={handleChange}
                                                        />
                                                        {" "}Display the page link on header menu bar?
                                                    </label>
                                                </div>

                                                {/* Submit and Cancel Buttons */}
                                                <div>
                                                    <Link to="#" className="btn btn-danger light ms-1">
                                                        Cancel
                                                    </Link>
                                                    <button
                                                        className="btn btn-primary me-1"
                                                        type="submit"
                                                        disabled={!isValid || !dirty}
                                                    >
                                                        {params?.id ? "Update" : "Save"}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Formik>

            <ToastContainer />
        </>
    );
}

export default CreatePages;
