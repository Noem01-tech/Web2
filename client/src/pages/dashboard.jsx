import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import * as studentService from "../Services/authService";
import { StudentForm } from "../components/StudentForm";
import { CreateUserForm } from "../components/CreateUserForm";
import "./Dashboard.css";

export const Dashboard = () => {
  const { logout, isAdmin } = useAuth();

  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [editingStudent, setEditingStudent] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [actionError, setActionError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);

  const loadStudents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await studentService.getStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleCreateStudent = () => {
    setActionError(null);
    setEditingStudent({});
  };

  const handleEdit = (student) => {
    setActionError(null);
    setEditingStudent(student);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet etudiant ?")) return;
    setActionError(null);
    try {
      await studentService.deleteStudent(id);
      await loadStudents();
    } catch (err) {
      setActionError(err.message);
    }
  };

  const handleStudentFormSubmit = async (payload) => {
    if (editingStudent && editingStudent.id) {
      await studentService.updateStudent(editingStudent.id, payload);
    } else {
      await studentService.createStudent(payload);
    }
    setEditingStudent(null);
    await loadStudents();
  };

  const handleCreateUserSubmit = async (payload) => {
    await studentService.createUser(payload);
    setIsCreatingUser(false);
    setActionSuccess("Utilisateur cree avec succes");
    setTimeout(() => setActionSuccess(null), 3000);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Etudiants</h1>
        <div className="dashboard-header-actions">
          {isAdmin && (
            <>
              <button className="dashboard-add" onClick={handleCreateStudent}>
                + Ajouter un etudiant
              </button>
              <button className="dashboard-add-user" onClick={() => setIsCreatingUser(true)}>
                + Ajouter un utilisateur
              </button>
            </>
          )}
          <button className="dashboard-logout" onClick={logout}>
            Se deconnecter
          </button>
        </div>
      </header>

      {isLoading && <p>Chargement...</p>}
      {error && <p className="dashboard-error">{error}</p>}
      {actionError && <p className="dashboard-error">{actionError}</p>}
      {actionSuccess && <p className="dashboard-success">{actionSuccess}</p>}

      {!isLoading && !error && (
        <ul className="dashboard-list">
          {students.length === 0 && <li>Aucun etudiant trouve</li>}
          {students.map((student) => (
            <li key={student.id} className="dashboard-item">
              <div>
                <span className="dashboard-item-name">{student.name}</span>
                <span className="dashboard-item-email">{student.email}</span>
              </div>

              {isAdmin && (
                <div className="dashboard-item-actions">
                  <button onClick={() => handleEdit(student)}>Modifier</button>
                  <button onClick={() => handleDelete(student.id)} className="dashboard-item-delete">
                    Supprimer
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {editingStudent !== null && (
        <StudentForm
          initialData={editingStudent.id ? editingStudent : null}
          onSubmit={handleStudentFormSubmit}
          onCancel={() => setEditingStudent(null)}
        />
      )}

      {isCreatingUser && (
        <CreateUserForm
          onSubmit={handleCreateUserSubmit}
          onCancel={() => setIsCreatingUser(false)}
        />
      )}
    </div>
  );
};