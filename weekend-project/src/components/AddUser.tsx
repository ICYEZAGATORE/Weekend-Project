import { useState } from "react";
import { useUserContext } from "../context/UserContext";

interface FormData {
  name: string;
  email: string;
  age: string;
  phone: string;
  website: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  age?: string;
}

const AddUser = () => {
  const { addUser } = useUserContext();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    age: "",
    phone: "",
    website: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Age validation
    if (formData.age) {
      const ageNum = parseInt(formData.age, 10);
      if (isNaN(ageNum)) {
        newErrors.age = "Age must be a number";
        isValid = false;
      } else if (ageNum < 18) {
        newErrors.age = "Age must be 18 or older";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      addUser({
        name: formData.name,
        email: formData.email,
        age: formData.age ? parseInt(formData.age, 10) : undefined,
        phone: formData.phone || undefined,
        website: formData.website || undefined,
      });

      setIsSubmitted(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        age: "",
        phone: "",
        website: "",
      });

      // Clear submission status after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New User</h1>

      {isSubmitted && (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          User added successfully!
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter name"
            />
            {errors.name && (
              <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-gray-700 font-medium mb-2"
            >
              Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.age ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter age"
              min="18"
            />
            {errors.age && (
              <p className="mt-1 text-red-500 text-sm">{errors.age}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="website"
              className="block text-gray-700 font-medium mb-2"
            >
              Website
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter website"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
