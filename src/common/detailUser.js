import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { request } from "../utils/request";

import {
  isAllFieldFilled,
  isValidAge,
  isValidDate,
  isValidEmail,
  isValidPhoneNumber,
  isvalidTime,
} from "../common/validattion";
import { useCallback } from "react";
import CustomeModal from "../common/modal";
import ReactDatePicker from "react-datepicker";
import CustomInput from "./CustomInput";
function DetailUser({ fetchData, result, id, field }) {
  const [modalState, setModalState] = useState({
    showAdd: false,
    showDelete: false,
    showUpdate: false,
    showconfirmDelete: false,
    showAccStatus: false,
    body: "",
    title: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [user, setuser] = useState(result.user);
  const showToastSuccess = (user, title, message) => {
    const showToastState = {
      [user]: true,
      title: title || "",
      body: message || "",
    };
    setModalState((prevState) => ({ ...prevState, ...showToastState }));
  };

  const handleCloseModal = () =>
    setModalState({
      showAdd: false,
      showUpdate: false,
      showDelete: false,
      toastMessage: "",
    });
  console.log("age: ", user.user_DOB);
  const validateFields = useCallback((user) => {
    const errors = {};

    // Validate for user
    if (!isValidEmail(user.user_gmail)) errors.user_gmail = "Invalid email";
    if (!isValidPhoneNumber(user.user_phone))
      errors.user_phone = "Invalid phone number";
    if (!isValidAge(user.user_DOB))
      errors.user_DOB = "Must be at least 18 years old";
    if (!isAllFieldFilled(user))
      errors.emptyField = "Please fill in all fields";

    return errors;
  }, []);

  const handleRemoveuser = useCallback(
    async (userId) => {
      try {
        await request.delete("/admin/user", {
          data: { user_id: userId },
        });
        fetchData();
        showToastSuccess(
          "showDelete",
          "Delete user card?",
          "user card deleted successfully"
        );
      } catch (error) {
        console.error("Error removing user card:", error);
      }
    },
    [fetchData]
  );

  const handleUpdateuser = useCallback(async () => {
    const errors = validateFields(user);

    if (Object.keys(errors).length === 0) {
      try {
        await request.put("/profile", user);
        fetchData();
        showToastSuccess(
          "showUpdate",
          "Update user card?",
          "user card updated successfully"
        );
        setValidationErrors("");
      } catch (err) {
        console.error("Error updating user card:", err);
        setValidationErrors(errors);
        showToastSuccess(
          "showUpdate",
          "Error updating user?",
          "Some thing went wrong. Please try again!"
        );
      }
    } else {
      setValidationErrors(errors);
    }
  }, [validateFields, user, fetchData]);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setuser({ ...user, [name]: value });
    },
    [user]
  );
  return (
    <Container
      style={{
        borderRadius: "10px",
        color: "rgb(161, 158, 158)",
        paddingLeft: "10px",
        margin: "0 0 0 16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="mt-4" style={{ flex: 1 }}>
          Bar Management
        </h1>
      </div>
      <div>
        <h4 style={{ textAlign: "center" }}>
          {field.toUpperCase()}: {user.user_id}
        </h4>
        <Row lg={2}>
          <Col className="d-flex flex-column gap-3">
            <div>
              <Form.Label>
                Name <strong style={{ color: "red" }}>(Fixed)</strong>
              </Form.Label>
              <Form.Control
                name="user_name"
                type="text"
                onChange={(e) => handleInputChange(e)}
                value={user.user_name}
              />
            </div>
            <div>
              <Form.Label>
                Phone
                <strong style={{ color: "red" }}>(*) (Fixed)</strong>
              </Form.Label>
              <Form.Control
                name="user_phone"
                type="text"
                onChange={(e) => handleInputChange(e)}
                value={user.user_phone}
              />
              {validationErrors.user_phone ? (
                <div style={{ color: "red", fontSize: "14px" }}>
                  Invalid phone number
                </div>
              ) : (
                <div style={{ color: "red", fontSize: "14px" }}> </div>
              )}
            </div>
          </Col>
          <Col className="d-flex flex-column gap-3">
            <div>
              <Form.Label>
                Email <strong style={{ color: "red" }}>(Fixed) </strong>
              </Form.Label>

              <Form.Control
                required
                name="user_gmail"
                onChange={(e) => handleInputChange(e)}
                value={user.user_gmail}
              />
              {validationErrors.user_gmail ? (
                <div style={{ color: "red", fontSize: "14px" }}>
                  Invalid email !
                </div>
              ) : (
                <div style={{ color: "red", fontSize: "14px" }}> </div>
              )}
            </div>
            <div className="d-flex flex-column">
              <Form.Label>D.O.B</Form.Label>
              <div>
                <ReactDatePicker
                  selected={user.user_DOB}
                  onChange={(e) => {
                    setuser((prevInfo) => ({
                      ...prevInfo,
                      user_DOB: e ? e : false, // Set DOB field in formData to the selected date
                    }));
                  }}
                  required
                  dateFormat="dd/MM/yyyy"
                  isClearable
                  name="user_DOB"
                  showIcon
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={50}
                  showMonthDropdown
                  customInput={<CustomInput />}
                  placeholderText="Date Of Birth"
                />
              </div>
              {validationErrors.user_DOB ? (
                <div style={{ color: "red", fontSize: "14px" }}>
                  You must be at least 18 years old
                </div>
              ) : (
                <div style={{ color: "red", fontSize: "14px" }}> </div>
              )}
            </div>
          </Col>
          {validationErrors.emptyField ? (
            <div style={{ color: "red", fontSize: "14px" }}>
              Fill all required fields
            </div>
          ) : (
            <div style={{ color: "red", fontSize: "14px" }}> </div>
          )}
        </Row>
        <Button
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            border: "none",
            margin: "16px 8px 0 0 ",
            color: "white",
          }}
          onClick={() => handleUpdateuser()}
        >
          Update
        </Button>
        <Button
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            border: "none",
            margin: "16px 8px 0 0 ",
            color: "white",
          }}
          onClick={() => {
            showToastSuccess(
              "showconfirmDelete",
              "Delete user card?",
              "Deleted successfully"
            );
          }}
        >
          Remove
        </Button>
      </div>
      <CustomeModal
        show={modalState.showconfirmDelete}
        onHide={() => setModalState({ showconfirmDelete: false })}
        title={modalState.title}
        body={modalState.body}
        onConfirm={() => handleRemoveuser(user.user_id)}
      />
      <CustomeModal
        show={modalState.showAdd}
        onHide={() => setModalState({ showAdd: false })}
        title={modalState.title}
        body={modalState.body}
      />
      <CustomeModal
        show={modalState.showUpdate}
        onHide={() => setModalState({ showUpdate: false })}
        title={modalState.title}
        body={modalState.body}
      />
      <CustomeModal
        show={modalState.showDelete}
        onHide={() => setModalState({ showDelete: false })}
        title={modalState.title}
        body={modalState.body}
      />
    </Container>
  );
}

export default DetailUser;
