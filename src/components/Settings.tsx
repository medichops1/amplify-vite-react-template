import React, { useState, useEffect } from "react";
import {
  getCurrentUser,
  fetchUserAttributes,
  updateUserAttributes,
} from "aws-amplify/auth";

interface UserAttributes {
  email: string;
  name: string;
  "custom:role"?: string;
}

const Settings: React.FC = () => {
  const [userAttributes, setUserAttributes] = useState<UserAttributes | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [
    editableAttributes,
    setEditableAttributes,
  ] = useState<UserAttributes | null>(null);

  useEffect(() => {
    fetchAttributes();
  }, []);

  const fetchAttributes = async () => {
    try {
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const userAttrs: UserAttributes = {
        email: attributes.email || "",
        name: attributes.name || "",
        "custom:role": attributes["custom:role"] || "N/A",
      };
      setUserAttributes(userAttrs);
      setEditableAttributes(userAttrs);
    } catch (error) {
      console.error("Error fetching user attributes:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditableAttributes(userAttributes);
  };

  const handleSave = async () => {
    if (!editableAttributes) return;
    try {
      await updateUserAttributes({
        userAttributes: {
          name: editableAttributes.name,
          // Note: email and role changes might require additional verification or admin approval
        },
      });
      setUserAttributes(editableAttributes);
      setIsEditing(false);
      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating user attributes:", error);
      alert("Failed to update settings. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableAttributes((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  if (!userAttributes) {
    return <div>Loading...</div>;
  }

  return (
    <div className="settings">
      <h2>Settings</h2>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={editableAttributes?.email || ""}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editableAttributes?.name || ""}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="custom:role"
            value={editableAttributes?.["custom:role"] || ""}
            readOnly
          />
        </div>
        {!isEditing ? (
          <button type="button" onClick={handleEdit}>
            Edit
          </button>
        ) : (
          <>
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Settings;
