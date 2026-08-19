import { useState } from "react";
import "./StudentForm.css";

export const CreateUserForm = ({ onSubmit, onCancel }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      await onSubmit({ email, password, role });
    } catch (err) {
      setError(err.message || "Erreur lors de la creation");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="student-form-overlay">
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Creer un utilisateur</h2>

        <label className="student-form-field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="student-form-field">
          <span>Mot de passe</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label className="student-form-field">
          <span>Role</span>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="STUDENT">Etudiant</option>
            <option value="ADMIN">Administrateur</option>
          </select>
        </label>

        {error && <p className="student-form-error">{error}</p>}

        <div className="student-form-actions">
          <button type="button" className="student-form-cancel" onClick={onCancel}>
            Annuler
          </button>
          <button type="submit" className="student-form-submit" disabled={isSaving}>
            {isSaving ? "Creation..." : "Creer"}
          </button>
        </div>
      </form>
    </div>
  );
};