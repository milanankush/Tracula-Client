import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import DisabledButton from "../../components/DisabledButton";
import { updateProfileAction } from "../../redux/slices/users/usersSlices";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";

//form validations
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
});

const UpdateProfile = ({ location: { state } }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  //get data from store
  const user = useSelector((state) => state?.users);
  const { appErr, serverErr, loading, isEdited } = user;

  //formik form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: state?.user?.email,
      firstname: state?.user?.firstname,
      lastname: state?.user?.lastname,
    },
    onSubmit: (values) => {
      dispatch(updateProfileAction(values));
      history.push("/profile");
    },
    validationSchema: formSchema,
  });

  //redirect
  // useEffect(() => {
  //   if(isEdited){
  //     history.push('/profile');
  //   }
  // }, [dispatch, isEdited])
  return (
    <>
      {appErr || serverErr ? (
        <ErrorDisplayMessage>
          {appErr} {serverErr}
        </ErrorDisplayMessage>
      ) : (
        <section className="py-5 bg-success vh-100">
          <div className="container text-center">
            <div className="row mb-4">
              <div className="col-12 col-md-8 col-lg-5 mx-auto">
                <div className="p-4 shadow-sm rounded bg-white">
                  <form onSubmit={formik.handleSubmit}>
                    <span className="text-muted">Update Profile</span>
                    {/* <h4 className="mb-4 fw-light">
                    Hi, {data?.data?.firstname} Do you want to update your
                    profile
                  </h4> */}

                    {/* Display income Err */}
                    {/* {userAppErr || userServerErr ? (
                    <ErrorDisplayMessage
                      error={{
                        userAppErr,
                        userServerErr,
                      }}
                    />
                  ) : null} */}
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.firstname}
                        onBlur={formik.handleBlur("firstname")}
                        onChange={formik.handleChange("firstname")}
                        className="form-control"
                        type="text"
                        placeholder="Enter firstname"
                      />
                    </div>
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.firstname && formik.errors.firstname}
                    </div>
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.lastname}
                        onBlur={formik.handleBlur("lastname")}
                        onChange={formik.handleChange("lastname")}
                        className="form-control"
                        type="text"
                        placeholder="Enter lastname"
                      />
                    </div>
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.lastname && formik.errors.lastname}
                    </div>
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.email}
                        onBlur={formik.handleBlur("email")}
                        onChange={formik.handleChange("email")}
                        className="form-control"
                        type="email"
                        placeholder="Enter email"
                      />
                    </div>
                    {/* Err */}
                    <div className="text-danger mb-2">
                      {formik.touched.email && formik.errors.email}
                    </div>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                      {loading ? (
                        <DisabledButton />
                      ) : (
                        <button type="submit" class="btn btn-warning">
                          Update
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UpdateProfile;
