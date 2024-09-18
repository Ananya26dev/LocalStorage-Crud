import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./Form.css";
const Form = () => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contacts, setContacts] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // To track if the form is in edit mode
  const [editContactId, setEditContactId] = useState(null); // To track the ID of the contact being edited
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Edit existing contact
      const updatedContacts = contacts.map((contact) => {
        if (contact.id === editContactId) {
          return {
            ...contact,
            name: contactName,
            email: contactEmail,
            message: contactMessage,
          };
        }
        return contact;
      });
      setContacts(updatedContacts);
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      setIsEditing(false); // Reset edit mode
      setEditContactId(null);
    } else {
      // Add new contact
      const newContact = {
        id: new Date().getTime().toString(),
        name: contactName,
        email: contactEmail,
        message: contactMessage,
      };
      const updatedContacts = [...contacts, newContact];
      setContacts(updatedContacts);
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    }
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(storedContacts);
  }, []);
  const handleDelete = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem("contact", JSON.stringify(updatedContacts));
  };
  const handleEdit = (id) => {
    const editContact = contacts.find((contact) => contact.id === id);
    setContactName(editContact.name);
    setContactEmail(editContact.email);
    setContactMessage(editContact.message);
    setIsEditing(true); // Set edit mode
    setEditContactId(id); // Set the contact ID for editing
  };
  return (
    <>
      <Container>
        <Row>
          <Col md={6}>
            <h1 className="text-center">Contact Form</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Enter Contact Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Enter Contact Email ID"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Write  Message Here"
                  required
                ></textarea>
              </div>
              <button className="btn btn-primary" type="submit">
                {isEditing ? "Update Contact" : "Submit"}
              </button>
            </form>
          </Col>
          <Col md={6}>
            <>
              <h2>Contact Data</h2>
              {contacts.length > 0 ? (
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email ID</th>
                      <th>Message</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact.id}>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.message}</td>
                        <td>
                          <span
                            className="icons"
                            onClick={() => handleEdit(contact.id)}
                          >
                            <FaEdit />
                          </span>
                          <span
                            className="icons"
                            onClick={() => handleDelete(contact.id)}
                          >
                            <FaTrashAlt />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-danger fw-bold">No User Data Available</p>
              )}
            </>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Form;
