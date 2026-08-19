import { useState } from "react";
import "./StudentForm.css";

export const StudentForm = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [dateOfBirth, setDateOfBirth] = useState(initialData?.dateOfBirth?.slice(0, 10) || "");
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const isEditing = !!initialData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      await onSubmit({ name, email, phone, dateOfBirth });
    } catch (err) {
      setError(err.message || "Erreur lors de l'enregistrement");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="student-form-overlay">
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>{isEditing ? "Modifier l'etudiant" : "Ajouter un etudiant"}</h2>

        <label className="student-form-field">
          <span>Nom</span>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <label className="student-form-field">
          <span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label className="student-form-field">
          <span>Telephone</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>

        <label className="student-form-field">
          <span>Date de naissance</span>
          <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </label>

        {error && <p className="student-form-error">{error}</p>}

        <div className="student-form-actions">
          <button type="button" className="student-form-cancel" onClick={onCancel}>
            Annuler
          </button>
          <button type="submit" className="student-form-submit" disabled={isSaving}>
            {isSaving ? "Enregistrement..." : isEditing ? "Enregistrer" : "Creer"}
          </button>
        </div>
      </form>
    </div>
  );
};